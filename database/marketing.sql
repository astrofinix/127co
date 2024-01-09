USE CS127;

-- MARKETING AND CUSTOMER ACQUISITION --

CREATE TABLE IF NOT EXISTS Client (
    Client_ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    Client_CompanyName VARCHAR(50) NOT NULL,
    Client_CompanyRep VARCHAR(50) NOT NULL,
    Client_Address VARCHAR(50) NOT NULL,
    Client_Contact VARCHAR(50) NOT NULL,
    Client_Email VARCHAR(50) NOT NULL,
    Client_Password VARCHAR(50) NOT NULL,
    PRIMARY KEY (Client_ID)
);

CREATE TABLE IF NOT EXISTS Contract (
    Contract_ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    Contract_DevelopmentDuration INT NOT NULL,
    Contract_MaintenanceYears INT NOT NULL,
    Contract_FullyPaid BOOLEAN NOT NULL,
    Contract_Client_ID INT NOT NULL,
    PRIMARY KEY (Contract_ID),
    FOREIGN KEY (Contract_Client_ID) REFERENCES Client(Client_ID)
);

INSERT INTO Client (Client_CompanyName, Client_CompanyRep, Client_Address, Client_Contact, Client_Email, Client_Password) VALUES
('Google', 'Larry Page', '1600 Amphitheatre Parkway, Mountain View, CA 94043', '6502530000', 'larrypage@gmail.com', 'password'), 
('Apple', 'Tim Cook', '1 Infinite Loop, Cupertino, CA 95014', '4089961010', 'timcook@apple.com', 'password'),
('Microsoft', 'Satya Nadella', 'One Microsoft Way, Redmond, WA 98052', '4258828080', 'satyanadella@microsoft.com', 'password'),
('Facebook', 'Mark Zuckerberg', '1 Hacker Way, Menlo Park, CA 94025', '6505434800', 'markzuckerber@facebook.com', 'password'),
('Amazon', 'Jeff Bezos', '410 Terry Ave. North, Seattle, WA 98109-5210', '2062661000', 'jeffbezos@amazon.com', 'password');

INSERT INTO Contract (Contract_DevelopmentDuration, Contract_MaintenanceYears, Contract_FullyPaid, Contract_Client_ID) VALUES
(30, 5, 0, 1), 
(60, 10, 0, 2), 
(90, 15, 0, 3), 
(120, 20, 0, 4), 
(150, 25, 0, 5);

