/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Absolute production origin, e.g. https://pyhire.com. Used for canonical
   *  and og:url so prerendered HTML doesn't carry the build machine's origin. */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
