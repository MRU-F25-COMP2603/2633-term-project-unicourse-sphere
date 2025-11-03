-- Minimal seed for tests
INSERT INTO users (email, password_hash, role) VALUES
('mentor@mtroyal.ca','x','mentor'),
('student@mtroyal.ca','x','student');

INSERT INTO profiles (user_id, display_name) VALUES
(1,'Mentor One'),
(2,'Student One');

INSERT INTO courses (code, title, description, category) VALUES
('COMP-2603','Software Engineering','SE course','CS');

INSERT INTO professors (name,email) VALUES
('Dr. Smith','smith@mtroyal.ca');

INSERT INTO course_professors (course_id, professor_id, role) VALUES
(1,1,'instructor');

-- Mentor is enrolled as mentor; student as student
INSERT INTO enrollments (user_id, course_id, role_in_course) VALUES
(1,1,'mentor'),
(2,1,'student');

-- Optional sample rating
INSERT INTO ratings (user_id, course_id, rating, comment) VALUES
(2,1,5,'Great course!');
