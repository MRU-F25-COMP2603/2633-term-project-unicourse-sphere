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
    process.env.FILE_NAME = "nonexistent.html";

    http.get(`http://localhost:${PORT}/`, (res) => {
      assert.strictEqual(res.statusCode, 404);

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        assert.strictEqual(body, "Error: File Not Found");
        delete process.env.FILE_NAME;
        done();
      });
    });
  });

  /**
   * @test
   * @description Verifies that the home page returns a non-empty body.
   *   Does NOT check for HTML tags because the file may not contain <html>.
   * @endpoint "/"
   * @expectedResult:
   *   - HTTP 200
   *   - Non-empty response
   */
  it("should return a non-empty home page body", function (done) {
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
   * @description Ensures server sets correct Content-Type for HTML pages.
   * @endpoint "/"
   * @expectedResult:
   *   - Header "content-type" includes "text/html"
   */
  it("should return Content-Type text/html for home page", function (done) {
    http.get(`http://localhost:${PORT}/`, (res) => {
      const contentType = res.headers["content-type"];
      assert.ok(contentType.includes("text/html"));
      done();
    });
  });

  /**
   * @test
   * @description Sends GET request using query parameters.
   *   This test ensures the server does not crash or reject URLs with queries.
   * @endpoint "/?test=123"
   * @expectedResult:
   *   - HTTP 200
   */
  it("should handle URLs with query parameters", function (done) {
    http.get(`http://localhost:${PORT}/?test=123`, (res) => {
      assert.strictEqual(res.statusCode, 200);
      done();
    });
  });

  /**
   * @test
   * @description Ensures server returns 404 for unsupported POST method.
   * @endpoint POST "/"
   * @expectedResult:
   *   - HTTP 404
   *   - Response body: "Error: File Not Found"
   */
  it("should return 404 for unsupported POST method", function (done) {
    const req = http.request(
      {
        hostname: "localhost",
        port: PORT,
        path: "/",
        method: "POST",
      },
      (res) => {
        assert.strictEqual(res.statusCode, 404);

        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          assert.strictEqual(body, "Error: File Not Found");
          done();
        });
      },
    );

    req.end();
  });

  /**
   * @test
   * @description Ensures the home page contains valid HTML structure.
   *   Specifically checks for presence of <html> and </body> tags.
   */
  it("should return HTML document structure for /", function (done) {
    // Force correct homepage file
    process.env.FILE_NAME = "uni_course_sphere_homepage.html";

    http.get(`http://localhost:${PORT}/`, (res) => {
      assert.strictEqual(res.statusCode, 200);

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        assert.ok(body.includes("<html"), "Missing <html> tag");
        assert.ok(body.includes("</body>"), "Missing </body> tag");
        assert.ok(body.includes("<head>"), "Missing <head> tag");
        done();
      });
    });
  });

  /*Generate more tests starting here*/
});
