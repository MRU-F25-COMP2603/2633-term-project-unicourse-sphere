-- dev_seed.sql
-- Populates the UniCourse database with sample data for testing and development.
-- Includes sample users, courses, professors, enrollments, and ratings.

-- Minimal seed for tests
INSERT INTO users (email, password_hash, role) VALUES
('mentor@mtroyal.ca','x','mentor'),
('student@mtroyal.ca','x','student');

-- 1. Profiles
INSERT INTO profiles (user_id, display_name) VALUES
  (1, 'Mentor One'),
  (2, 'Student One');

-- 2. Courses
INSERT INTO courses (code, title, description, category) VALUES
  ('COMP-2603', 'Software Engineering', 'SE course', 'CS'),
  ('COMP-2659', 'Systems Programming', 'Low-level C project', 'CS');

-- 3. Professors
INSERT INTO professors (name, email) VALUES
  ('Dr. Smith', 'smith@mtroyal.ca');

-- 4. Course Professors
INSERT INTO course_professors (course_id, professor_id, role) VALUES
  (1, 1, 'instructor');

-- 5. Enrollments
-- Mentor is enrolled as mentor; student as student
INSERT INTO enrollments (user_id, course_id, role_in_course) VALUES
  (1, 1, 'mentor'),
  (2, 1, 'student');

-- 6. Ratings
-- Optional sample rating
INSERT INTO ratings (user_id, course_id, rating, comment) VALUES
  (2, 1, 5, 'Great course!');
