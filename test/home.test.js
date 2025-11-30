import { expect } from "chai";
import { createServer } from "../server.js";
import { startTestServer, stopTestServer } from "./server.test.js";

/**
 * @testgroup Home Router
 * @description Tests the root (/) route of the application.
 */
describe("Home Router", function () {
  let server, url;
  const PORT = 3001;

  /**
   * @setup
   * @description Spins up an Express server for the home route before tests.
   */
  before(async function () {
    const app = createServer(); // Returns the main Express app
    ({ server, url } = await startTestServer(PORT, app));
  });

  /**
   * @teardown
   * @description Stops the test server after all tests complete.
   */
  after(async function () {
    await stopTestServer(server);
  });

  /**
   * @test
   * @description Verifies that the home route returns 200 and non-empty content.
   * @endpoint GET /
   * @expectedResult status = 200, body.length > 0
   */
  it("returns 200 and content for /", async function () {
    const response = await fetch(`${url}/`);
    const text = await response.text();

    expect(response.status).to.equal(200);
    expect(text.length).to.be.greaterThan(0);
  });
});
