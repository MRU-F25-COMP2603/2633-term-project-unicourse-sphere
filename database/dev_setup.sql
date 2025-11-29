-- Creates the UniCourse Sphere database and a local MySQL user for development/tests.

-- 1. Create the database (use the same name as in schema.sql)
CREATE DATABASE IF NOT EXISTS unicourse_min;
USE unicourse_min;

-- 2. Create a dedicated MySQL user for local dev + CI
CREATE USER IF NOT EXISTS 'ci_user'@'localhost' IDENTIFIED BY 'ci_password';

-- 3. Give that user full access to this database
GRANT ALL PRIVILEGES ON unicourse_min.* TO 'ci_user'@'localhost';

-- 4. Apply the permission changes
FLUSH PRIVILEGES;
