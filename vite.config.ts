/**
 * Vite development/build configuration.
 *
 * Vite reads this file for both `npm run dev` and `npm run build`; the React
 * plugin supplies JSX transformation and Fast Refresh during development.
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // One plugin is enough because the project intentionally avoids a UI framework.
  plugins: [react()],
  // Fixed local values make the documented development URL predictable.
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  // Preview serves the generated dist/ bundle for a final local check.
  preview: {
    host: "127.0.0.1",
    port: 4173,
  },
  // ES2022 matches the TypeScript target and keeps output compact for modern browsers.
  build: {
    target: "es2022",
    cssCodeSplit: true,
  },
});
