# UniCourse Sphere — Feature Prototype (Updated Home Delivery with Search Bar)

## 📌 Current Release

**Version:** v1.0.0  
**GitHub Tag:**  
https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/releases/tag/v1.0.0

## Documentation

The following comprehensive guides provide essential information for developing, using, and supporting the UniCourse Sphere project:

- **Developer Guide** – Technical documentation for contributors, including system architecture, setup instructions, and coding standards.  
  [Developer Guide](https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/blob/main/resources/dev-guide.md)

- **User Guide** – Step-by-step instructions for end users on how to navigate and use the UniCourse Sphere application.  
  [User Guide](https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/blob/main/resources/user-guide.md)

- **Team Resources** – Internal project materials such as planning documents, conventions, roles, and collaboration references. _Note: access to the Google Drive folder requires permission access._
  [Team Resources](https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/blob/main/resources/team-resources.md)

## Operational Feature (Prototype Demo)

For this sprint, we implemented a **vertical slice of the system** focusing on:

> **Serving the homepage from our Express.js server.**

- The server successfully starts on the configured port.
- Visiting `/` returns a static homepage (`uni_course_sphere_homepage.html`) from the filesystem.
- CI pipeline builds the project, loads dependencies, initializes a MySQL service, and runs tests using Mocha.

> Database interaction works but needs further testing, and prints out the available courses under the search bar.

---

## Setup & Usage

Detailed setup, configuration, testing, and usage instructions are maintained in the official guides:

- 📘 **Developer Setup & Testing**  
  https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/blob/main/resources/dev-guide.md

- 📗 **User Instructions**  
  https://github.com/MRU-F25-COMP2603/2633-term-project-unicourse-sphere/blob/main
  resources/user-guide.md

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
