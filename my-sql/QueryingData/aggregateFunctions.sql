-- ---------------------------
-- COUNT Function
-- ---------------------------

-- The COUNT function is used to count the number of rows that match a condition.

-- Example: Count the total number of users in the table.
SELECT COUNT(*) AS total_users FROM users; 
-- Counts all rows in the 'users' table and labels the result as 'total_users'.

-- Example: Count the number of users with an age greater than 25.
SELECT COUNT(*) AS users_above_25 FROM users
WHERE age > 25; 

-- Counts rows where 'age' is greater than 25 and labels the result as 'users_above_25'.

-- Example: Count the number of distinct cities in the table.
SELECT COUNT(DISTINCT city) AS distinct_cities FROM users; 
-- Counts the unique (distinct) values in the 'city' column and labels the result as 'distinct_cities'.

-- ---------------------------
-- SUM Function
-- ---------------------------

-- The SUM function calculates the total sum of a numeric column.

-- Example: Calculate the total salary of all users.
SELECT SUM(salary) AS total_salary FROM users; 
-- Adds up all values in the 'salary' column and labels the result as 'total_salary'.

-- Example: Calculate the total salary of users living in 'New York'.
SELECT SUM(salary) AS ny_total_salary FROM users
WHERE city = 'New York'; 
-- Adds up the 'salary' values of rows where 'city' is 'New York' and labels the result as 'ny_total_salary'.

-- ---------------------------
-- AVG Function
-- ---------------------------

-- The AVG function computes the average value of a numeric column.

-- Example: Calculate the average age of all users.
SELECT AVG(age) AS average_age FROM users; 
-- Calculates the average of all values in the 'age' column and labels the result as 'average_age'.

-- Example: Calculate the average salary of users in 'Los Angeles'.
SELECT AVG(salary) AS average_salary FROM users
WHERE city = 'Los Angeles'; 
-- Calculates the average of 'salary' values where 'city' is 'Los Angeles' and labels the result as 'average_salary'.

-- ---------------------------
-- MAX Function
-- ---------------------------

-- The MAX function returns the highest value in a column.

-- Example: Find the maximum salary in the table.
SELECT MAX(salary) AS highest_salary FROM users; 
-- Finds the largest value in the 'salary' column and labels the result as 'highest_salary'.

-- Example: Find the oldest user's age.
SELECT MAX(age) AS oldest_age FROM users; 
-- Finds the largest value in the 'age' column and labels the result as 'oldest_age'.

-- ---------------------------
-- MIN Function
-- ---------------------------

-- The MIN function returns the lowest value in a column.

-- Example: Find the minimum salary in the table.
SELECT MIN(salary) AS lowest_salary FROM users; 
-- Finds the smallest value in the 'salary' column and labels the result as 'lowest_salary'.

-- Example: Find the youngest user's age.
SELECT MIN(age) AS youngest_age FROM users; 
-- Finds the smallest value in the 'age' column and labels the result as 'youngest_age'.

-- ---------------------------
-- Example usage
-- ---------------------------

SELECT COUNT(*) AS total_user FROM user

SELECT COUNT(*) AS total_user FROM user WHERE age > 30

SELECT SUM(age) AS total_age FROM user WHERE name LIKE "s%"

SELECT AVG(age) AS avg_age FROM 

SELECT MAX(age) as max_age FROM user

SELECT MIN(age) as max_age FROM user

SELECT COUNT(DISTINCT email) AS distinct_email FROM user

SELECT 
COUNT(*) AS total_user,
MAX(age) AS max_age,
AVG(age) AS average_age  FROM user WHERE age >= 30