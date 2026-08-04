/**
 * Dependency-free production server for the generated Vite site.
 *
 * React runs in the browser; this Node.js process only translates HTTP requests
 * into files from dist/. Keeping the responsibilities separate means the same
 * browser build could later be served by Nginx, a CDN, or another web server.
 */

// createReadStream sends large files in chunks instead of loading them all at once.
import { createReadStream } from "node:fs";
// The promise version of stat makes file validation fit the async request handler.
import { stat } from "node:fs/promises";
// Node's built-in HTTP module avoids adding a production framework dependency.
import { createServer } from "node:http";
// Path helpers normalize user-supplied URLs and keep filesystem access contained.
import { extname, join, resolve, sep } from "node:path";

// Vite writes the production bundle here when `npm run build` completes.
const root = resolve("dist");
// Environment variables allow deployment overrides while safe local defaults work immediately.
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const host = process.env.HOST ?? "127.0.0.1";

// Browsers use Content-Type to interpret each returned file correctly.
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".map", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".woff2", "font/woff2"],
]);

/** Returns true only when a resolved path is dist/ itself or one of its children. */
const isInsideRoot = (filePath) => {
  // Windows paths are case-insensitive, so both values are compared in lowercase.
  const normalizedRoot = root.toLowerCase();
  const normalizedPath = filePath.toLowerCase();
  // The separator prevents a sibling such as "dist-secret" matching "dist".
  return normalizedPath === normalizedRoot || normalizedPath.startsWith(`${normalizedRoot}${sep}`);
};

/** Validates and streams one file into an HTTP response. */
const sendFile = async (request, response, filePath) => {
  // stat throws when a path is absent, which the caller converts to SPA fallback or 404.
  const fileStats = await stat(filePath);
  // Directories must never be streamed as though they were normal response files.
  if (!fileStats.isFile()) {
    throw new Error("Not a regular file");
  }

  // Headers describe the body, cache policy, and a basic MIME-sniffing protection.
  response.writeHead(200, {
    "Content-Length": fileStats.size,
    "Content-Type": contentTypes.get(extname(filePath).toLowerCase()) ?? "application/octet-stream",
    "Cache-Control": filePath.endsWith("index.html")
      ? "no-cache"
      : "public, max-age=31536000, immutable",
    "X-Content-Type-Options": "nosniff",
  });

  // HEAD returns the same headers as GET but intentionally omits the body bytes.
  if (request.method === "HEAD") {
    response.end();
    return;
  }

  // pipe applies backpressure automatically while transferring the file.
  createReadStream(filePath).pipe(response);
};

/** Handles each request and applies the static-file/React-route decision tree. */
const server = createServer(async (request, response) => {
  // A static website has no reason to accept mutations such as POST or DELETE.
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method Not Allowed");
    return;
  }

  try {
    // URL parses query strings safely; only its pathname participates in file lookup.
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
    // Encoded characters are decoded before path normalization and containment checks.
    const pathname = decodeURIComponent(url.pathname);
    // The site root maps directly to index.html; other URLs lose their leading slash.
    const requestedPath = pathname === "/" ? "index.html" : pathname.slice(1);
    // resolve collapses .. segments so the following security check sees the true target.
    const filePath = resolve(root, requestedPath);

    // Reject traversal attempts before touching the resolved path.
    if (!isInsideRoot(filePath)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    try {
      await sendFile(request, response, filePath);
    } catch {
      // A client-side route (for example /resume) receives the React application.
      // A missing asset has an extension and remains a genuine 404 response.
      if (extname(pathname)) {
        response.writeHead(404);
        response.end("Not Found");
        return;
      }
      await sendFile(request, response, join(root, "index.html"));
    }
  } catch {
    // Malformed URLs and invalid percent encoding are client errors, not crashes.
    response.writeHead(400);
    response.end("Bad Request");
  }
});

// Start accepting connections only after all configuration above is established.
server.listen(port, host, () => {
  console.log(`UnderscoreGavin.dev is serving http://${host}:${port}`);
});
