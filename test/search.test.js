import assert from "assert";
import http from "http";
import * as db from "../src/db/mysql.js";
import { startTestServer, stopTestServer } from "./server.test.js";

describe("Search Router", function () {
  let server, url;
  const PORT = 3002;

  before(async function () {
    db.default.query = async () => [
      [
        {
          course_id: 1,
          code: "COMP1501",
          title: "Programming I",
          description: "Intro",
          professor: "test@uni.com",
        },
      ],
    ];

    ({ server, url } = await startTestServer(PORT));
  });

  after(async function () {
    await stopTestServer(server);
  });

  it("should return 200 and JSON array for /api/search?q=COMP", function (done) {
    http.get(`${url}/api/search?q=COMP`, (res) => {
      assert.strictEqual(res.statusCode, 200);
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        const data = JSON.parse(body);
        assert.ok(Array.isArray(data));
        assert.strictEqual(data[0].code, "COMP1501");
        done();
      });
    });
  });
});
