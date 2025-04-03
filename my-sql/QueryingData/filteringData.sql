-- ---------------------------
-- Filtering Data
-- ---------------------------

-- The WHERE clause is used to filter records based on specific conditions.
-- You can use comparison operators and logical operators to refine your queries.

-- ---------------------------
-- WHERE with Conditions
-- ---------------------------

-- Example of using WHERE to filter records based on a condition:
SELECT * FROM students WHERE grade = 10; -- Retrieves students in grade 10

-- Example of using WHERE with a text condition:
SELECT * FROM students WHERE name = 'John Doe'; -- Retrieves records where the student's name is 'John Doe'

-- ---------------------------
-- Logical Operators (AND, OR, NOT)
-- ---------------------------

-- The AND operator allows you to combine multiple conditions:
SELECT * FROM students WHERE grade = 10 AND name = 'John Doe'; -- Retrieves students in grade 10 named 'John Doe'

-- The OR operator allows you to filter data if either condition is true:
SELECT * FROM students WHERE grade = 10 OR grade = 11; -- Retrieves students in either grade 10 or 11

-- The NOT operator negates the condition:
SELECT * FROM students WHERE NOT grade = 10; -- Retrieves students who are NOT in grade 10

-- ---------------------------
-- Comparison Operators (=, <, >, !=, LIKE)
-- ---------------------------

-- Comparison operators can be used to compare values in columns with specific values.

-- Equal to (=):
SELECT * FROM students WHERE grade = 10; -- Retrieves students in grade 10

-- Less than (<):
SELECT * FROM students WHERE grade < 10; -- Retrieves students in grades lower than 10

-- Greater than (>):
SELECT * FROM students WHERE grade > 10; -- Retrieves students in grades higher than 10

-- Not equal to (!=):
SELECT * FROM students WHERE grade != 10; -- Retrieves students who are NOT in grade 10

-- LIKE for pattern matching (used with strings):
SELECT * FROM students WHERE name LIKE 'John%'; -- Retrieves students whose name starts with 'John'

-- Using LIKE with wildcard characters:
SELECT * FROM students WHERE name LIKE '%Doe'; -- Retrieves students whose name ends with 'Doe'
SELECT * FROM students WHERE name LIKE '%hn%'; -- Retrieves students whose name contains 'hn'

-- Example using NOT LIKE:
SELECT * FROM students WHERE name NOT LIKE 'John%'; -- Retrieves students whose name does NOT start with 'John'

-- ---------------------------
-- Example usage
-- ---------------------------

SELECT * FROM user 

SELECT * FROM user WHERE user_id = 2

SELECT * FROM user WHERE name = "sami" OR name = "goru"

SELECT * FROM user WHERE name = "sami" AND age = 30

SELECT * FROM user WHERE NOT name = "sami" 

SELECT * FROM user WHERE name != "sami" 

SELECT * FROM user WHERE age >= 30

SELECT * FROM user WHERE name LIKE "S%"

SELECT * FROM user WHERE email LIKE "%@gmail.com"