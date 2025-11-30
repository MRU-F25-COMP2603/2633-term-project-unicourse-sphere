import assert from "assert";
import http from "http";
import express from "express";
import { startTestServer, stopTestServer } from "./server.test.js";
import { createCoursesRouter } from "../routes/courses.js";

/**
 * @testgroup Courses Router
 * @description Tests the `/courses/api/:courseCode` endpoint that returns course details.
 */
describe("Courses Router", function () {
  let server, url;
  const PORT = 3003;

  /**
   * @test
   * @description Spins up a temporary Express test server with the courses router mounted.
   */
  it("should start a test server", async function () {
    const app = express();
    app.use("/courses", createCoursesRouter()); // updated mount path
    const { server: testServer, url: testUrl } = await startTestServer(
      PORT,
      app,
    );
    server = testServer;
    url = testUrl;
  });

  /**
   * @test
   * @description Verifies that `/courses/api/:courseCode` returns 200 and valid course details.
   */
  it("should return 200 and course details for a valid course code", function (done) {
    const courseCode = "COMP 2633";

    http.get(`${url}/courses/api/${encodeURIComponent(courseCode)}`, (res) => {
      assert.strictEqual(res.statusCode, 200);

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        const data = JSON.parse(body);

        assert.ok(data.code, "Course should have code");
        assert.ok(data.title, "Course should have title");
        assert.ok(data.description, "Course should have description");
        assert.ok(data.department, "Course should have department");
        assert.ok(data.professor, "Course should have professor");
        assert.ok(data.mentor, "Course should have mentor");

        done();
      });
    });
  });

  /**
   * @test
   * @description Verifies that `/courses/api/:courseCode` returns 404 for bad codes.
   */
  it("should return 404 for non-existent course code", function (done) {
    const invalidCourseCode = "INVALID 0000";

    http.get(
      `${url}/courses/api/${encodeURIComponent(invalidCourseCode)}`,
      (res) => {
        assert.strictEqual(res.statusCode, 404);

        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          const data = JSON.parse(body);
          assert.deepStrictEqual(data, { error: "Course not found" });
          done();
        });
      },
    );
  });

  /**
   * @test
   * @description Stops the test server after all tests complete.
   */
  it("should stop the test server", async function () {
    await stopTestServer(server);
  });
});
