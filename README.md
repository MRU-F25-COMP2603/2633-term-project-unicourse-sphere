# UniCourse Sphere — Feature Prototype (Updated Home Delivery with Search Bar)

## 📌 Current Release

**Version:** v1.0.0  
**GitHub Tag:**  
https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/releases/tag/v1.0.0

## Operational Feature (Prototype Demo)

For this sprint, we implemented a **vertical slice of the system** focusing on:

> **Serving the homepage from our Express.js server.**

- The server successfully starts on the configured port.
- Visiting `/` returns a static homepage (`uni_course_sphere_homepage.html`) from the filesystem.
- CI pipeline builds the project, loads dependencies, initializes a MySQL service, and runs tests using Mocha.

> Database interaction works but needs further testing, and prints out the available courses under the search bar.

---

## Build, Test & Run Instructions

### 1. Clone the repository

```sh
git clone https://github.com/<your-org>/<repo>.git
cd <repo>
```
## Database Setup (MySQL Required)

This project uses MySQL and includes setup scripts for consistent local configuration.

### Create the database and MySQL user

```sh
mysql -u root -p < database/dev_setup.sql

### 2. Create your local .env file:

```sh
# Copy the example file to create your local .env
cp src/config/.env.example src/config/.env

# Edit src/config/.env with your local MySQL credentials if needed
```

### 3. Install dependencies

```sh
npm install
```

### 4. Run the server

```sh
npm start
```

### 5. Load application in a web browser

```sh
# You should see home page (uni_course_sphere_homepage.html) being served by the Express server.

http://localhost:3000
```

### 7. Run automated tests (Mocha)

```sh
# Ensure your .env is configured (see step 2), then run:
npm test
```

---
