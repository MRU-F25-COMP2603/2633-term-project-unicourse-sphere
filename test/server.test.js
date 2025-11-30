import http from "http";
import { createServer } from "../server.js";

/**
 * Spins up an Express server for testing purposes.
 * @param {number} port - The port to listen on.
 * @param {import("express").Application} [appInstance] - Optional Express app instance.
 * @returns {Promise<{server: http.Server, url: string}>} - Resolves with the server and URL.
 */
export function startTestServer(port, appInstance) {
  const server = http.createServer(appInstance || createServer());
  const url = `http://localhost:${port}`;

  return new Promise((resolve, reject) => {
    server.listen(port, () => resolve({ server, url }));
    server.on("error", reject);
  });
}

/**
 * Gracefully stops a running HTTP server.
 * @param {http.Server} server - The server to stop.
 * @returns {Promise<void>} - Resolves when the server is closed.
 */
export function stopTestServer(server) {
  return new Promise((resolve, reject) => {
    if (!server.listening) return resolve(); // already closed
    server.close((err) => (err ? reject(err) : resolve()));
  });
}
