-- Creating a sample database
CREATE DATABASE CompanyDB;
USE CompanyDB;

-- Creating Employees table
CREATE TABLE Employees (
    EmpID INT PRIMARY KEY,
    Name VARCHAR(50),
    Age INT,
    DepartmentID INT,
    Salary DECIMAL(10,2)
);

-- Creating Departments table
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(50)
);

-- Inserting sample data into Employees
INSERT INTO Employees (EmpID, Name, Age, DepartmentID, Salary) VALUES 
(1, 'Alice', 30, 1, 60000),
(2, 'Bob', 28, 2, 70000),
(3, 'Charlie', 35, 3, 75000),
(4, 'David', 40, 1, 80000),
(5, 'Emma', 26, 2, 50000);

-- Inserting sample data into Departments
INSERT INTO Departments (DepartmentID, DepartmentName) VALUES 
(1, 'HR'),
(2, 'IT'),
(3, 'Finance');

-- 1. Basic Queries
SELECT * FROM Employees;
SELECT Name, Salary FROM Employees;

-- 2. Filtering Data
SELECT * FROM Employees WHERE DepartmentID = 2;
SELECT * FROM Employees WHERE Name LIKE 'A%';

-- 3. Sorting and Limiting Results
SELECT * FROM Employees ORDER BY Salary DESC;
SELECT * FROM Employees ORDER BY Age ASC LIMIT 3;

-- 4. Aggregate Queries
SELECT COUNT(*) AS EmployeeCount FROM Employees;
SELECT AVG(Salary) AS AvgSalary FROM Employees WHERE DepartmentID = 1;

-- 5. Grouping and Aggregation
SELECT DepartmentID, COUNT(*) AS EmployeeCount FROM Employees GROUP BY DepartmentID;
SELECT DepartmentID, COUNT(*) AS EmployeeCount FROM Employees GROUP BY DepartmentID HAVING COUNT(*) > 1;

-- 6. Nested Queries (Subqueries)
SELECT * FROM Employees WHERE Salary > (SELECT AVG(Salary) FROM Employees);
SELECT Name, (SELECT MAX(Salary) FROM Employees) AS MaxSalary FROM Employees;

-- 7. Joins (Combining Tables)
SELECT Employees.Name, Departments.DepartmentName  
FROM Employees  
INNER JOIN Departments ON Employees.DepartmentID = Departments.DepartmentID;

SELECT Employees.Name, Departments.DepartmentName  
FROM Employees  
LEFT JOIN Departments ON Employees.DepartmentID = Departments.DepartmentID;

-- 8. Complex Queries
SELECT Name FROM Employees WHERE EXISTS (SELECT 1 FROM Departments WHERE Employees.DepartmentID = Departments.DepartmentID);

SELECT Name,  
       CASE  
           WHEN Salary > 80000 THEN 'High'  
           WHEN Salary BETWEEN 50000 AND 80000 THEN 'Medium'  
           ELSE 'Low'  
       END AS SalaryCategory  
FROM Employees;
