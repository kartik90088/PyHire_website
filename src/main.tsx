import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/*
 * `npm run build` prerenders every route to static HTML (scripts/prerender.mjs)
 * so crawlers that don't execute JavaScript still get the full page. That markup
 * is deliberately rendered, not hydrated.
 *
 * Hydration was tried and always mismatches: Motion's `initial`/`whileInView`
 * entrance animations have already advanced by the time a route is snapshotted,
 * so the captured inline styles can never equal what React produces on its first
 * client render. React responds by discarding the tree and regenerating it — the
 * same end state as rendering outright, but preceded by a wasted hydration pass
 * and a console error on every page. Rendering directly is the honest form of
 * what React does anyway. The prerendered HTML still earns its keep: it is what
 * crawlers read, and it paints before the bundle arrives.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
