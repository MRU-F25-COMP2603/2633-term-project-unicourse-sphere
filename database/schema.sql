
-- Makes a new folder to store all project's tables.
CREATE DATABASE IF NOT EXISTS unicourse_min;
USE unicourse_min;
-- Remove this section when testing.
-- Tested using "https://www.db-fiddle.com/"

-- 1) USERS (accounts)
CREATE TABLE users (
  user_id       BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('student','mentor','admin') NOT NULL DEFAULT 'student',
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2) COURSES (catalog)
CREATE TABLE courses (
  course_id   BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code        VARCHAR(32)  NOT NULL UNIQUE,  -- e.g., "COMP 2603"
  title       VARCHAR(255) NOT NULL,
  description TEXT NULL
);

-- 3) ENROLLMENTS (who is in which course)
-- Keep it simple: one row per (user, course) with a role label
CREATE TABLE enrollments (
  user_id        BIGINT UNSIGNED NOT NULL,
  course_id      BIGINT UNSIGNED NOT NULL,
  role_in_course ENUM('student','mentor') NOT NULL,
  enrolled_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, course_id),
  CONSTRAINT fk_enr_user   FOREIGN KEY (user_id)  REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_enr_course FOREIGN KEY (course_id) REFERENCES courses(course_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- 4) MENTOR REQUESTS (student asks for help in a course)
CREATE TABLE mentor_requests (
  request_id   BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  course_id    BIGINT UNSIGNED NOT NULL,
  mentee_id    BIGINT UNSIGNED NOT NULL,
  preferred_mentor_id BIGINT UNSIGNED NULL,
  status       ENUM('requested','matched','declined','no_available','cancelled')
               NOT NULL DEFAULT 'requested',
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_mr_course   FOREIGN KEY (course_id) REFERENCES courses(course_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_mr_mentee   FOREIGN KEY (mentee_id) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_mr_pref_mentor FOREIGN KEY (preferred_mentor_id) REFERENCES users(user_id)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- 5) MENTOR PAIRS (confirmed matches for a course)
CREATE TABLE mentor_pairs (
  pair_id    BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  course_id  BIGINT UNSIGNED NOT NULL,
  mentor_id  BIGINT UNSIGNED NOT NULL,
  mentee_id  BIGINT UNSIGNED NOT NULL,
  started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ended_at   TIMESTAMP NULL DEFAULT NULL,
  CONSTRAINT fk_mp_course FOREIGN KEY (course_id) REFERENCES courses(course_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_mp_mentor FOREIGN KEY (mentor_id) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_mp_mentee FOREIGN KEY (mentee_id) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Minimal indexes to keep lookups snappy
CREATE INDEX idx_users_email   ON users(email);
CREATE INDEX idx_courses_code  ON courses(code);
CREATE INDEX idx_enr_course    ON enrollments(course_id);
CREATE INDEX idx_mr_status     ON mentor_requests(status);

-- ---- Quick smoke test (optional) ----
-- Seed two users and a course
INSERT INTO users(email,password_hash,role) VALUES
('alice@mtroyal.ca','x','student'),
('mentor@mtroyal.ca','y','mentor');
INSERT INTO courses(code,title) VALUES ('COMP2603','Web Development');

-- Enroll one student and one mentor in the course
INSERT INTO enrollments(user_id,course_id,role_in_course) VALUES
(1,1,'student'),
(2,1,'mentor');

-- Student requests a mentor, then gets matched
INSERT INTO mentor_requests(course_id, mentee_id, preferred_mentor_id)
VALUES (1,1,2);
INSERT INTO mentor_pairs(course_id, mentor_id, mentee_id) VALUES (1,2,1);
UPDATE mentor_requests SET status='matched' WHERE request_id=1;

-- Verify end-to-end
SHOW TABLES;
DESCRIBE users;
SELECT * FROM users;
SELECT * FROM courses;
SELECT * FROM enrollments;
SELECT * FROM mentor_requests;
SELECT * FROM mentor_pairs;
