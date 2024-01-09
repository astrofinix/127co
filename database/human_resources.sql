
CREATE TABLE IF NOT EXISTS Employee (
  Employee_ID INT NOT NULL UNIQUE,
  Employee_Name VARCHAR(50) NOT NULL,
  Employee_Position VARCHAR(50) NOT NULL,
  Employee_Salary INT NOT NULL,
  Employee_Email VARCHAR(50) NOT NULL,
  Employee_Password VARCHAR(50) NOT NULL,
  Employee_ReportsTo INT,
  PRIMARY KEY (Employee_ID),
  FOREIGN KEY (Employee_ReportsTo) REFERENCES Employee(Employee_ID)
);

INSERT INTO Employee VALUES
  (1000, 'John Doe',       'CEO',                           80000, '1000@xyz.com', 'password', NULL),
  (1100, 'Mark Ventura',   'Project Manager',               50000, '1100@xyz.com', 'password', 1000),
  (1101, 'Juan Dela Cruz', 'Application Developer',         25000, '1101@xyz.com', 'password', 1100),
  (1102, 'Pedro Penduko',  'Application Developer',         25000, '1102@xyz.com', 'password', 1100),
  (1103, 'Maria Makiling', 'Application Developer',         25000, '1103@xyz.com', 'password', 1100),
  (1200, 'Maria Clara',    'Administrative Officer',        20000, '1200@xyz.com', 'password', 1000),
  (1201, 'Juan Tamad',     'Utility and Maintenance staff', 20000, '1201@xyz.com', 'password', 1200);

