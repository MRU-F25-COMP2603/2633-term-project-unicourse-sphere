import assert from "assert";
import http from "http";
import { startTestServer, stopTestServer } from "./server.test.js";
import { createProfessorSpotlightRouter } from "../routes/professor-spotlight.js";
import express from "express";

/**
 * @testgroup Professor Spotlight Router
 * @description Tests the `/api/professors` endpoint which returns 3 random spotlight professors.
 */
describe("Professor Spotlight Router", function () {
  let server, url;
  const PORT = 3004;

  /**
   * @setup
   * @description Spins up a temporary Express server with the professor spotlight route mounted.
   */
  before(async function () {
    const app = express();
    app.use("/api/professors", createProfessorSpotlightRouter());
    ({ server, url } = await startTestServer(PORT, app));
  });

  /**
   * @teardown
   * @description Stops the test server after all tests in this suite complete.
   */
  after(async function () {
    await stopTestServer(server);
  });

  /**
   * @test
   * @description Verifies that the `/api/professors` endpoint returns a valid array of professors.
   * @query "SELECT professor_id, name, department, bio FROM professors ORDER BY RAND() LIMIT 3"
   * @expectedResult Returns an array of up to 3 professor objects, each containing name, department, and bio.
   */
  it("should return 200 and an array of professors", function (done) {
    http.get(`${url}/api/professors`, (res) => {
      assert.strictEqual(res.statusCode, 200);

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        const data = JSON.parse(body);
        assert.ok(Array.isArray(data), "Response should be an array");
        assert.ok(data.length <= 3, "Should return at most 3 professors");

        if (data.length > 0) {
          const prof = data[0];
          assert.ok(prof.professor_id, "Professor should have professor_id");
          assert.ok(prof.name, "Professor should have name");
          assert.ok(prof.department, "Professor should have department");
          assert.ok(prof.bio, "Professor should have bio");
        }

        done();
      });
    });
  });
});
