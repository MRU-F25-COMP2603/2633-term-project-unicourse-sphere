-- dev_setup.sql
-- Sets up the UniCourse database for development/tests

-- 1. Drop & recreate DB
DROP DATABASE IF EXISTS unicourse_min;
CREATE DATABASE unicourse_min;

-- 2. Use the database
USE unicourse_min;

-- 3. Load schema
SOURCE ./database/schema.sql;

-- 4. Load seed data
SOURCE ./database/dev_seed.sql;

-- 5. Create dedicated MySQL user for local dev + CI
CREATE USER IF NOT EXISTS 'ci_user'@'localhost' IDENTIFIED BY 'ci_password';
GRANT ALL PRIVILEGES ON unicourse_min.* TO 'ci_user'@'localhost';
FLUSH PRIVILEGES;

-- 6. Verification queries

-- Verify courses
SELECT 'Courses:' AS table_name;
SELECT * FROM courses\G

-- Verify users
SELECT 'Users:' AS table_name;
SELECT * FROM users;

-- Verify profiles
SELECT 'Profiles:' AS table_name;
SELECT * FROM profiles;

-- Verify professors
SELECT 'Professors:' AS table_name;
SELECT * FROM professors;

-- Verify course_professors mappings
SELECT 'Course Professors:' AS table_name;
SELECT * FROM course_professors;

-- Verify enrollments
SELECT 'Enrollments:' AS table_name;
SELECT * FROM enrollments;

-- Verify ratings
SELECT 'Ratings:' AS table_name;
SELECT * FROM ratings;

-- Optional: count rows for quick confirmation
SELECT 'Row counts:' AS info;
SELECT 
  (SELECT COUNT(*) FROM users) AS users,
  (SELECT COUNT(*) FROM profiles) AS profiles,
  (SELECT COUNT(*) FROM courses) AS courses,
  (SELECT COUNT(*) FROM professors) AS professors,
  (SELECT COUNT(*) FROM course_professors) AS course_professors,
  (SELECT COUNT(*) FROM enrollments) AS enrollments,
  (SELECT COUNT(*) FROM ratings) AS ratings;
