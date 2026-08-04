/** Small inline SVG icons shared by buttons and navigation controls. */

import type { ReactNode } from "react";
import type { Theme } from "../types";

/** Supplies common SVG sizing and accessibility behavior to each icon. */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

/** Right-pointing arrow used to reinforce forward navigation. */
export function ArrowIcon() {
  return (
    <Icon>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </Icon>
  );
}

/** Shows the theme users will switch to when they activate the button. */
export function ThemeIcon({ theme }: { theme: Theme }) {
  return theme === "dark" ? (
    <Icon>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
    </Icon>
  ) : (
    <Icon>
      <path d="M20.4 15.3A8.5 8.5 0 0 1 8.7 3.6 8.5 8.5 0 1 0 20.4 15.3Z" />
    </Icon>
  );
}
