-- ---------------------------
-- CREATE TABLE
-- ---------------------------

-- The CREATE TABLE statement is used to create a new table in the database.
-- Example of creating a 'students' table:
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY, -- Auto-incremented integer as the primary key
    name VARCHAR(50) NOT NULL, -- Name of the student, cannot be NULL
    birth_date DATE, -- Birthdate of the student (DATE format)
    grade INT DEFAULT 0 -- Grade of the student with a default value of 0
);

-- ---------------------------
-- ALTER TABLE
-- ---------------------------

-- The ALTER TABLE statement is used to modify an existing table structure.
-- Adding a new column 'email' and dropping an existing column 'birth_date':
ALTER TABLE students
ADD email VARCHAR(100), -- Adds a new 'email' column
DROP COLUMN birth_date; -- Drops the 'birth_date' column from the table

-- ---------------------------
-- DROP TABLE
-- ---------------------------

-- The DROP TABLE statement is used to remove an existing table along with its data.
-- Example of dropping the 'students' table:
DROP TABLE students;

-- ---------------------------
-- Data Types in MySQL
-- ---------------------------

-- Numeric Data Types
-- INT: Integer numbers
-- A column for student ID
CREATE TABLE example (
    student_id INT -- Integer data type
);

-- TINYINT: Very small integer
-- A column for age with a small range of values
CREATE TABLE example (
    age TINYINT -- Small integer data type (from -128 to 127)
);

-- SMALLINT: Small integer
-- A column for small numerical values
CREATE TABLE example (
    quantity SMALLINT -- Small integer data type (from -32,768 to 32,767)
);

-- MEDIUMINT: Medium-sized integer
-- A column for slightly larger integer values
CREATE TABLE example (
    temperature MEDIUMINT -- Medium-sized integer data type
);

-- BIGINT: Large integer
-- A column for large numerical values
CREATE TABLE example (
    large_number BIGINT -- Large integer data type (from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807)
);

-- FLOAT: Floating-point numbers (single precision)
-- A column for decimal values like scores
CREATE TABLE example (
    score FLOAT(10,2) -- Floating-point number with 2 decimal places
);

-- DOUBLE: Double precision floating-point numbers
-- A column for high-precision values
CREATE TABLE example (
    measurement DOUBLE -- Double-precision floating-point number
);

-- DECIMAL: Exact numeric data types for fixed-point numbers
-- A column for monetary values
CREATE TABLE example (
    amount DECIMAL(10,2) -- Fixed-point number with 2 decimal places
);

-- String Data Types
-- VARCHAR(size): Variable-length string, where 'size' defines the maximum length
-- A column for the student's name
CREATE TABLE example (
    student_name VARCHAR(100) -- Variable-length string with a maximum of 100 characters
);

-- CHAR(size): Fixed-length string
-- A column for fixed-length codes
CREATE TABLE example (
    country_code CHAR(3) -- Fixed-length string with exactly 3 characters
);

-- TEXT: Stores large text values up to 65,535 characters
-- A column for a long description
CREATE TABLE example (
    description TEXT -- Large text data type
);

-- TINYTEXT: A very small string (up to 255 characters)
-- A column for short comments
CREATE TABLE example (
    short_comment TINYTEXT -- Very small text data type
);

-- MEDIUMTEXT: A medium-sized string (up to 16,777,215 characters)
-- A column for detailed descriptions
CREATE TABLE example (
    detailed_description MEDIUMTEXT -- Medium-sized text data type
);

-- LONGTEXT: A very large string (up to 4,294,967,295 characters)
-- A column for extensive articles
CREATE TABLE example (
    article LONGTEXT -- Very large text data type
);

-- BLOB: Binary Large Object, used for storing binary data
-- A column for storing image files
CREATE TABLE example (
    image_data BLOB -- Binary data for storing files or images
);

-- TINYBLOB: Very small binary object (up to 255 bytes)
-- A column for storing small files
CREATE TABLE example (
    small_file TINYBLOB -- Very small binary object data type
);

-- MEDIUMBLOB: Medium-sized binary object (up to 16,777,215 bytes)
-- A column for medium-sized files
CREATE TABLE example (
    medium_file MEDIUMBLOB -- Medium-sized binary object data type
);

-- LONGBLOB: Very large binary object (up to 4,294,967,295 bytes)
-- A column for storing large files
CREATE TABLE example (
    large_file LONGBLOB -- Very large binary object data type
);

-- Date and Time Data Types
-- DATE: Stores date values in 'YYYY-MM-DD' format
-- A column for the student's date of birth
CREATE TABLE example (
    birth_date DATE -- Date data type
);

-- DATETIME: Stores date and time values in 'YYYY-MM-DD HH:MM:SS' format
-- A column for the student's registration date
CREATE TABLE example (
    registration DATETIME -- Date and time data type
);

-- TIMESTAMP: Stores date and time values along with timezone info
-- A column for the last login time
CREATE TABLE example (
    last_login TIMESTAMP -- Timestamp data type
);

-- TIME: Stores time values in 'HH:MM:SS' format
-- A column for the exam time
CREATE TABLE example (
    exam_time TIME -- Time data type
);

-- YEAR: Stores a 4-digit year value
-- A column for the year the student was enrolled
CREATE TABLE example (
    enrollment_year YEAR -- Year data type
);

-- ---------------------------
-- Constraints in MySQL
-- ---------------------------

-- Primary Key: Ensures uniqueness and non-null values in a column
-- The 'student_id' column is the primary key
CREATE TABLE example (
    student_id INT PRIMARY KEY -- Primary key for unique identification
);

-- Foreign Key: Establishes a relationship between two tables
--The 'student_id' column references 'students' table
CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    student_id INT,
    FOREIGN KEY (student_id) REFERENCES students(student_id) -- Foreign key referencing 'students'
);

-- Unique: Ensures all values in a column are unique
-- The 'email' column must have unique values
CREATE TABLE example (
    email VARCHAR(100) UNIQUE -- Ensures email values are unique
);

-- Not Null: Ensures that a column cannot contain NULL values
-- The 'student_name' column cannot be NULL
CREATE TABLE example (
    student_name VARCHAR(100) NOT NULL -- Ensures student name is always provided
);

-- Default: Provides a default value for a column if no value is specified
-- The 'status' column has a default value of 'active'
CREATE TABLE example (
    status VARCHAR(50) DEFAULT 'active' -- Default value of 'active' for status
);

-- ---------------------------
-- Exapme usage
-- ---------------------------

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    birth_date DATE,
    age INT NOT NULL,
    email VARCHAR(100) UNIQUE,
    status VARCHAR(50) DEFAULT 'active'
);

CREATE TABLE customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    address VARCHAR(255),
    phone_number VARCHAR(20),
    id INT,
    FOREIGN KEY (id) REFERENCES user(user_id)
)

ALTER TABLE user
DROP COLUMN email_address
ADD email_address VARCHAR(50) NOT NULL

DROP Table user