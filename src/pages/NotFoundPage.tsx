/** Fallback page for URLs other than the homepage and /resume. */

/** Provides a useful recovery path instead of silently rendering the homepage. */
export function NotFoundPage() {
  return (
    // w-100 is a Bootstrap width utility; the custom class controls
    // this page's distinctive padding, typography, and minimum height.
    <section className="not-found-page w-100">
      <p className="section-kicker">404 / Route not found</p>
      <h1>This path does not exist.</h1>
      <p>The server found the React application, but the application does not define this page.</p>
      <a className="button button-primary" href="/">Return home</a>
    </section>
  );
}
