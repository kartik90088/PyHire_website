#!/usr/bin/env bash
#
# Deploy the PyHire marketing website to devserver.
#
#   ./deploy/deploy.sh              # build + verify + upload site
#   ./deploy/deploy.sh --api        # also sync and restart the contact-form API
#   ./deploy/deploy.sh --skip-build # upload the existing dist/ (still verified)
#
# Run from the project root, from Git Bash on Windows or any POSIX shell.
#
# The upload is atomic-ish: files go to a staging directory on the server and
# are swapped in with `mv`, so a half-finished transfer is never served. The old
# release is kept alongside as dist.previous for a fast rollback.

set -euo pipefail

SSH_HOST="${SSH_HOST:-devserver}"
REMOTE_DIR="${REMOTE_DIR:-/home/veriright/pyhire-site}"
SITE_URL="${VITE_SITE_URL:-https://pyhire.veriright.com}"

DEPLOY_API=false
SKIP_BUILD=false
for arg in "$@"; do
  case "$arg" in
    --api) DEPLOY_API=true ;;
    --skip-build) SKIP_BUILD=true ;;
    *) echo "Unknown option: $arg" >&2; exit 1 ;;
  esac
done

cd "$(dirname "$0")/.."

# ---------------------------------------------------------------------------
# 1. Build
#
# PUPPETEER_EXECUTABLE_PATH: the prerenderer needs a Chrome. On this Windows
# box puppeteer's own download produced a 0-byte chrome.exe (antivirus), so we
# point it at the installed Chrome instead. Harmless when puppeteer's copy is
# fine — an explicit path always wins.
# ---------------------------------------------------------------------------
if [ "$SKIP_BUILD" = false ]; then
  echo "==> Building with VITE_SITE_URL=$SITE_URL"
  if [ -z "${PUPPETEER_EXECUTABLE_PATH:-}" ]; then
    for candidate in \
      "/c/Program Files/Google/Chrome/Application/chrome.exe" \
      "/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" \
      "/usr/bin/google-chrome" \
      "/usr/bin/chromium"; do
      if [ -x "$candidate" ]; then
        export PUPPETEER_EXECUTABLE_PATH="$candidate"
        echo "    using Chrome at $candidate"
        break
      fi
    done
  fi
  VITE_SITE_URL="$SITE_URL" npm run build
fi

# ---------------------------------------------------------------------------
# 2. Verify before anything leaves this machine.
#
# This is the check that stops a failed prerender from being deployed as an
# empty SPA shell — see scripts/build-guard.mjs.
# ---------------------------------------------------------------------------
echo "==> Verifying dist/"
node scripts/build-guard.mjs check

# ---------------------------------------------------------------------------
# 3. Upload
#
# rsync is the better tool, but Git Bash on Windows does not ship it. tar over
# ssh needs nothing beyond what both ends already have, and streams in one
# connection rather than one per file — which matters here because dist/ is
# ~1,400 files. Excludes are passed as tar arguments.
# ---------------------------------------------------------------------------
sync_dir() {
  local src="$1" dest="$2"; shift 2
  if command -v rsync > /dev/null 2>&1; then
    local excludes=()
    for pattern in "$@"; do excludes+=(--exclude "$pattern"); done
    rsync -az --delete "${excludes[@]}" -e ssh "$src/" "$SSH_HOST:$dest/"
  else
    local excludes=()
    for pattern in "$@"; do excludes+=(--exclude="$pattern"); done
    ssh "$SSH_HOST" "mkdir -p '$dest'"
    tar -cz -C "$src" "${excludes[@]}" . | ssh "$SSH_HOST" "tar -xz -C '$dest'"
  fi
}

echo "==> Uploading to $SSH_HOST:$REMOTE_DIR"
ssh "$SSH_HOST" "rm -rf '$REMOTE_DIR/dist.staging' && mkdir -p '$REMOTE_DIR/dist.staging'"
sync_dir dist "$REMOTE_DIR/dist.staging"

ssh "$SSH_HOST" "
  set -e
  cd '$REMOTE_DIR'
  rm -rf dist.previous
  [ -d dist ] && mv dist dist.previous || true
  mv dist.staging dist
  echo '    swapped in new release (previous kept as dist.previous)'
"

# ---------------------------------------------------------------------------
# 4. Contact form API (optional)
# ---------------------------------------------------------------------------
if [ "$DEPLOY_API" = true ]; then
  echo "==> Syncing contact form API"
  # .env and data/ are excluded deliberately: the credentials and the recorded
  # leads live on the server and must survive every deploy.
  sync_dir server "$REMOTE_DIR/api" node_modules .env data

  ssh "$SSH_HOST" "
    set -e
    cd '$REMOTE_DIR/api'
    if [ ! -f .env ]; then
      echo '    !! .env missing — copy .env.example to .env and fill in SMTP settings.'
      echo '    !! The API will record leads to data/leads.jsonl but send no email.'
      cp .env.example .env
    fi
    npm install --omit=dev --no-audit --no-fund
    if pm2 describe pyhire-site-api > /dev/null 2>&1; then
      pm2 restart pyhire-site-api --update-env
    else
      pm2 start 'node --env-file=.env index.js' --name pyhire-site-api
      pm2 save
    fi
  "
fi

# ---------------------------------------------------------------------------
# 5. Smoke test what we just shipped.
# ---------------------------------------------------------------------------
echo "==> Smoke testing on the server"
ssh "$SSH_HOST" "
  cd '$REMOTE_DIR/dist'
  printf '    routes prerendered: '; find . -name index.html | wc -l
  # grep -o, not grep -c: the built HTML is one long line, so a line count
  # reports 1 no matter how much markup is actually there.
  printf '    headings on home:   '; grep -o '<h2' index.html | wc -l
  printf '    sitemap urls:       '; grep -o '<loc>' sitemap.xml | wc -l
"

echo
echo "Done. If DNS and nginx are live, verify with:"
echo "  curl -s $SITE_URL/job-management | grep -c '<h2'   # non-zero = prerendered"
echo "  curl -s $SITE_URL/api/health"
