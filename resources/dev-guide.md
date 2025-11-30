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

After cloning the repository, your project should look like this:

```sh
2633-term-project-unicourse-sphere/
├── database/                           # Contains SQL scripts for database creation and seeding
│   ├── dev_seed.sql                    # Sample data for development/testing
│   ├── schema.sql                      # MySQL schema defining tables, keys, and constraints
│   └── dev_setup.sql                   # Script to create the database, tables, and seed default development data
├── src/                                # Core server and database logic
│   ├── config/
│   │   └── .env.example                # Template for environment variables (copy to .env)
│   ├── db/
│   │   ├── envconfig.js                # Loads MySQL credentials from .env
│   │   └── mysql.js                    # Creates MySQL connection pool
│   └── server.js                       # Initializes and configures Express server, registers routes
├── routes/                             # Express route modules
│   ├── courses.js                      # API and HTML endpoints for course details
│   ├── featured-courses.js             # Endpoint serving featured courses
│   ├── home.js                         # Route for homepage
│   ├── professor-spotlight.js          # Endpoint for professor spotlight section
│   └── search.js                       # API endpoint for course search functionality
├── public/                             # Static public assets served by the Express server
│   ├── course_details.html             # HTML template for individual course pages
│   └── uni_course_sphere_homepage.html # Static homepage HTML file served at `/`
├── test/                               # Unit and integration tests
│   ├── course.search.test.js           # Tests for course search endpoint
│   ├── courses.test.js                 # Tests for courses API
│   ├── db.connection.test.js           # Tests MySQL database connectivity
│   ├── featured-courses.test.js        # Tests for featured courses API
│   ├── home.test.js                    # Tests for homepage route
│   ├── professor-spotlight.test.js     # Tests professor spotlight endpoint
│   ├── search.test.js                  # Tests search API endpoints
│   └── teardown.test.js                # Cleanup tests, reset DB after tests
├── resources/                          # Project documentation
│   ├── dev-guide.md                    # Developer setup, build, and workflow guide
│   ├── team-resources.md               # Internal team planning documents and conventions
│   └── user-guide.md                   # User-facing guide (setup and usage)
├── .env                                # Local environment variables (not tracked by Git)
├── .gitignore                          # Files/folders ignored by Git (node_modules, .env, etc.)
├── constants.js                        # Project-wide constants used throughout the application
├── eslint.config.mjs                   # ESLint configuration for linting
├── package-lock.json                   # Automatically generated lockfile for Node dependencies
├── package.json                        # Node.js project metadata and scripts
├── README.md                           # Project-level documentation
└── server.js                           # Entry point for the server; runs Express app
```

## Notes for Developers

