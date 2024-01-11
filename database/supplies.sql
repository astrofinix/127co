-- SUPPLIES AND INVENTORY --

CREATE TABLE IF NOT EXISTS Supplier (
    Supplier_Id INT PRIMARY KEY NOT NULL,
    Supplier_Name VARCHAR(255) NOT NULL,
    Supplier_Address VARCHAR(255) NOT NULL,
    Supplier_ContactNumber VARCHAR(15) NOT NULL,
    Supplier_ContactEmail VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Item (
    Item_Id INT PRIMARY KEY NOT NULL,
    Item_Type VARCHAR(50) NOT NULL,
    Item_Location VARCHAR(100) NOT NULL,
    Item_LastUpdated DATETIME NOT NULL,
    Item_Status ENUM("NeedsRepair", 
                     "NeedsUpgrade",
                     "Available",
                     "CurrentlyLoaned", 
                     "CurrentlyInUpgrade", 
                     "CurrentlyInRepair") NOT NULL,

    Supplier_Id INT NOT NULL,
    Loaned_To INT DEFAULT NULL,

    FOREIGN KEY (Supplier_Id) REFERENCES Supplier(Supplier_Id),
    FOREIGN KEY (Loaned_To) REFERENCES Employee(Employee_Id)
);

CREATE TABLE IF NOT EXISTS Item_Transaction (
   Transaction_Id INT PRIMARY KEY NOT NULL,
   Transaction_Type ENUM("Loan", "Upgrade", "Repair", 
                         "ReturnAfterLoan", "ReturnAfterUpgrade", 
                         "ReturnAfterRepair", "ReturnForUpgrade", 
                         "ReturnForRepair") NOT NULL,
   Transaction_Datetime DATETIME NOT NULL,
   Transaction_Maker INT NOT NULL,

   Item_Id INT NOT NULL,

   Supplier_Id INT DEFAULT NULL,

   FOREIGN KEY (Item_Id) REFERENCES Item(Item_Id),
   FOREIGN KEY (Transaction_Maker) REFERENCES Employee(Employee_Id)
);

DELIMITER //
CREATE TRIGGER UpdateItemAvailability
AFTER INSERT ON Item_Transaction
FOR EACH ROW
BEGIN
    DECLARE status VARCHAR(20);
    DECLARE current_status VARCHAR(20);
    DECLARE employee_id INT;

    SET employee_id = NULL;

    SELECT Item_Status INTO current_status FROM Item WHERE Item_Id = NEW.Item_Id;
    
    IF NEW.Transaction_Type = "Loan" THEN

      IF current_status != "Available" THEN
		    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tried to borrow an item which is not available';
      END IF;

      SET employee_id = NEW.Transaction_Maker;
      SET status = "CurrentlyLoaned";
    ELSEIF NEW.Transaction_Type = "Upgrade" THEN

      IF current_status != "NeedsUpgrade" THEN
		    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tried to upgrade an item which does not need an upgrade';
      END IF;

      SET status = "CurrentlyInUpgrade";
    ELSEIF NEW.Transaction_Type = "Repair" THEN

      IF current_status != "NeedsRepair" THEN
		    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tried to repair an item which does not need a repair';
      END IF;

      SET status = "CurrentlyInRepair";
    ELSEIF NEW.Transaction_Type = "ReturnForUpgrade" THEN
      SET status = "NeedsUpgrade";
    ELSEIF NEW.Transaction_Type = "ReturnForRepair" THEN
      SET status = "NeedsRepair";
    ELSEIF 
      NEW.Transaction_Type = "ReturnAfterUpgrade" OR
      NEW.Transaction_Type = "ReturnAfterLoan" OR
      NEW.Transaction_Type = "ReturnAfterRepair"
    THEN
      SET status = "Available";
    END IF;

    UPDATE Item
    SET Item_Status = status, Loaned_To = employee_id
    WHERE Item_Id = NEW.Item_Id;
END //
DELIMITER ;

INSERT INTO Supplier (Supplier_Id, Supplier_Name, Supplier_Address, Supplier_ContactNumber, Supplier_ContactEmail)
VALUES
    (1, 'Super Electronics', '123 Main Stree, CityVille', '+1-555-123-4567', 'main@superelectonics.com'),
    (2, 'Theta Components', '781 Oak Avenue, Townsville', '+1-555-321-0987', 'business@thetacomponents.com'),
    (3, 'Tech Innovations Ltd.', '789 Elm Road, Tech City', '+1-555-432-1098', 'business@techinnovations.net'),
    (4, 'Mega Gadgets Co.', '321 Pine Lane, Gizmotown', '+1-555-765-4321', 'mega.gadgets@outlook.com'),
    (5, 'Omega Devices Inc.', '567 Cedar Street, Innovatown', '+1-555-234-5678', 'omegadevices@gmail.com'),
    (6, 'Precision Parts Ltd.', '890 Birch Bld, Metroville', '+1-555-876-5432', 'precision.parts@precisionparts.net'),
    (7, 'Cyber Systems Corp.', '432 Maple Drive, CyberCity', '+1-555-345-6789', 'cyber.systems@cybersystems.org'),
    (8, 'Alpha Tech Solutions', '876 Cherry Street, Alphaville', '+1-555-678-9012', 'alpha.tech@alphatech.biz'),
    (9, 'Innovate Electronics Inc.', '109 Pineapple Road, Ridge City', '+1-555-210-9876', 'innovate.electronics@innovateinc.co'),
    (10, 'Global Tech Solutions', '210 Tech Street, Smartville', '+1-555-321-0987', 'global.tech@gtech.com'),
    (11, 'TechMetro Solutions', '123 Tech Street, Silicon Valley, CA', '+1-555-123-4567', 'info@techmetrosolutions.com'),
    (12, 'PioneerElectro Inc.', '456 Innovation Avenue, Austin, TX', '+1-555-234-5678', 'info@pioneerelectro.com'),
    (13, 'ALC Repair LLC', '789 Atlantic Boulevard, Miami, FL', '+1-555-345-6789', 'info@alcrepair.com'),
    (14, 'GoldenTech Enterprises', '876 Golden Lane, San Francisco, CA', '+1-555-456-7890', 'info@goldentechenterprises.com'),
    (15, 'EmeraldInnovate Tech', '234 Emerald Street, Seattle, WA', '+1-555-567-8901', 'info@emeraldinnovatetech.com'),
    (16, 'CapitolCircuits Co.', '789 Capitol Avenue, Washington, D.C.', '+1-555-678-9012', 'info@capitolcircuits.com'),
    (17, 'TechSavannah Dynamics', '543 Tech Plaza, Savannah, GA', '+1-555-789-0123', 'info@techsavannahdynamics.com'),
    (18, 'SunriseGadgets Inc.', '876 Sunrise Road, Los Angeles, CA', '+1-555-890-1234', 'info@sunrisegadgetsinc.com'),
    (19, 'RockyMountain Tech', '123 Rocky Lane, Denver, CO', '+1-555-901-2345', 'info@rockymountaintech.com'),
    (20, 'PrecisionPalm Tech', '987 Precision Street, West Palm Beach, FL', '+1-555-012-3456', 'info@precisionpalmtech.com');

INSERT INTO Item (Item_Id, Loaned_To, Item_Type, Item_Status, Item_LastUpdated, Supplier_Id, Item_Location)
VALUES
    (101, NULL, 'Laptop', 'Available', '2023-11-11 13:23:44', 1, 'Storage Room 1'),
    (102, 20170004, 'Stapler', 'CurrentlyLoaned', '2023-11-15 15:55:03', 2, 'HR Dept. Room 2'),
    (103, NULL, 'Printer', 'CurrentlyInRepair', '2023-11-17 09:03:01', 3, 'Null'),
    (104, 20170056, 'Tablet', 'CurrentlyLoaned', '2023-11-17 11:23:24', 4, 'PM Dept. Room 10'),
    (105, 20180025, 'Projector', 'CurrentlyLoaned', '2023-11-19 13:25:56', 5, 'PM Dept. Room 11'),
    (106, NULL, 'Laptop', 'CurrentlyInUpgrade', '2023-11-20 15:23:04', 6, 'Null'),
    (107, 20190014, 'Keyboard', 'CurrentlyLoaned', '2023-12-01 11:02:04', 7, 'HR Dept. Room 3'),
    (108, NULL, 'Keyboard', 'Available', '2023-12-01 13:33:55', 8, 'Storage Room 2'),
    (109, NULL, 'Laptop', 'Available', '2023-12-03 08:05:15', 9, 'Storage Room 3'),
    (110, NULL, 'Laptop', 'Available', '2023-12-04 11:02:59', 10, 'Storage Room 4'),
    (111, 20230008, 'Computer chair', 'CurrentlyLoaned', '2023-12-05 13:23:44', 11, 'Bootcamp Room 9'),
    (112, 20230010, 'Keyboard', 'CurrentlyLoaned', '2023-09-25 12:35:09', 12, 'Bootcamp Room 5'),
    (113, NULL, 'Printer', 'Available', '2023-09-02 18:12:25', 13, 'Null'),
    (114, 20220001, 'Laptop', 'CurrentlyLoaned', '2023-09-12 22:09:11', 14, 'Development Room 2'),
    (115, 20160002, 'Mouse', 'CurrentlyLoaned', '2023-10-01 11:13:55', 15, 'Marketing Office Room 7'),
    (116, NULL, 'Keyboard', 'Available', '2023-10-23 19:00:05', 16, 'Null'),
    (117, 20170007, 'Keyboard', 'CurrentlyLoaned', '2023-11-18 05:41:53', 17, 'Bootcamp Room 3'),
    (118, NULL, 'Computer chair', 'CurrentlyInRepair', '2023-11-29 20:15:34', 18, 'Storage Room 2'),
    (119, 20230009, 'Computer table', 'CurrentlyLoaned', '2023-12-30 14:03:22', 19, 'Bootcamp Room 7'),
    (120, 20230012, 'Mouse', 'CurrentlyLoaned', '2023-12-17 21:21:52', 20, 'Development Room 13');

INSERT INTO Item_Transaction (Transaction_Id, Item_Id, Transaction_Type, Transaction_Datetime, Transaction_Maker, Supplier_Id)
VALUES
    (201, 101, 'ReturnAfterUpgrade', '2023-11-11 13:23:44', 20180004, 1),
    (202, 101, 'Loan', '2023-11-15 15:55:03', 20170004, NULL),
    (203, 108, 'Loan', '2023-11-17 11:23:24', 20170056, NULL),
    (204, 109, 'Loan', '2023-11-19 13:25:56', 20180025, NULL),
    (205, 118, 'ReturnForUpgrade', '2023-11-29 20:15:34', 20190013, 2),
    (206, 110, 'Loan', '2023-12-01 11:02:04', 20230012, NULL),
    (207, 103, 'ReturnAfterRepair', '2023-12-01 13:33:55', 20230021, 3),
    (208, 106, 'ReturnAfterUpgrade', '2023-12-03 08:05:15', 20230021, 4),
    (209, 103, 'Loan', '2023-12-04 11:02:59', 20180006, 5),
    (210, 118, 'Upgrade', '2023-12-05 11:01:21', 20190011, 7);

