import assert from "assert";
import http from "http";
import { startTestServer, stopTestServer } from "./server.test.js";
import { createFeaturedCoursesRouter } from "../routes/featured-courses.js";
import express from "express";

/**
 * @testgroup Featured Courses Router
 * @description Tests the `/api/featured` endpoint which returns 3 random featured courses.
 */
describe("Featured Courses Router", function () {
  let server, url;
  const PORT = 3003;

  /**
   * @setup
   * @description Spins up a temporary Express server with the featured courses route mounted.
   */
  before(async function () {
    const app = express();
    app.use("/api/featured", createFeaturedCoursesRouter());
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
   * @description Verifies that the `/api/featured` endpoint returns a valid array of courses.
   * @query "SELECT course_id, code, title, description, category FROM courses ORDER BY RAND() LIMIT 3"
   * @expectedResult Returns an array of up to 3 course objects, each containing code, title, description, and category.
   */
  it("should return 200 and an array of courses", function (done) {
    http.get(`${url}/api/featured`, (res) => {
      assert.strictEqual(res.statusCode, 200);

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        const data = JSON.parse(body);
        assert.ok(Array.isArray(data), "Response should be an array");
        assert.ok(data.length <= 3, "Should return at most 3 courses");

        if (data.length > 0) {
          const course = data[0];
          assert.ok(course.code, "Course should have code");
          assert.ok(course.title, "Course should have title");
          assert.ok(course.description, "Course should have description");
          assert.ok(course.category, "Course should have category");
        }

        done();
      });
    });
  });
});
