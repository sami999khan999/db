-- ---------------------------
-- GROUP BY Clause
-- ---------------------------

-- The GROUP BY clause is used to group rows based on one or more columns.
-- Aggregate functions like COUNT, SUM, AVG, etc., can then be applied to each group.

-- Example 1: Count the number of users in each city.
SELECT city, COUNT(*) AS user_count
FROM users
GROUP BY city;
-- Groups rows by the 'city' column and counts the number of rows in each group.
-- The result includes each city and the count of users in that city.

-- Example 2: Calculate the total salary for each department.
SELECT department, SUM(salary) AS total_salary
FROM users
GROUP BY department;
-- Groups rows by the 'department' column and calculates the total salary for each department.

-- ---------------------------
-- HAVING Clause
-- ---------------------------

-- The HAVING clause is used to filter groups based on aggregate functions.
-- It works on grouped data, unlike WHERE, which filters individual rows.

-- Example 1: Find cities with more than 5 users.
SELECT city, COUNT(*) AS user_count
FROM users
GROUP BY city
HAVING COUNT(*) > 5;
-- Groups rows by 'city', counts the number of users, and filters groups where the count is greater than 5.

-- Example 2: Find departments where the total salary exceeds 100,000.
SELECT department, SUM(salary) AS total_salary
FROM users
GROUP BY department
HAVING SUM(salary) > 100000;
-- Groups rows by 'department', calculates the total salary for each department, 
-- and filters groups where the total salary is greater than 100,000.

-- ---------------------------
-- Combining GROUP BY with ORDER BY
-- ---------------------------

-- The ORDER BY clause sorts grouped data based on an aggregate function or other columns.

-- Example: List departments by total salary in descending order.
SELECT department, SUM(salary) AS total_salary
FROM users
GROUP BY department
ORDER BY total_salary DESC;
-- Groups rows by 'department', calculates the total salary, 
-- and sorts the results in descending order of 'total_salary'.

-- ---------------------------
-- WHERE vs. HAVING
-- ---------------------------

-- WHERE filters individual rows before grouping.
-- HAVING filters groups after aggregation.

-- Example:
-- Find departments with more than 5 employees and a total salary exceeding 50,000.
SELECT department, COUNT(*) AS employee_count, SUM(salary) AS total_salary
FROM users
WHERE age > 25 -- Filters rows where 'age' is greater than 25 before grouping.
GROUP BY department
HAVING COUNT(*) > 5 AND SUM(salary) > 50000;
-- After grouping by 'department', filters groups where:
-- 1. The number of employees is greater than 5.
-- 2. The total salary is greater than 50,000.

-- ---------------------------
-- Advanced Examples
-- ---------------------------

-- Example 1: Grouping by multiple columns.
-- Calculate the total salary by both department and city.
SELECT department, city, SUM(salary) AS total_salary
FROM users
GROUP BY department, city;
-- Groups rows by both 'department' and 'city' and calculates the total salary for each combination.

-- Example 2: Grouped data with sorting and limits.
-- Get the top 3 cities with the highest total salary.
SELECT city, SUM(salary) AS total_salary
FROM users
GROUP BY city
ORDER BY total_salary DESC
LIMIT 3;
-- Groups rows by 'city', calculates the total salary for each city, 
-- sorts the results in descending order of 'total_salary',
-- and returns the top 3 cities.

-- ---------------------------
-- Example usage
-- ---------------------------

-- SELECT COUNT(*) AS name_count, name FROM user GROUP BY name   