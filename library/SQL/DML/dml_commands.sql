-- Create Database
CREATE DATABASE CompanyDB;
USE CompanyDB;

-- Create Table
CREATE TABLE Employees (
    EmpID INT PRIMARY KEY,
    Name VARCHAR(50),
    Age INT,
    Department VARCHAR(50),
    Salary DECIMAL(10,2)
);

-- Insert Data into Table
INSERT INTO Employees (EmpID, Name, Age, Department, Salary) VALUES 
(1, 'Alice', 30, 'HR', 60000),
(2, 'Bob', 28, 'IT', 70000),
(3, 'Charlie', 35, 'Finance', 75000);

-- Retrieve Data from Table
SELECT * FROM Employees;

-- Update Existing Records
UPDATE Employees SET Salary = 80000 WHERE EmpID = 3;
UPDATE Employees SET Department = 'Operations' WHERE EmpID = 1;

-- Delete Specific Records
DELETE FROM Employees WHERE EmpID = 2;

-- Final View of Table
SELECT * FROM Employees;
