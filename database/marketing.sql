-- MARKETING AND CUSTOMER ACQUISITION --

-- Create Client Table
CREATE TABLE IF NOT EXISTS Client (
    Client_ID INT(20) PRIMARY KEY,
    Client_CompanyName VARCHAR(30),
    Client_RepFirstName VARCHAR(30),
    Client_RepLastName VARCHAR(30),
    Client_RepContactNum VARCHAR(50),
    Client_SecRepFirstName VARCHAR(30),
    Client_SecRepLastName VARCHAR(30),
    Client_SecRepContactNum VARCHAR(50),
    Client_Address VARCHAR(30),
    Client_Email VARCHAR(30),
    Client_TelNo VARCHAR(50)
);

-- Create Contract Table
CREATE TABLE IF NOT EXISTS Contract (
    Contract_ID INT(20) PRIMARY KEY,
    Contract_LegalPerson VARCHAR(30),
    Contract_SignedDate DATE,
    Contract_StartDate DATE,
    Contract_EstimatedEndDate DATE,
    Contract_ActualEndDate DATE,
    Contract_ProjectDurationYears DECIMAL(3,2),
    Contract_MaintenanceYears INT(20),
    Contract_Status CHAR(20),
    Contract_FileLink VARCHAR(255),
    Project_ID INT(20),
    Signatory_ClientID INT(20),
    Signatory_EmployeeID INT(20),
    Transaction_ID INT(20),
    FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID),
    FOREIGN KEY (Signatory_ClientID) REFERENCES Client(Client_ID),
    FOREIGN KEY (Signatory_EmployeeID) REFERENCES Employee(Employee_ID),
    FOREIGN KEY (Transaction_ID) REFERENCES Contract_Transaction(CT_ID)
);

-- Insert 10 rows into  Client Table
INSERT INTO Client (Client_ID, Client_CompanyName, Client_RepFirstName, Client_RepLastName, Client_RepContactNum, Client_SecRepFirstName, Client_SecRepLastName, Client_SecRepContactNum, Client_Address, Client_Email, Client_TelNo)
VALUES
(5892, 'Alpha Corporation', 'Eleanor', 'Scott', '+63 912 345-6789', 'Henry', 'Adams', '+63 923 456-7890', '123 Main St', 'alpha@alphacorp.com', '221-1234'),
(7310, 'Beta Enterprises', 'Sophie', 'Bennett', '+63 945 678-9012', 'William', 'Evans', '+63 909 876-5432', '456 Elm St', 'beta@betaenterprises.com', '221-9876'),
(2468, 'Gamma Ltd.', 'Grace', 'Carter', '+63 912 345-6789', 'Oliver', 'Gonzalez', '+63 923 456-7891', '789 Oak St', 'gamma@gammaltd.com', '221-7890'),
(9035, 'Delta Inc.', 'Natalie', 'Rodriguez', '+63 945 678-9012', 'Lucas', 'Gray', '+63 909 876-5433', '101 Pine St', 'delta@delta-inc.com', '221-4567'),
(1179, 'Epsilon Solutions', 'Victoria', 'Collins', '+63 912 345-6789', 'Alexander', 'Jenkins', '+63 923 456-7892', '202 Cedar St', 'epsilon@epsilon.com', '221-2345'),
(6542, 'Zeta Group', 'Samantha', 'Barnes', '+63 945 678-9012', 'Benjamin', 'Cooper', '+63 909 876-5434', '303 Walnut St', 'zeta@zeta.com', '221-8765'),
(8791, 'Eta Enterprises', 'David', 'Murphy', '+63 912 345-6789', 'Emma', 'Richardson', '+63 923 456-7893', '404 Maple St', 'eta@etaenterprises.com', '221-3214'),
(3320, 'Theta Solutions', 'Daniel', 'Gomez', '+63 945 678-9012', 'Eva', 'Simmons', '+63 909 876-5435', '505 Birch St', 'theta@theta-solutions.com', '221-6547'),
(4685, 'Iota Innovations', 'Matthew', 'Price', '+63 912 345-6789', 'Isabelle', 'Phillips', '+63 923 456-7894', '606 Oak St', 'iota@iota-innov.com', '221-9876'),
(1256, 'Kappa Technologies', 'Olivia', 'Taylor', '+63 945 678-9012', 'Noah', 'Parker', '+63 909 876-5436', '707 Elm St', 'kappa@kappa-tech.com', '221-8765'),
(7890, 'Monet Hotel', 'Maria', 'Santos', '+63 915 367-9219', 'Juan', 'Dela Cruz', '+63 998 765-4321', '789 Mahogany St', 'monet@mhotel.com', '221-8778');

