import { expect } from "chai";
import http from "http";
import pool from "../src/db/mysql.js";
import { startTestServer, stopTestServer } from "./server.test.js";

/**
 * @testgroup Search Router
 */
describe("Search Router", function () {
  let server, url;
  const PORT = 3002;

  before(async function () {
    ({ server, url } = await startTestServer(PORT));

    // Seed database for tests (INSERT IGNORE to avoid duplicates)
    await pool.query(
      "INSERT IGNORE INTO courses (code, title, description, category) VALUES (?, ?, ?, ?)",
      [
        "COMP 2633",
        "Foundations of Software Engineering",
        "Software life cycles models. Software process improvement. Goals and methods for requirements analysis and specification, software design, implementation, integration and testing of software.",
        "Computing",
      ],
    );

    await pool.query(
      "INSERT IGNORE INTO courses (code, title, description, category) VALUES (?, ?, ?, ?)",
      [
        "MATH 1203",
        "Linear Algebra for Scientists and Engineers",
        "Introduction to linear algebra for science students. Topics covered are vector and matrix algebra, systems of linear equations, determinants, linear transformations, polar coordinates and complex numbers.",
        "Mathematics",
      ],
    );
  });

  after(async function () {
    await stopTestServer(server);
    // Do NOT close the pool here; keep it open for other tests
  });

  /**
   * @test
   * @description Verifies that a search for a course code returns matching courses.
   * @endpoint GET /api/search?q=COMP
   * @expectedResult status = 200, JSON array containing "COMP 2633"
   */
  it("returns 200 and JSON array for /api/search?q=COMP", function (done) {
    http.get(`${url}/api/search?q=COMP`, (res) => {
      expect(res.statusCode).to.equal(200);
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        const data = JSON.parse(body);
        expect(Array.isArray(data)).to.be.true;
        expect(data.some((c) => c.code === "COMP 2633")).to.be.true;
        done();
      });
    });
  });

  /**
   * @test
   * @description Ensures non-matching queries return an empty array.
   * @endpoint GET /api/search?q=NOPE
   * @expectedResult status = 200, empty array
   */
  it("returns empty array for non-matching search query", function (done) {
    http.get(`${url}/api/search?q=NOPE`, (res) => {
      expect(res.statusCode).to.equal(200);
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        const data = JSON.parse(body);
        expect(Array.isArray(data)).to.be.true;
        expect(data.length).to.equal(0);
        done();
      });
    });
  });
});
