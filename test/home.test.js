import assert from "assert";
import http from "http";
import { startTestServer, stopTestServer } from "./server.test.js";

describe("Home Router", function () {
  let server, url;
  const PORT = 3001;

  before(async function () {
    ({ server, url } = await startTestServer(PORT));
  });

  after(async function () {
    await stopTestServer(server);
  });

  it("should return 200 for /", function (done) {
    http.get(`${url}/`, (res) => {
      assert.strictEqual(res.statusCode, 200);
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        assert.ok(body.length > 0);
        done();
      });
    });
  });

  // Other tests remain the same, just replace http.get calls with `${url}/...`
});