-- Insert 10 rows into Item Table
INSERT INTO Contract (Contract_ID, Project_ID, Signatory_ClientID, Signatory_CompanyID, Transaction_ID, Contract_LegalPerson, Contract_SignedDate, Contract_StartDate, Contract_EstimatedEndDate, Contract_ActualEndDate, Contract_ProjectDurationYears, Contract_MaintenanceYears, Contract_Status, Contract_FileLink)
VALUES
(4000, 1, 5892, 20160076, 2000, 'Atty. Leni Hillario', '2018-09-18', '2018-10-31', '2020-10-31', '2020-11-31', 2.00, 3, 'finished', 'http://tinyurl.com/ID4000-Contract'),
(4001, 2, 7310, 20160076, 2001, 'Atty. Chel Diaz', '2018-09-01', '2018-11-28', '2019-11-28', '2019-12-28', 1.00, 4, 'finished', 'http://tinyurl.com/ID4001-Contract'),
(4002, 3, 2468, 20160076, 2002, 'Atty. Albee Reyes', '2018-09-04', '2018-10-31', '2019-10-31', '2019-11-31', 1.00, 5, 'finished', 'http://tinyurl.com/ID4002-Contract'),
(4003, 4, 9035, 20160076, 2003, 'Atty. Maki Bao', '2018-09-02', '2018-10-30', '2021-10-30', '2021-11-30', 3.00, 3, 'finished', 'http://tinyurl.com/ID4003-Contract'),
(4004, 5, 1179, 20160076, 2004, 'Atty. Carlos Alejandre', '2018-09-05', '2018-11-30', '2020-11-30', '2020-12-30', 2.00, 4, 'finished', 'http://tinyurl.com/ID4004-Contract'),
(4005, 6, 6542, 20160076, 2005, 'Atty. Belinda Ramos', '2019-03-21', '2019-04-21', '2021-04-21', null, 2.00, 5, 'ongoing', 'http://tinyurl.com/ID4005-Contract'),
(4006, 7, 8791, 20160076, 2006, 'Atty. Cecelia Lomeda', '2019-03-25', '2019-04-25', '2022-04-25', null, 3.00, 3, 'ongoing', 'http://tinyurl.com/ID4006-Contract'),
(4007, 8, 3320, 20160076, 2007, 'Atty. Denise Baruelo', '2019-04-23', '2019-05-23', '2023-05-23', null, 4.00, 4, 'ongoing', 'http://tinyurl.com/ID4007-Contract'),
(4008, 9, 4685, 20160076, 2008, 'Atty. Steve Reyes', '2019-04-13', '2019-05-13', '2022-05-13', null, 3.00, 5, 'ongoing', 'http://tinyurl.com/ID4008-Contract'),
(4009, 10, 1256, 20160076, 2009, 'Atty. Ricky Dawes', '2019-05-30', '2019-06-30', '2022-06-30', null, 3.00, 3, 'terminated', 'http://tinyurl.com/ID4009-Contract'),
(4010, 11, 7890, 20160076, 2010, 'Atty. Carlos Alejandre', '2020-01-30', '2020-02-25', '2023-02-25', null, 3.00, 4, 'ongoing', 'http://tinyurl.com/ID4010-Contract');



