-- ---------------------------
-- ORDER BY (Ascending and Descending)
-- ---------------------------

-- The ORDER BY clause is used to sort rows in ascending or descending order.
-- By default, ORDER BY sorts in ascending order (ASC). Use DESC for descending order.

-- Sort users by age in ascending order (default behavior).
SELECT * FROM users
ORDER BY age ASC; 
-- Retrieves all users and sorts them by 'age' in ascending order (smallest to largest).

-- Sort users by age in descending order.
SELECT * FROM users
ORDER BY age DESC; 
-- Retrieves all users and sorts them by 'age' in descending order (largest to smallest).

-- Sort users by multiple columns.
SELECT * FROM users
ORDER BY city ASC, age DESC; 
-- First, sorts users by 'city' in ascending order (alphabetically).
-- Then, for users with the same 'city', sorts them by 'age' in descending order.

-- ---------------------------
-- LIMIT to Control the Number of Rows Returned
-- ---------------------------

-- The LIMIT clause is used to restrict the number of rows returned by a query.
-- This is useful for pagination or when you need a specific number of results.

-- Return only the first 5 users.
SELECT * FROM users
LIMIT 5; 
-- Retrieves the first 5 rows from the 'users' table.

-- Skip the first 10 rows and return the next 5 rows.
SELECT * FROM users
LIMIT 5 OFFSET 10; 
-- Skips the first 10 rows and retrieves the next 5 rows. Useful for implementing pagination.

-- ---------------------------
-- Combining ORDER BY and LIMIT
-- ---------------------------

-- You can combine ORDER BY and LIMIT to get a sorted subset of results.

-- Get the 3 oldest users.
SELECT * FROM users
ORDER BY age DESC
LIMIT 3; 
-- Sorts users by 'age' in descending order and retrieves the top 3 rows.

-- Get the 5 youngest users.
SELECT * FROM users
ORDER BY age ASC
LIMIT 5; 
-- Sorts users by 'age' in ascending order and retrieves the first 5 rows.

-- Get the 5 users with the highest salary, skipping the top 3.
SELECT * FROM users
ORDER BY salary DESC
LIMIT 5 OFFSET 3; 
-- Sorts users by 'salary' in descending order.
-- Skips the top 3 highest salaries and retrieves the next 5 rows.

-- ---------------------------
-- Example usage
-- ---------------------------

SELECT * FROM user ORDER BY age ASC

SELECT * FROM user ORDER BY age DESC

SELECT * FROM user ORDER BY name ASC

SELECT * FROM user ORDER BY name DESC

SELECT * FROM user LIMIT 5

SELECT * FROM user LIMIT 10 OFFSET 5

SELECT * FROM user ORDER BY age DESC LIMIT 3

SELECT * FROM user ORDER BY age DESC LIMIT 5 OFFSET 10 