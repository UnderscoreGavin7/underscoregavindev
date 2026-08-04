/** Shared fixed navigation displayed above every page. */

import { ThemeIcon } from "./Icons";
import type { PageName, Theme } from "../types";

type SiteHeaderProps = {
  currentPage: PageName;
  theme: Theme;
  onToggleTheme: () => void;
};

/** Renders global links and delegates theme state changes back to App. */
export function SiteHeader({ currentPage, theme, onToggleTheme }: SiteHeaderProps) {
  // Section links need a leading slash when the visitor is currently on /resume.
  const homePrefix = currentPage === "home" ? "" : "/";

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="UnderscoreGavin.dev home">
        <span className="brand-mark">_</span>
        <span>gavin.dev</span>
      </a>

      {/* d-none/d-md-flex are Bootstrap responsive display utilities. The
          site-nav class still supplies the original spacing and typography. */}
      <nav className="site-nav d-none d-md-flex" aria-label="Primary navigation">
        <a href={`${homePrefix}#work`}>Work</a>
        <a href={`${homePrefix}#toolkit`}>Toolkit</a>
        <a href={`${homePrefix}#method`}>Method</a>
        <a className={currentPage === "resume" ? "nav-current" : undefined} href="/resume">
          Résumé
        </a>
      </nav>

      <button
        className="theme-toggle"
        type="button"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        <ThemeIcon theme={theme} />
      </button>
    </header>
  );
}
