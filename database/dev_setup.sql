-- dev_setup.sql
-- Sets up the UniCourse database for development/tests

-- 1. Drop & recreate DB
DROP DATABASE IF EXISTS unicourse_min;
CREATE DATABASE unicourse_min;

-- 2. Use the database
USE unicourse_min;

-- 3. Load schema
SOURCE ./schema.sql;

-- 4. Load seed data
SOURCE ./dev_seed.sql;

-- 5. Create dedicated MySQL user for local dev + CI
CREATE USER IF NOT EXISTS 'ci_user'@'localhost' IDENTIFIED BY 'ci_password';
GRANT ALL PRIVILEGES ON unicourse_min.* TO 'ci_user'@'localhost';
FLUSH PRIVILEGES;

-- Optional: verify
SELECT * FROM courses\G
