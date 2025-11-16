# UniCourse Sphere — Developer Guide

This guide is for developers who wish to become potential contributors for this project.

## Build, Test & Run Instructions

### 1. Clone the source code

Clone the main repository:

```sh
git clone https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere.git
cd 2633-term-project-unicourse-sphere
```

### 2. Set Up Environment

- It is important that you set up your own environment variables before you proceed with any tests, especially running tests for MySQL.
- **If you do not set this up first, local tests will fail and build will fail.**

1. Copy the example .env file to the root of the project:

```sh
cp src/config/.env.example .env
```

2. Open the .env in your editor and fill in the correct credentials for your MySQL database:

```sh
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DB=unicourse_min
MYSQL_USER=
MYSQL_PASSWORD=
```

**Note:** These values must match your local database setup, otherwise the server and tests will fail.

3. **Important:** .env is not tracked by Git, so each developer must create their own copy from .env.example.

### 3. Build Instructions

1. Install Node.js (v18+) and MySQL.
2. Install project dependecies:

```sh
npm install
```

3. Start the server:

```sh
npm start
```

### 4. Testing

- All tests are located in the _/test/_ directory
- Run tests using:

```sh
npm test
```

- ESLint checks are run automatically before tests through _pretest_
- Lint manually with:

```sh
npm run lint
npm run lint:fix
```

### 5. Adding New Tests

- Test files should be placed in _/test/_ and use the pattern \*_.test.js_.
- Use Mocha/Chai syntax:

```sh
/**
 * @file dummy.test.js
 * @description Example test file demonstrating coding style, structure, and headers
 *              for adding new tests in UniCourse Sphere.
 */

import assert from "assert";
import http from "http";
import { createServer } from "../src/server.js";

describe("Dummy Test Suite", function () {
  let server;
  const PORT = 3002; // Use a different port for dummy tests

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
   * @description Sends GET request to "/api/search" with empty query.
   *              Expects:
   *                - HTTP 200
   *                - Empty array returned
   */
  it("should return empty array for empty search query", function (done) {
    http.get(`http://localhost:${PORT}/api/search?q=`, (res) => {
      assert.strictEqual(res.statusCode, 200);

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        const json = JSON.parse(body);
        assert.deepStrictEqual(json, []); // Expect empty array
        done();
      });
    });
  });

  /**
   * @test
   * @description Sends GET request to a non-existent endpoint.
   *              Expects:
   *                - HTTP 404
   *                - Response body matches error message
   */
  it("should return 404 for unknown endpoint", function (done) {
    http.get(`http://localhost:${PORT}/nonexistent`, (res) => {
      assert.strictEqual(res.statusCode, 404);

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        assert.ok(body.includes("Error"));
        done();
      });
    });
  });
});
```

- Name your test files after the module being tests (e.g. server.test.js) for server testing.

### 6. Building A Release

- Ensure all dependencies are up to date:

```sh
npm install
```

- Run all tests and fix linting issues.
- Update _package.json_ version number if releasing a new version.
- Document any manual steps in release notes (e.g. .env setup)
