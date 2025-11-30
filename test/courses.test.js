import assert from "assert";
import http from "http";
import { startTestServer, stopTestServer } from "./server.test.js";
import { createCoursesRouter } from "../routes/courses.js";
import express from "express";

/**
 * @testgroup Courses Router
 * @description Tests the `/api/courses/:courseCode` endpoint which returns course details.
 */
describe("Courses Router", function () {
  let server, url;
  const PORT = 3003;

  /**
   * @test
   * @description Spins up a temporary Express server with the courses route mounted.
   * The server is set up individually for each test to avoid using beforeEach/afterEach.
   */
  it("should start a test server", async function () {
    const app = express();
    app.use("/api/courses", createCoursesRouter());
    const { server: testServer, url: testUrl } = await startTestServer(
      PORT,
      app,
    );
    server = testServer;
    url = testUrl;
  });

  /**
   * @test
   * @description Verifies that the `/api/courses/:courseCode` endpoint returns valid course details.
   */
  it("should return 200 and course details for valid course code", function (done) {
    const courseCode = "COMP 2633";

    http.get(`${url}/api/courses/${courseCode}`, (res) => {
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
   * @description Verifies that the `/api/courses/:courseCode` endpoint returns 404 for non-existent courses.
   */
  it("should return 404 for non-existent course code", function (done) {
    const invalidCourseCode = "INVALID 0000";

    http.get(`${url}/api/courses/${invalidCourseCode}`, (res) => {
      assert.strictEqual(res.statusCode, 404);

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        const data = JSON.parse(body);
        assert.deepStrictEqual(data, { error: "Course not found" });
        done();
      });
    });
  });

  /**
   * @test
   * @description Stops the test server after the tests complete.
   */
  it("should stop the test server", async function () {
    await stopTestServer(server);
  });
});
