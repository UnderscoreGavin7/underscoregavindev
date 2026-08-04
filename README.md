# UnderscoreGavin.dev

A lightweight, extensively annotated developer portfolio built with React, TypeScript, Node.js, Vite, and selected Bootstrap CSS layers. It includes a dedicated, print-ready résumé at `/resume` while keeping the runtime dependency surface intentional.

## Requirements

- Node.js 20.19 or newer
- npm 10 or newer

The project was created and verified with Node.js 24.19.0 and npm 11.17.0.

## Install and run locally

Open PowerShell and run:

```powershell
cd F:\CODING\Main\UnderscoreGavin.dev
npm install
npm run dev
```

Vite prints the local address, normally:

```text
http://127.0.0.1:5173
```

Available pages:

- Portfolio: `http://127.0.0.1:5173/`
- Résumé: `http://127.0.0.1:5173/resume`

Press `Ctrl+C` in the terminal to stop the development server.

## Check and build

Check every TypeScript file without producing build output:

```powershell
npm run typecheck
```

Create the optimized production site:

```powershell
npm run build
```

Vite writes the finished HTML, CSS, JavaScript, and static files into `dist/`.

## Preview or serve production

Vite can preview the finished build on `http://127.0.0.1:4173`:

```powershell
npm run preview
```

The included dependency-free Node.js server runs it on `http://127.0.0.1:3000`:

```powershell
npm run build
npm start
```

Choose another port for the current PowerShell session when needed:

```powershell
$env:PORT = "8080"
npm start
```

## Available commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite with fast development updates |
| `npm run typecheck` | Validate TypeScript types without emitting files |
| `npm run build` | Type-check and create an optimized `dist/` bundle |
| `npm run preview` | Preview `dist/` through Vite |
| `npm start` | Serve the existing `dist/` through the included Node server |

## How the files work together

```text
Browser request
      │
      ├── development ──> Vite
      └── production  ──> server.mjs ──> dist/index.html
                                             │
                                             ▼
                                      src/main.tsx
                                             │
                                             ▼
                                        src/App.tsx
                              ┌──────────────┼──────────────┐
                              ▼              ▼              ▼
                         shared header   selected page   shared footer
                                             │
                              ┌──────────────┼──────────────┐
                              ▼              ▼              ▼
                           homepage        résumé          404
                              │              │
                              ▼              ▼
                       portfolio data    résumé data
```

- `index.html` is the browser shell. It provides metadata and the empty `#root` element.
- `src/main.tsx` finds `#root`, loads the global CSS, and mounts React.
- `src/App.tsx` owns the light/dark theme and selects a page from the URL pathname.
- `src/components/` contains interface pieces shared between pages.
- `src/pages/` contains one component for each complete page.
- `src/data/` keeps editable portfolio and résumé content separate from presentation.
- `src/types.ts` gives the data and components one shared set of TypeScript contracts.
- `src/styles.css` defines tokens, layouts, responsive rules, and print behavior.
- `src/bootstrap-overrides.css` connects Bootstrap variables/focus behavior to the original design.
- `server.mjs` safely streams files from `dist/` and falls back to React for `/resume`.
- `vite.config.ts` defines predictable development, preview, and production settings.

## Project structure

```text
UnderscoreGavin.dev/
├── public/
│   └── favicon.svg             # Browser-tab artwork
├── src/
│   ├── components/
│   │   ├── Icons.tsx           # Reusable inline SVG icons
│   │   ├── SiteFooter.tsx      # Shared footer
│   │   └── SiteHeader.tsx      # Navigation and theme control
│   ├── data/
│   │   ├── portfolio.ts        # Homepage projects, tools, and principles
│   │   └── resume.ts           # Verified résumé content to customize
│   ├── pages/
│   │   ├── HomePage.tsx        # Main portfolio route
│   │   ├── NotFoundPage.tsx    # Unknown-route recovery
│   │   └── ResumePage.tsx      # Dedicated printable résumé route
│   ├── App.tsx                 # Shared state and tiny route switch
│   ├── bootstrap-overrides.css # Commented Bootstrap/custom-CSS bridge
│   ├── main.tsx                # React entry point
│   ├── styles.css              # Complete visual system
│   ├── types.ts                # Shared data models
│   └── vite-env.d.ts           # Vite browser type declarations
├── index.html                  # HTML shell
├── package.json                # Scripts and direct dependencies
├── server.mjs                  # Production HTTP server
├── tsconfig.json               # TypeScript safety rules
└── vite.config.ts              # Vite configuration
```

## Reading the comments

Every hand-written source file begins with a purpose comment. Functions have focused documentation, and non-obvious statements and visual sections explain their responsibility and relationship to surrounding code. Comments emphasize *why* a line exists rather than merely repeating its syntax.

Standard JSON does not allow comments, so `package.json`, `package-lock.json`, and `tsconfig.json` remain valid JSON. Their fields are explained in this README. `package-lock.json` is generated by npm and should not be hand-edited.

## Bootstrap and original CSS

Bootstrap 5.3.8 is installed through npm. `main.tsx` imports only `bootstrap-reboot.min.css` and `bootstrap-utilities.min.css`, not the full component stylesheet or Bootstrap JavaScript. Reboot improves browser consistency, while utilities supply reusable classes such as `d-flex`, `flex-wrap`, `d-none`, `d-md-flex`, and `w-100`.

The original `src/styles.css` remains intact and loads after Bootstrap, so it is still the main place to learn custom layout, color tokens, responsive design, animation, and print styling. The final `src/bootstrap-overrides.css` file is heavily commented and demonstrates the correct extension pattern: customize public `--bs-*` variables and add local rules instead of modifying generated vendor files under `node_modules`.

## Customize the résumé safely

Edit `src/data/resume.ts` to add verified contact, employment, and education information. The starter deliberately avoids inventing an email address, employer, degree, or social account.

The résumé's **Print / Save PDF** button calls the browser's native print dialog. Print-only CSS removes site navigation and converts colors and spacing into a paper-friendly layout.

## Theme and routing behavior

The theme toggle writes `dark` or `light` to browser `localStorage`. With no saved value, the site follows the operating-system preference.

The project does not need a routing package for two content pages. `App.tsx` maps `/` and `/resume` directly, while the Node production server sends `index.html` for extensionless routes. Unknown paths render a useful React 404 page; missing assets remain actual HTTP 404 responses.

## Fonts and offline use

The stylesheet loads Manrope and DM Mono from Google Fonts and falls back to system fonts if the request is unavailable. For fully offline deployment, place font files in `public/fonts/` and replace the CSS `@import` with local `@font-face` declarations.
