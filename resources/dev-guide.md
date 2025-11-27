# UniCourse Sphere — Developer Guide

This guide is for developers who wish to become potential contributors for this project.

## Build, Test & Run Instructions

### 1. Clone the source code

Clone the main repository:

```sh
git clone https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere.git
cd 2633-term-project-unicourse-sphere
```

### 2. Directory Structure

- After cloning the repository, you should have the following structure:
  2633-term-project-unicourse-sphere/

```sh
2633-term-project-unicourse-sphere/
├── database/
│   ├── dev_seed.sql             # Sample data for development/testing
│   ├── schema.sql               # MySQL schema for database setup
├── src/
│   ├── config/
│   │   └── .env.example         # Example environment file for local setup
│   ├── db/
│   │   └── envconfig.js         # Exports MySQL environment variables from .env
│   │   └── mysql.js             # MySQL pool connection
│   │   └── test-db.js           # Optional test database script or connection helper
│   └── server.js                # Express server with routes and API endpoints
├── test/
│   └── course.search.test.js    # Tests for course search endpoints
│   └── db.connection.test.js    # Tests for database connectivity
│   └── server.test.js           # General server endpoint tests
├── .env                         # Local environment file (not tracked in Git)
├── .gitignore                   # Specifies files/folders Git should ignore
├── resources/
│   └── dev-guide.md             # Developer guide
│   └── team-resources.md        # Team-specific resources/documentation
│   └── user-guide.md            # User manual guide
├── constants.js                 # Centralized constants used across the project
├── eslint.config.mjs            # ESLint configuration for code style/linting
├── package-lock.json            # Auto-generated lockfile for Node dependencies
├── package.json                 # Node.js project configuration and scripts
├── README.md                    # Main project readme
├── server.js                    # Entry point to start the server
└── uni_course_sphere_homepage.html  # Static HTML homepage file
```

**Notes for developers:**

- The _src/_ directory contains all core server and database logic.
- The _database/_ folder holds SQL scripts for creating and seeding the database.
- The _resource/_ contains all project documentation.
- The root _server.js_ is the entry point used by npm start.
- The _.env_ file must be created locally using the _.env.example_ template inside _src/config/_.

### 3. Set Up Environment

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

All automated tests must be written using **Mocha/Chai** and placed in the `/test` directory.  
Each test file must follow the naming convention: `*.test.js`

#### Test Structure Guidelines

- Place all new tests inside the `/test/` directory.
- Name the file after the module or feature being tested  
  (e.g. `server.test.js`, `course.search.test.js`)
- Use Mocha’s `describe()` and `it()` blocks
- Always clean up resources (e.g. close server connections)
- Use a separate port for test servers to avoid conflicts

#### Example: Dummy Test File

```js
/**
 * @file dummy.test.js
 * @description Example test file demonstrating structure and coding style
 *              for UniCourse Sphere tests
 */

import assert from "assert";
import http from "http";
import { createServer } from "../src/server.js";

describe("Dummy Test Suite", function () {
  let server;
  const PORT = 3002;

  before(function (done) {
    server = http.createServer(createServer()).listen(PORT, done);
  });

  after(function (done) {
    server.close(done);
  });

  it("should return empty array for empty search query", function (done) {
    http.get(`http://localhost:${PORT}/api/search?q=`, (res) => {
      assert.strictEqual(res.statusCode, 200);

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        const json = JSON.parse(body);
        assert.deepStrictEqual(json, []);
        done();
      });
    });
  });

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

## 6. Reporting a Bug

If you encounter a bug:

1. Open a new issue in the GitHub repository:
   [Issues Tracker](https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/issues)
2. Provide:

- Steps to reproduce the bug
- Expected behaviour
- Actual behaviour
- Browser/OS information
- Screenshot (if applicable)

3. Resources for writing a good bug report:

    [How to Write a Good Bug Report](https://marker.io/blog/how-to-write-bug-report)

    [How to Write A Good Bug Report?](https://www.geeksforgeeks.org/software-testing/how-to-write-a-good-bug-report/)

    [Bug Writing Guidelines](https://bugzilla.mozilla.org/page.cgi?id=bug-writing.html)

### 7. Building A Release

- Ensure all dependencies are up to date:

```sh
npm install
```

- Run all tests and fix linting issues.
- Update _package.json_ version number if releasing a new version.
- Document any manual steps in release notes (e.g. .env setup)
