-- 1. Create a new database
CREATE DATABASE CompanyDB;
USE CompanyDB;

-- 2. Create Employees table
CREATE TABLE Employees (
    EmpID INT PRIMARY KEY,
    Name VARCHAR(50),
    Age INT,
    Department VARCHAR(50),
    Salary DECIMAL(10,2)
);

-- 3. Insert mock data
INSERT INTO Employees (EmpID, Name, Age, Department, Salary) VALUES 
(1, 'Alice', 30, 'HR', 60000),
(2, 'Bob', 28, 'IT', 70000),
(3, 'Charlie', 35, 'Finance', 75000);

-- 4. Display the table after insertion
SELECT * FROM Employees;

-- 5. Alter table: Add a new column
ALTER TABLE Employees ADD COLUMN Experience INT DEFAULT 0;

-- 6. Update Experience data
UPDATE Employees SET Experience = 5 WHERE EmpID = 1;
UPDATE Employees SET Experience = 3 WHERE EmpID = 2;
UPDATE Employees SET Experience = 7 WHERE EmpID = 3;

-- 7. Display table after ALTER
SELECT * FROM Employees;

-- 8. Truncate the table (removes all data but keeps structure)
TRUNCATE TABLE Employees;

-- 9. Drop the table
DROP TABLE Employees;

-- 10. Drop the database
DROP DATABASE CompanyDB;
