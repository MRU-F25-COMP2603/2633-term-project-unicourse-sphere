import assert from "assert";
import http from "http";
import { createServer } from "../server.js";

describe("Express Server", function () {
  let server;
  const PORT = 3001;

  // Start server before tests
  before(function (done) {
    server = http.createServer(createServer()).listen(PORT, done);
  });

  // Stop server after tests
  after(function (done) {
    server.close(done);
  });

  /**
   * @test
   * @description Sends GET request to "/" and expects:
   *   - HTTP 200
   *   - Non-empty response body (the home page)
   */
  it("should return 200 for /", function (done) {
    http.get(`http://localhost:${PORT}/`, (res) => {
      assert.strictEqual(res.statusCode, 200);

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        assert.ok(body.length > 0);
        done();
      });
    });
  });

  /**
   * @test
   * @description Sends GET request to "/" with an invalid file name.
   *   Overrides the file name in the server to "nonexistent.html".
   *   Expects:
   *     - HTTP 404
   *     - Response body: "Error: File Not Found"
   */
  it("should handle non-existent file gracefully", function (done) {
    process.env.FILE_NAME = "nonexistent.html"; // override file name dynamically

    http.get(`http://localhost:${PORT}/`, (res) => {
      assert.strictEqual(res.statusCode, 404);

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        assert.strictEqual(body, "Error: File Not Found");
        delete process.env.FILE_NAME; // cleanup after test
        done();
      });
    });
  });
});
