/** Shared footer with navigation and an automatically current copyright year. */

/** Renders the common ending used by the homepage, résumé, and 404 page. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="brand" href="/">
        <span className="brand-mark">_</span>
        <span>gavin.dev</span>
      </a>
      <p>
        <a className="footer-link" href="/resume">Résumé</a>
        <span aria-hidden="true"> · </span>
        Built with React, TypeScript, and Node.js.
      </p>
      <p>© {new Date().getFullYear()} Gavin</p>
    </footer>
  );
}