- **src/**  
  Contains all server and database logic:
  - `server.js` — sets up the Express server and registers routes.
  - `db/` — MySQL connection logic (`mysql.js`) and environment variable loader (`envconfig.js`).
  - `config/` — holds the `.env.example` template for environment variables.

- **database/**  
  SQL scripts to create and seed the MySQL database:
  - `schema.sql` — defines tables, keys, and constraints.
  - `dev_setup.sql` — creates the database, tables, and seeds initial data.
  - `dev_seed.sql` — additional sample data for testing.

- **routes/**  
  All Express route modules, including APIs and HTML page endpoints:
  - `home.js` — homepage route.
  - `search.js` — course search API endpoint.
  - `courses.js` — course details endpoints.
  - `featured-courses.js` — featured courses API.
  - `professor-spotlight.js` — professor spotlight API.

- **public/**  
  Contains static assets served by the Express server:
  - `uni_course_sphere_homepage.html` — static homepage served at `/`.
  - `course_details.html` — HTML template for individual course pages.
  - Any additional assets like CSS, JS, or images can also be placed here.

- **test/**  
  Unit and integration tests for server routes, API endpoints, and database connectivity:
  - Follow Mocha/Chai conventions.
  - Test files must follow the `*.test.js` naming convention.

- **resources/**  
  Project documentation:
  - `dev-guide.md` — developer-focused setup and workflow guide.
  - `user-guide.md` — instructions for end-users.
  - `team-resources.md` — internal team planning documents and conventions.

- **Root files**
  - `server.js` — entry point used by `npm start`.
  - `.env` — local environment variables file; must be created from `.env.example`.
  - `constants.js` — project-wide constants used throughout the application.
  - `package.json` & `package-lock.json` — Node.js project metadata and dependency management.
  - `eslint.config.mjs` — ESLint configuration for linting and code style.
  - `README.md` — project-level documentation.

### 3. MySQL Database Setup

- It is important that you set up your own environment variables before you proceed with any tests, especially running tests for MySQL.
- **If you do not set this up first, local tests will fail and build will fail.**

  To set up MySQL for local development:

1. Open a terminal and log in as root:

```sh
mysql -u root -p
```

2. Run the database setup script:

```sh
SOURCE ./database/dev_setup.sql
```

3. Exit MySQL:

```sh
EXIT;
```

4. Update .env with your MySQL credentials:

```sh
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DB=unicourse_min
MYSQL_USER=root
MYSQL_PASSWORD=your_password
```

**Note:** These values must match your local database setup, otherwise the server and tests will fail.

5. **Important:** .env is not tracked by Git, so each developer must create their own copy from .env.example.

### 4. Build Instructions

1. Install Node.js (v18+) and MySQL.
2. Install project dependecies:

```sh
npm install
```

3. Start the server:

```sh
npm start
```

### 5. Testing

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

### 6. Adding New Tests

All automated tests must be written using **Mocha/Chai** and placed in the `/test` directory.  
Each test file must follow the naming convention: `*.test.js`

#### Test Structure Guidelines

- Place all new tests inside the `/test/` directory.
- Name the file after the module or feature being tested  
  (e.g., `server.test.js`, `course.search.test.js`, `featured-courses.test.js`).
- Use Mocha’s `describe()` and `it()` blocks for organizing test suites and individual tests.
- For server-related tests:
  - Use `startTestServer(port, appInstance)` to spin up the server.
  - Use `stopTestServer(server)` to properly shut down the server after tests.
  - Assign a unique port for each test file to prevent conflicts.
- For generic (non-server) tests, directly assert functionality using Node.js `assert` or your preferred assertion library.
- Always clean up resources (e.g., close server connections, clear database state if needed) to ensure tests are independent.
- Keep tests readable and modular; separate generic logic tests from API/endpoint tests.
- Seed test data in `before()` hooks when needed and clean up in `after()` hooks.

#### Example: Dummy Test File

```js
/**
 * @file dummy.test.js
 * @description Example test file demonstrating generic and server-related tests
 *              for UniCourse Sphere using server.test.js helpers
 */

import assert from "assert";
import { startTestServer, stopTestServer } from "./server.test.js"; // <--- use helpers
import { createServer } from "../server.js";

describe("Dummy Test Suite", function () {
  // ------------------------------
  // Generic Tests (no server)
  // ------------------------------
  it("should add numbers correctly", function () {
    assert.strictEqual(2 + 3, 5);
  });

  it("should handle array push/pop correctly", function () {
    const arr = [];
    arr.push(1);
    arr.push(2);
    assert.strictEqual(arr.length, 2);
    assert.strictEqual(arr.pop(), 2);
    assert.strictEqual(arr.length, 1);
  });

  it("should uppercase a string", function () {
    const str = "unicorn";
    assert.strictEqual(str.toUpperCase(), "UNICORN");
  });

  it("should verify object properties", function () {
    const obj = { name: "Alice", age: 25 };
    assert.strictEqual(obj.name, "Alice");
    assert.ok("age" in obj);
  });

  it("should resolve a promise correctly", async function () {
    const asyncFunc = () => Promise.resolve(42);
    const result = await asyncFunc();
    assert.strictEqual(result, 42);
  });

  // ------------------------------
  // Server-related Tests
  // ------------------------------
  let server, url;
  const PORT = 3002;

  before(async function () {
    ({ server, url } = await startTestServer(PORT, createServer()));
  });

  after(async function () {
    await stopTestServer(server);
  });

  it("should return empty array for empty search query", function (done) {
    const http = await import("http");
    http.get(`${url}/api/search?q=`, (res) => {
      assert.strictEqual(res.statusCode, 200);
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        assert.deepStrictEqual(JSON.parse(body), []);
        done();
      });
    });
  });

  it("should return 404 for unknown endpoint", function (done) {
    const http = await import("http");
    http.get(`${url}/nonexistent`, (res) => {
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

## 7. Reporting a Bug

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

### 8. Building A Release

- Ensure all dependencies are up to date:

```sh
npm install
```

- Run all tests and fix linting issues.
- Update _package.json_ version number if releasing a new version.
- Document any manual steps in release notes (e.g. .env setup)
