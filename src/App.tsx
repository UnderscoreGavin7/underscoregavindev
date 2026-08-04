/**
 * Application coordinator.
 *
 * This file intentionally stays small: it owns state shared by every page
 * (the selected color theme), determines which page matches the URL, and
 * assembles the shared header, page content, and footer.
 */

import { useEffect, useState } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ResumePage } from "./pages/ResumePage";
import type { PageName, Theme } from "./types";

// A single key keeps the browser's saved theme separate from other websites.
const THEME_STORAGE_KEY = "underscore-theme";

/** Converts the browser pathname into the small set of pages this site owns. */
function pageFromPath(pathname: string): PageName {
  // Removing trailing slashes makes "/resume" and "/resume/" equivalent.
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  if (normalizedPath === "/") return "home";
  if (normalizedPath === "/resume") return "resume";
  return "not-found";
}

/** Chooses a saved theme first and otherwise follows the operating system. */
function getInitialTheme(): Theme {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  // The explicit checks prevent an arbitrary localStorage string becoming state.
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;

  // matchMedia reads the user's system-level light/dark preference.
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

/** Renders the complete application and coordinates cross-page behavior. */
function App() {
  // The initializer function runs only once during the first React render.
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // This project has only two pages, so a tiny pathname switch replaces a
  // routing dependency while still providing a real, shareable /resume URL.
  const currentPage = pageFromPath(window.location.pathname);

  useEffect(() => {
    // data-theme lets CSS variables restyle the entire document at once.
    document.documentElement.dataset.theme = theme;

    // Saving the choice makes it survive page navigation and browser restarts.
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    // A specific title helps users distinguish the résumé tab from the homepage.
    document.title = currentPage === "resume" ? "Résumé | UnderscoreGavin.dev" : "UnderscoreGavin.dev";
  }, [currentPage]);

  /** Flips between the only two valid Theme values. */
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <>
      {/* Keyboard users can bypass repeated navigation and reach the page body. */}
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {/* Header and footer remain consistent as page content changes. */}
      <SiteHeader currentPage={currentPage} theme={theme} onToggleTheme={toggleTheme} />

      <main id="main-content">
        {currentPage === "home" && <HomePage />}
        {currentPage === "resume" && <ResumePage />}
        {currentPage === "not-found" && <NotFoundPage />}
      </main>

      <SiteFooter />
    </>
  );
}

export default App;
