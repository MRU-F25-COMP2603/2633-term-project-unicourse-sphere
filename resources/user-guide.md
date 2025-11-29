# UniCourse Sphere — User Guide

This guide is for users who want to use the UniCourse Sphere system, whether to browse courses, request mentorship, or manage student/mentor enrollment.

---

## 1. High-Level Description

UniCourse Sphere is a web-based course management and mentorship system for university students.  
Users can:

- Search for courses by code, title, or instructor.
- Request mentorship in courses they are enrolled in.
- Track mentor-mentee pairings (for mentors and students).

**Why use it:**  
This system centralizes course and mentorship management, making it easier for students to find support and for mentors to manage requests.

---

## 2. Installation & Prerequisites

### Prerequisites

To run UniCourse Sphere locally, you will need:

1. **Node.js** (v18 or higher) — [Download here](https://nodejs.org/)
2. **MySQL** (v8.0 or higher recommended) — [Download here](https://dev.mysql.com/downloads/)
3. A code editor (e.g., **VS Code**) for editing `.env` and configuration files.
4. Internet browser for accessing the web interface (Chrome, Edge, or Firefox recommended).

### Installation Steps

1. Clone the repository:

```sh
git clone https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere.git
cd 2633-term-project-unicourse-sphere
```

2. Install Node.js dependencies:

```sh
npm install
```

3. Set up environment variables:

```sh
cp src/config/.env.example .env
```

4. Edit .env with your local MySQL credentials:

```sh
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DB=unicourse_min
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
```

## 3. Running the Web Application

1. Start the server:

```sh
npm start
```

2. Open your browser and navigate to:

```sh
http://localhost:3000
```

## 4. How to Use the Web Application

**Searching for Courses**

Use the search bar on the homepage to look for courses by:

- Course code (e.g., COMP2603)
- Course title (e.g., Web Development)
- Professor email

Results show course details and assigned mentors (if any).

**Requesting a Mentor**

Currently WIP — functionality to submit mentor requests is under development.

**Viewing Mentor Pairs**

Currently WIP — functionality to view confirmed mentor-mentee pairs is under development.

## 5. Reporting a Bug

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

## 6. Known Bugs & Limitations

Please check the GitHub Issues tracker for the latest known bugs and update.

- Frontend UI is minimal; only basic homepage and API endpoints are functional
- Full mentor request submission and approval workflow [WIP]
- Full mentor request submission and approval workflow [WIP]
- User authentication and roles management [WIP]
- Advanced search filters (e.g., course term, department) [WIP]

