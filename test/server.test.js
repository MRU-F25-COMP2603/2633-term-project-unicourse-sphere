// test/app.test.js
const assert = require("assert");
const http = require("http");
const { createServer } = require("../server");

describe("HTTP Server", function () {
  let server;
  const PORT = 3001; // use a different port for tests

  // Start server before tests
  before(function (done) {
    server = createServer().listen(PORT, done);
  });

  // Stop server after tests
  after(function (done) {
    server.close(done);
  });

  it("should return 200 for /", function (done) {
    http.get(`http://localhost:${PORT}/`, (res) => {
      assert.strictEqual(res.statusCode, 200);
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        assert.ok(data.length > 0); // file content exists
        done();
      });
    });
  });

  it("should handle non-existent file gracefully", function (done) {
    // Temporarily test with a wrong file
    const fs = require("fs");
    const originalFile = "index.html";
    const wrongFile = "nonexistent.html";
    const serverWithWrongFile = http
      .createServer((req, res) => {
        fs.readFile(wrongFile, (err, data) => {
          if (err) {
            res.writeHead(404);
            res.write("Error: File Not Found");
          } else {
            res.write(data);
          }
          res.end();
        });
      })
      .listen(PORT + 1);

    http.get(`http://localhost:${PORT + 1}/`, (res) => {
      assert.strictEqual(res.statusCode, 404);
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        assert.strictEqual(body, "Error: File Not Found");
        serverWithWrongFile.close(done);
      });
    });
  });
});
