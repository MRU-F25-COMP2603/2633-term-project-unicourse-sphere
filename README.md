# UniCourse Sphere — Final Release

## 📌 Current Release

**Version:** v1.1.1 (Final Release)  
**GitHub Tag:**  
[https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/releases/tag/v1.1.1](https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/releases/tag/v1.1.1)

---

## 🚀 Overview

**UniCourse Sphere** is a web application designed to help students and mentors explore course offerings, view detailed course information, and connect with instructors and mentors.

This release delivers a fully functional first use case:

- Dynamic course search
- Course details pages with full metadata (code, title, department, level, professor, mentor, description, and average rating)
- Responsive, user-friendly interface served via an Express.js backend
- Integration with MySQL database seeded with sample course, professor, and user data

---

## 📚 Documentation

Comprehensive guides for development and usage are available:

- **Developer Guide** – Technical documentation including architecture, setup instructions, database schema, and coding standards.  
  [Developer Guide](https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/blob/main/resources/dev-guide.md)

- **User Guide** – Instructions for navigating and using the application as a student, mentor, or professor.  
  [User Guide](https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/blob/main/resources/user-guide.md)

- **Team Resources** – Internal planning documents, workflow conventions, and collaboration references. Access requires permission.  
  [Team Resources](https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/blob/main/resources/team-resources.md)

---

## 🏗 Features in this Release

### Core Functionality

- **Homepage & Search**
  - Search courses by code or title
  - Autocomplete suggestions
  - Redirects to course details page on selection

- **Course Details**
  - Displays:
    - Course code & title
    - Department & level
    - Assigned professor & mentor
    - Full course description
    - Average rating from student feedback
  - Fully dynamic, pulling live data from MySQL

- **Backend**
  - Express.js API endpoints:
    - `/courses/api/:courseCode` → JSON course details
    - `/courses/:courseCode` → Course details HTML page
  - Database integration using MySQL
  - Error handling for missing courses

- **Testing**
  - Mocha & Node.js-based unit tests for API and routes
  - Automated test server setup

---

## ⚙️ Setup & Usage

Detailed setup, configuration, testing, and usage instructions are maintained in the official guides:

- 📘 **Developer Setup & Testing**  
  https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/blob/main/resources/dev-guide.md

- 📗 **User Instructions**  
  https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/blob/main/resources/user-guide.md

## Reporting A Bug

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
