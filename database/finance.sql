-- FINANCE --

CREATE TABLE IF NOT EXISTS Salary (
    salary_id INT PRIMARY KEY NOT NULL,
    employee_id INT,
    salary_date DATE,
    salary_net DECIMAL(10, 2),
    salary_gross DECIMAL(10, 2),
    salary_added DECIMAL(10, 2),
    salary_deducted DECIMAL(10, 2),
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);
CREATE TABLE IF NOT EXISTS Budget (
    budget_id INT PRIMARY KEY NOT NULL,
    budget_name VARCHAR(255), 
    budget_category VARCHAR(255),
    budget_amount DECIMAL(10, 2),
    item_id INT,
    FOREIGN KEY (item_id) REFERENCES Item(item_id)
);
CREATE TABLE IF NOT EXISTS Expenditure (
    expense_id INT PRIMARY KEY NOT NULL,
    expense_name VARCHAR(255), 
    expense_date DATE,
    expense_amount DECIMAL(10, 2),
    contract_id INT,
    expense_project_status varchar(255),
    salary_id INT,
    FOREIGN KEY (contract_id) REFERENCES contract(contract_id),
    FOREIGN KEY (salary_id) REFERENCES salary(salary_id)
);
CREATE TABLE IF NOT EXISTS Contract_Transaction (
    ct_id INT PRIMARY KEY NOT NULL,
    ct_date DATE,
    ct_total_amount DECIMAL(10, 2),
    ct_payment DECIMAL(10, 2),       
    ct_balance DECIMAL(10, 2),       
    ct_total_paid DECIMAL(10, 2) DEFAULT 0.00,      
    ct_payment_type VARCHAR(255),       
    contract_id INT,
    FOREIGN KEY (contract_id) REFERENCES Contract(contract_id)
);

INSERT INTO Salary VALUES
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

INSERT INTO Budget VALUES 
(1111, 'Laptop',    'Item',     100000, 101),
(1112, 'Dos',       'Project',  500000, NULL),
(1113, 'Printer',   'Item',     20000,  103),
(1114, 'Tablet',    'Item',     80000,  104),
(1115, 'Projector', 'Item',     50000,  105),
(1116, 'Hydra',     'Project',	600000,	NULL),
(1117, 'Keyboard',  'Item',	    10000,	107),
(1118, 'Aqua',	    'Project',	300000,	NULL),
(1119, 'Medicord',  'Project',	200000,	NULL),
(1120, 'Traveler',  'Project',	600000,	NULL);

INSERT INTO Expenditure VALUES 
(33101, 'Employee Salary',  '2023-11-08', 183427,   NULL,   NULL,               20231101),
(33102, 'Employee Salary',  '2023-11-08', 155575,   NULL,   NULL,               20231102),
(33103, 'Project',          '2020-11-30', 130000,   1,      'Mid-Development',  NULL),
(33104, 'Employee Salary',  '2023-11-08', 75049,    NULL,   NULL,               20231104),
(33105, 'Project',          '2019-12-28', 12365,    2,      'Completed',        NULL),
(33106,	'Employee Salary',  '2023-11-08', 133236,   NULL,   NULL, 		20231106),
(33107,	'Project',	    '2019-11-30', 543133,   3,  'On-Hold', 		NULL),
(33108,	'Employee Salary',  '2023-11-08', 83381,    NULL,   NULL,  		20231108),
(33109,	'Employee Salary',  '2023-11-08', 76581,    NULL,   NULL, 		20231109),
(33110,	'Project',	    '2021-11-30', 23645,    4,  'In Progress', 	NULL);

INSERT INTO Contract_Transaction VALUES 
(20001, '2020-11-30', 300000, 50000,    0,	250000, 'Bank Transfer (CitiBank)', 	1),
(20002, '2019-12-28', 500000, 150000,   0,	350000, 'Bank Transfer (BDO)', 		2),
(20003, '2019-11-30', 870000, 90000,    0,	780000, 'Bank Transfer (BPI)',  	3),
(20004, '2021-11-30', 620000, 100000,   0, 	520000, 'Bank Transfer (MetroBank)',    4),
(20005, '2020-12-30', 390000, 90000,    0, 	300000, 'Bank Transfer (CitiBank)', 	5);