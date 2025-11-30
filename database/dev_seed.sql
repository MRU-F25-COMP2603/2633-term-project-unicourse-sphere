-- dev_seed.sql
-- Populates the UniCourse database with sample data for testing and development.
-- Includes sample users, courses, professors, enrollments, and ratings.

-- Minimal seed for tests
INSERT INTO users (email, password_hash, role) VALUES
('mbaut981@mtroyal.ca','x','mentor'),
('lmena909@mtroyal.ca','x','student');

-- 1. Profiles
INSERT INTO profiles (user_id, display_name) VALUES
  (1, 'mbaut981'),
  (2, 'lmena909');

-- 2. Courses
INSERT INTO courses (code, title, description, category, level) VALUES
  ('COMP 2633', 
   'Foundations of Software Engineering', 
   'Software life cycles models. Software process improvement. Goals and methods for requirements analysis and specification, software design, implementation, integration and testing of software.', 
   'Computing',
   '2000'),

  ('MATH 1203', 
   'Linear Algebra for Scientists and Engineers', 
   'Introduction to linear algebra for science students. Topics covered are vector and matrix algebra, systems of linear equations, determinants, linear transformations, polar coordinates and complex numbers.', 
   'Mathematics',
   "1000"),

  ('COMP 1501', 
   'Programming I: Introduction to Problem Solving and Programming', 
   'The course emphasizes the design of fundamental algorithmic solutions and the implementation of those solutions in a visual development environment.', 
   'Computing',
   '1000');

-- 3. Professors (include department!)
INSERT INTO professors (name, department, bio, email) VALUES
  ('Apoorve Chokshi', 
  'Computing', 
  "Teaches across both the BCIS and Computer Science programs, including programming, game development, and software engineering principles.", 
  "achokshi@mtroyal.ca"),

  ('Ganesh Bhandari', 
  'Mathematics', 
  "Known for clear lectures and practical problem sets.",
  "gbhandari@mtroyal.ca");

-- 4. Course Professors
-- Map courses to professors by their IDs
INSERT INTO course_professors (course_id, professor_id, role) VALUES
  (1, 1, 'instructor'),   -- COMP 2633 -> Apoorve Chokshi
  (3, 1, 'instructor'),   -- COMP 1501 -> Apoorve Chokshi
  (2, 2, 'instructor');   -- MATH 1203 -> Ganesh Bhandari

-- 5. Enrollments
-- Mentor is enrolled as mentor; student as student
INSERT INTO enrollments (user_id, course_id, role_in_course) VALUES
  (1, 1, 'mentor'),
  (2, 1, 'student');

-- 6. Mentor Pairs (Create the mentor-student relationship for COMP 2633)
INSERT INTO mentor_pairs (course_id, mentor_id, mentee_id) 
VALUES (1, 1, 2);

-- 7. Ratings (Optional sample rating)
INSERT INTO ratings (user_id, course_id, rating, comment) VALUES
  (2, 1, 5, 'Great course!');
