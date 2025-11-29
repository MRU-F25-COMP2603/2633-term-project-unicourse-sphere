import http from "http";
import { createServer } from "../server.js";

/**
 * Helper function to spin up an Express server for tests.
 * @param {number} port - Port to listen on
 * @returns {Object} - { server, url }
 */
export function startTestServer(port) {
  const server = http.createServer(createServer());
  const url = `http://localhost:${port}`;

  return new Promise((resolve) => {
    server.listen(port, () => resolve({ server, url }));
  });
}

/**
 * Stops a running HTTP server.
 * @param {http.Server} server
 * @returns {Promise<void>}
 */
export function stopTestServer(server) {
  return new Promise((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
}
