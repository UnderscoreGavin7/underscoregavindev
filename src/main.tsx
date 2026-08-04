/**
 * Browser entry point.
 *
 * index.html supplies an empty <div id="root">. This module asks React to
 * control that element, loads the global styles, and renders the App component.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Bootstrap loads first as a cross-browser reset and reusable utility layer.
// Selective Reboot + Utilities imports are much smaller than the full component
// bundle, and no JavaScript/Popper ships because the site uses no modal/dropdown.
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";

// The original hand-written stylesheet remains the main design lesson and wins
// over Bootstrap whenever both layers target the same element.
import "./styles.css";

// The final bridge documents how Bootstrap variables and focus utilities can be
// adapted to the custom design without editing third-party files in node_modules.
import "./bootstrap-overrides.css";

// Store the lookup so a missing/misspelled HTML mount point produces a useful
// error instead of the less informative non-null assertion used previously.
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('React could not find <div id="root"> in index.html.');
}

// StrictMode enables extra development checks. It does not add visible markup
// and React removes its development-only checks from the production bundle.
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
