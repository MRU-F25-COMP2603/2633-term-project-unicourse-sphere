# UniCourse Sphere — Feature Prototype (Homepage Delivery)

## Operational Feature (Prototype Demo)

For this sprint, we implemented a **vertical slice of the system** focusing on:

> **Serving the homepage from our Express.js server.**

- The server successfully starts on the configured port.
- Visiting `/` returns a static homepage (`uni_course_sphere_homepage.html`) from the filesystem.
- CI pipeline builds the project, loads dependencies, initializes a MySQL service, and runs tests using Mocha.

> Database interaction exists in the workflow, but for this sprint **no UI-initiated DB read/write is fully functional yet**.  
> Our only completed feature is displaying the homepage.

---

## Build, Test & Run Instructions

### 1. Clone the repository

```sh
git clone https://github.com/<your-org>/<repo>.git
cd <repo>
```

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

## Team Project Resources

## Communication Channel

- Discord: https://discord.gg/DQRQr872

## Shared Google Folder

- https://drive.google.com/drive/folders/1be69_p8fTZBI193rTmsEKDB3M50loTY7?usp=drive_link

## Names

- Precious Olatunde
- Loren Mena
- Mack Bautista

```

```
