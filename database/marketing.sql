-- MARKETING AND CUSTOMER ACQUISITION --

-- Create Client Table
CREATE TABLE IF NOT EXISTS Client (
    Client_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Client_CompanyName VARCHAR(30) NOT NULL,
    Client_RepFirstName VARCHAR(30) NOT NULL,
    Client_RepLastName VARCHAR(30) NOT NULL,
    Client_RepContactNum VARCHAR(50) NOT NULL,
    Client_SecRepFirstName VARCHAR(30),
    Client_SecRepLastName VARCHAR(30),
    Client_SecRepContactNum VARCHAR(50),
    Client_Address VARCHAR(30) NOT NULL,
    Client_Email VARCHAR(30) NOT NULL,
    Client_TelNo VARCHAR(50) NOT NULL
);

-- Create Contract Table
CREATE TABLE IF NOT EXISTS Contract (
    Contract_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Contract_LegalPerson VARCHAR(30) NOT NULL,
    Contract_SignedDate DATETIME NOT NULL,
    Contract_StartDate DATETIME NOT NULL,
    Contract_EstimatedEndDate DATETIME NOT NULL,
    Contract_ActualEndDate DATETIME,
    Contract_ProjectDurationYears DECIMAL(3,2) NOT NULL,
    Contract_MaintenanceYears INT(20) NOT NULL,
    Contract_Status ENUM("Ongoing", "Finished", "Terminated") NOT NULL,
    Contract_FileLink VARCHAR(255) NOT NULL,
    Project_ID INT NOT NULL,
    Signatory_ClientID INT NOT NULL,
    Signatory_EmployeeID INT NOT NULL,
    Transaction_ID INT NOT NULL,
    FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID),
    FOREIGN KEY (Signatory_ClientID) REFERENCES Client(Client_ID),
    FOREIGN KEY (Signatory_EmployeeID) REFERENCES Employee(Employee_ID),
    FOREIGN KEY (Transaction_ID) REFERENCES Contract_Transaction(CT_ID)
);


-- Insert 10 rows into Client Table
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

-- Insert 5 rows into Contract Table
INSERT INTO Contract (Contract_ID, Project_ID, Signatory_ClientID, Signatory_EmployeeID, Transaction_ID, Contract_LegalPerson, Contract_SignedDate, Contract_StartDate, Contract_EstimatedEndDate, Contract_ActualEndDate, Contract_ProjectDurationYears, Contract_MaintenanceYears, Contract_Status, Contract_FileLink)
VALUES
(4000, 1, 5892, 20160076, 2000, 'Atty. Leni Hillario', '2018-09-18 14:42:00', '2018-10-31 08:15:00', '2020-10-31 23:10:00', '2020-11-30 15:55:00', 2.00, 3, 'finished', 'http://tinyurl.com/ID4000-Contract'),
(4001, 2, 7310, 20160076, 2001, 'Atty. Chel Diaz', '2018-09-01 03:30:00', '2018-11-28 14:42:00', '2019-11-28 06:45:00', '2019-12-28 09:00:00', 1.00, 4, 'finished', 'http://tinyurl.com/ID4001-Contract'),
(4002, 3, 2468, 20160076, 2002, 'Atty. Albee Reyes', '2018-09-04 20:18:00', '2018-10-31 08:15:00', '2019-10-31 09:00:00', '2019-11-3 15:55:00', 1.00, 5, 'finished', 'http://tinyurl.com/ID4002-Contract'),
(4003, 4, 9035, 20160076, 2003, 'Atty. Maki Bao', '2018-09-02 08:15:00', '2018-10-30 14:42:00', '2021-10-30 15:55:00', '2021-11-30 06:45:00', 3.00, 3, 'finished', 'http://tinyurl.com/ID4003-Contract'),
(4004, 5, 1179, 20160076, 2004, 'Atty. Carlos Alejandre', '2018-09-05 14:42:00', '2018-11-30 03:30:00', '2020-11-30 06:45:00', '2020-12-30 23:10:00', 2.00, 4, 'finished', 'http://tinyurl.com/ID4004-Contract');
