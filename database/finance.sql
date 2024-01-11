-- FINANCE --

CREATE TABLE IF NOT EXISTS Salary (
    Salary_Id INT PRIMARY KEY NOT NULL,
    Employee_Id INT,
    Salary_Date DATE,
    Salary_Net DECIMAL(10, 2),
    Salary_Gross DECIMAL(10, 2),
    Salary_Added DECIMAL(10, 2),
    Salary_Deducted DECIMAL(10, 2),
    FOREIGN KEY (Employee_Id) REFERENCES Employee(Employee_Id) ON UPDATE CASCADE ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS Budget (
    Budget_Id INT PRIMARY KEY NOT NULL,
    Budget_Name VARCHAR(255), 
    Budget_Category VARCHAR(255),
    Budget_Amount DECIMAL(10, 2),
    Item_Id INT,
    Project_Id INT,
    FOREIGN KEY (Item_Id) REFERENCES Item(Item_Id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Project_Id) REFERENCES Project(Project_Id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Contract_Transaction (
    CT_Id INT PRIMARY KEY NOT NULL,
    CT_Date DATE,
    CT_Total_Amount DECIMAL(10, 2),
    CT_Payment DECIMAL(10, 2),       
    CT_Balance DECIMAL(10, 2),       
    CT_Total_Paid DECIMAL(10, 2) DEFAULT 0.00,      
    CT_Payment_Type VARCHAR(255),       
    Project_Id INT,
    FOREIGN KEY (Project_Id) REFERENCES Project(Project_Id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Expenditure (
    Expense_Id INT PRIMARY KEY NOT NULL,
    Expense_Name VARCHAR(255), 
    Expense_Date DATE,
    Expense_Amount DECIMAL(10, 2),
    CT_Id INT,
    Expense_Project_Status varchar(255),
    Salary_Id INT,
    FOREIGN KEY (CT_Id) REFERENCES Contract_Transaction(CT_Id) ON UPDATE CASCADE,
    FOREIGN KEY (Salary_Id) REFERENCES Salary(Salary_Id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Profit (
    Profit_Id INT PRIMARY KEY NOT NULL,
    Profit_Date DATE,
    Profit_Gross DECIMAL(10, 2),
    Profit_Expense_Amount DECIMAL(10, 2),
    Profit_CT_Payment DECIMAL(10, 2), 
    Profit_Net DECIMAL(10, 2)
);


INSERT INTO Salary (Salary_Id, Employee_Id, Salary_Date, Salary_Net, Salary_Gross, Salary_Added, Salary_Deducted) VALUES
(20231101, 20160001, '2023-11-08', 183427,  152234, 32435, 1232),
(20231102, 20170004, '2023-11-08', 155575,  82445,  76543, 3413),
(20231103, 20180006, '2023-11-08', 93408,   73434,  23431, 3457),
(20231104, 20170056, '2023-11-08', 75049,   48123,  34579, 7653),
(20231105, 20180025, '2023-11-08', 79203,   37235,  45632, 3664),
(20231106, 20190013, '2023-11-08', 133236,  63346,  78653, 8763),
(20231107, 20190014, '2023-11-08', 137430,  51237,  89765, 3572),
(20231108, 20230007, '2023-11-08', 83381,   45345,  45672, 7636),
(20231109, 20230012, '2023-11-08', 76581,   45345,  36578, 5342),
(20231110, 20220001, '2023-11-08', 76325,   45345,  32556, 1576);

INSERT INTO Budget (Budget_Id, Budget_Name, Budget_Category, Budget_Amount, Item_Id, Project_Id) VALUES 
(1111, 'Laptop',    'Item',     100000, 101,    NULL),
(1112, 'Dos',       'Project',  500000, NULL,   2),
(1113, 'Printer',   'Item',     20000,  103,    NULL),
(1114, 'Tablet',    'Item',     80000,  104,    NULL),
(1115, 'Projector', 'Item',     50000,  105,    NULL),
(1116, 'Hydra',     'Project',	600000,	NULL,   6),
(1117, 'Keyboard',  'Item',	    10000,	107,    NULL),
(1118, 'Aqua',	    'Project',	300000,	NULL,   8),
(1119, 'Medicord',  'Project',	200000,	NULL,   9),
(1120, 'Traveler',  'Project',	600000,	NULL,   10);


INSERT INTO Contract_Transaction (CT_Id, CT_Date, CT_Total_Amount, CT_Payment, CT_Balance, CT_Total_Paid, CT_Payment_Type, Project_Id) VALUES 
(20001, '2020-11-30', 300000, 50000,    0,	    250000, 'Bank Transfer (CitiBank)',     1),
(20002, '2019-12-28', 500000, 150000,   0,	    350000, 'Bank Transfer (BDO)', 		    2),
(20003, '2019-11-30', 870000, 90000,    0,	    780000, 'Bank Transfer (BPI)',  	    3),
(20004, '2021-11-30', 620000, 100000,   0, 	    520000, 'Bank Transfer (MetroBank)',    4),
(20005, '2020-12-30', 390000, 90000,    0, 	    300000, 'Bank Transfer (CitiBank)', 	5),
(20006,	'2021-03-14', 700000, 100000,  	50000,	550000,	'Bank Transfer (CitiBank)',	    6),
(20007,	'2022-03-25', 400000, 90000,	100000,	210000,	'Bank Transfer (CitiBank)',	    7),
(20008,	'2023-04-20', 650000, 40000,	50000,	560000,	'Bank Transfer (CitiBank)',	    8),
(20009,	'2022-02-08', 530000, 100000,	190000,	240000,	'Bank Transfer (CitiBank)',	    9),
(20010,	'2022-06-30', 0,      0,	    0,	    0,	    'Bank Transfer (CitiBank)',	    10);


INSERT INTO Expenditure (Expense_Id, Expense_Name, Expense_Date, Expense_Amount, CT_Id, Expense_Project_Status, Salary_Id) VALUES 
(33101, 'Employee Salary',  '2023-11-08', 183427,   NULL,   NULL,               20231101),
(33102, 'Employee Salary',  '2023-11-08', 155575,   NULL,   NULL,               20231102),
(33103, 'Project',          '2020-11-30', 130000,   20001,      'Mid-Development',  NULL),
(33104, 'Employee Salary',  '2023-11-08', 75049,    NULL,   NULL,               20231104),
(33105, 'Project',          '2019-12-28', 12365,    20002,      'Completed',        NULL),
(33106,	'Employee Salary',  '2023-11-08', 133236,   NULL,   NULL, 		        20231106),
(33107,	'Project',	        '2019-11-30', 543133,   20003,      'On-Hold', 		    NULL),
(33108,	'Employee Salary',  '2023-11-08', 83381,    NULL,   NULL,  		        20231108),
(33109,	'Employee Salary',  '2023-11-08', 76581,    NULL,   NULL, 		        20231109),
(33110,	'Project',	        '2021-11-30', 23645,    20004,      'In Progress', 	    NULL);

INSERT INTO Profit (Profit_Id, Profit_Date, Profit_Gross, Profit_Expense_Amount, Profit_CT_Payment, Profit_Net) VALUES 
(111,	'2023-11-08',	1202392,	23142,		100000,		1279250),
(112, 	'2023-11-09',	1279250,	345465,		155000,		1088785),
(113,	'2023-11-10',	1088785,	43567,		400000,		1445218),
(114,	'2023-11-11',	1445218,	55679,		90000,		1479539),
(115,	'2023-11-12',	1479539,	84530,		50000,		1445009),
(116,	'2023-11-13',	1445009,	34827,		75000,		1485182),
(117,	'2023-11-14',	1485182, 	34556,		50000,		1500626),
(118,	'2023-11-15',	1500626,	32424,		200500,		1668702),
(119,	'2023-11-16',	1668702,	143856,		300000,		1824846),
(120,	'2023-11-17',	1824846,	435576,		500000,		1889270);