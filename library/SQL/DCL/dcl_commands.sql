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

-- Create User
CREATE USER 'john'@'localhost' IDENTIFIED BY 'password123';

-- Grant Privileges to User
GRANT SELECT, INSERT ON CompanyDB.Employees TO 'john'@'localhost';

-- Verify Privileges
SHOW GRANTS FOR 'john'@'localhost';

-- Revoke Privileges from User
REVOKE INSERT ON CompanyDB.Employees FROM 'john'@'localhost';

-- Check Updated Privileges
SHOW GRANTS FOR 'john'@'localhost';
