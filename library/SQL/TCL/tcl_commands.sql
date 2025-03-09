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

-- Insert Data (Starting a Transaction)
START TRANSACTION;

INSERT INTO Employees (EmpID, Name, Age, Department, Salary) VALUES 
(1, 'Alice', 30, 'HR', 60000),
(2, 'Bob', 28, 'IT', 70000),
(3, 'Charlie', 35, 'Finance', 75000);

-- Commit the Transaction
COMMIT;

-- View Data After Commit
SELECT * FROM Employees;

-- Start Another Transaction
START TRANSACTION;

-- Update Data
UPDATE Employees SET Salary = 80000 WHERE EmpID = 3;

-- Rollback the Transaction (Undo Changes)
ROLLBACK;

-- View Data After Rollback
SELECT * FROM Employees;

-- Start a New Transaction
START TRANSACTION;

-- Delete a Record
DELETE FROM Employees WHERE EmpID = 2;

-- Save the Current State
SAVEPOINT BeforeDeletion;

-- Delete Another Record
DELETE FROM Employees WHERE EmpID = 1;

-- Rollback to Savepoint (Undo Last Deletion)
ROLLBACK TO BeforeDeletion;

-- Commit the Final State
COMMIT;

-- View Final Data
SELECT * FROM Employees;
