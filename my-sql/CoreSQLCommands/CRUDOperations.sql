-- ---------------------------
-- INSERT
-- ---------------------------

-- The INSERT statement is used to add new records into a table.
-- Example of inserting a new record into the 'students' table:
INSERT INTO students (student_id, name, birth_date, grade)
VALUES (NULL, 'John Doe', '2005-04-15', 10); -- Inserts a new student record

-- Insert multiple records at once:
INSERT INTO students (student_id, name, birth_date, grade)
VALUES
    (NULL, 'Jane Smith', '2004-06-22', 11), -- First record
    (NULL, 'Alice Johnson', '2003-11-30', 12); -- Second record

-- ---------------------------
-- SELECT
-- ---------------------------

-- The SELECT statement is used to retrieve data from a table.
-- Example of selecting all records from the 'students' table:
SELECT * FROM students; -- Retrieves all columns and all rows from the 'students' table

-- Example of selecting specific columns from the 'students' table:
SELECT name, grade FROM students; -- Retrieves only the 'name' and 'grade' columns

-- Example of selecting records with a condition (WHERE clause):
SELECT * FROM students WHERE grade = 10; -- Retrieves records of students in grade 10

-- ---------------------------
-- UPDATE
-- ---------------------------

-- The UPDATE statement is used to modify existing records in a table.
-- Example of updating the 'grade' of a student named 'John Doe':
UPDATE students
SET grade = 11
WHERE name = 'John Doe'; -- Changes the grade of 'John Doe' to 11

-- Example of updating multiple columns at once:
UPDATE students
SET grade = 12, name = 'Johnathan Doe'
WHERE student_id = 1; -- Updates 'grade' and 'name' for the student with ID 1

-- ---------------------------
-- DELETE
-- ---------------------------

-- The DELETE statement is used to remove records from a table.
-- Example of deleting a student with a specific 'student_id':
DELETE FROM students WHERE student_id = 1; -- Deletes the student record where ID is 1

-- Example of deleting all records from the table (be cautious!):
DELETE FROM students; -- Deletes all records in the 'students' table (but keeps the table structure)

-- ---------------------------
-- Data Types in MySQL (Recap)
-- ---------------------------

-- Inserting values into various columns with different data types:

INSERT INTO example (id, description, created_at)
VALUES (1, 'Sample description', '2024-12-10'); -- Inserting into INT, VARCHAR, and DATE columns

INSERT INTO example (amount, score)
VALUES (99.99, 88.5); -- Inserting into DECIMAL and FLOAT columns

INSERT INTO example (image_data)
VALUES (LOAD_FILE('path/to/image.jpg')); -- Inserting binary data into a BLOB column

-- ---------------------------
-- Example usage
-- ---------------------------

INSERT INTO user(name, birth_date, email, age)VALUES
("sami", '2004-10-01', "sami@gmail.com", 20),
("Goru", "2400-10-2", "goru@gmail.com", 30),
("Khan", "2000-10-2", "kahn@gmail.com", 40),
("Ali", "1998-05-15", "ali1998@gmail.com", 26),
("Zara", "1995-03-22", "zara95@yahoo.com", 29),
("Liam", "2001-07-18", "liam2001@gmail.com", 23),
("Emma", "1989-12-05", "emma_b89@gmail.com", 35),
("Noah", "1992-01-11", "noah92@hotmail.com", 32),
("Olivia", "2003-09-30", "olivia2003@gmail.com", 21),
("Sophia", "2000-04-20", "sophia20@gmail.com", 24),
("Mia", "1997-10-15", "mia97@gmail.com", 27),
("Ethan", "1990-11-25", "ethan90@gmail.com", 34),
("Ava", "1999-08-14", "ava99@gmail.com", 25);
INSERT INTO customer(name,email,address,phone_number,id)VALUES("sami", "samikh@gmail.com", "24tigh", '832456356', 2)

UPDATE user set email_address = "sami@yahoo.com" WHERE name = "sami"

UPDATE customer set name = "sami" WHERE email = "sami@gmail.com"

UPDATE customer set name = "goru" WHERE id = 2

DELETE FROM user WHERE name = "sami"

DELETE FROM customer WHERE id = 2

DELETE FROM user