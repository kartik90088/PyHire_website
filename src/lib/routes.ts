/**
 * Destinations for the site's conversion calls-to-action.
 *
 * Every "Book a demo" / "Start free trial" control points here, so the whole
 * funnel can be repointed from one place — e.g. swapping the contact page for
 * a scheduling tool or a real sign-up flow later.
 */
export const DEMO_PATH = '/contact';

/**
 * "Start free trial". There is no self-serve sign-up URL yet, so this opens
 * the working enquiry form with the request pre-labelled as a trial. Repoint
 * it to the app's sign-up page once one exists.
 */
export const TRIAL_PATH = '/contact?topic=trial';

/** Kept for older components that still offer a quote. */
export const QUOTE_PATH = '/contact';

/** "Explore platform" — the first product page. */
export const PLATFORM_PATH = '/product/jobs-and-candidates';
