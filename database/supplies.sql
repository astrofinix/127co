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
    (1, 'ABC Suppliers', '123 Main Street', '555-1234', 'abc@example.com'),
    (2, 'XYZ Distributors', '456 Oak Avenue', '555-5678', 'xyz@example.com'),
    (3, 'LMN Electronics', '789 Pine Road', '555-9876', 'lmn@example.com'),
    (4, 'PQR Furniture', '101 Maple Lane', '555-4321', 'pqr@example.com'),
    (5, 'UVW Appliances', '202 Cedar Boulevard', '555-8765', 'uvw@example.com'),
    (6, 'EFG Office Solutions', '303 Birch Street', '555-2109', 'efg@example.com'),
    (7, 'GHI Supplies', '404 Elm Lane', '555-6543', 'ghi@example.com'),
    (8, 'JKL Electronics', '505 Oak Road', '555-3210', 'jkl@example.com'),
    (9, 'RST Furniture', '606 Pine Boulevard', '555-7654', 'rst@example.com'),
    (10, 'MNO Appliances', '707 Cedar Lane', '555-1098', 'mno@example.com');

INSERT INTO Item (Item_Id, Loaned_To, Item_Type, Item_Status, Item_LastUpdated, Supplier_Id, Item_Location)
VALUES
    (101, 20220001, 'Laptop', 'Available', '2023-01-01 12:00:00', 1, 'Inventory'),
    (102, 20170007, 'Laptop', 'NeedsUpgrade', '2023-01-02 10:30:00', 2, 'Office B'),
    (103, 20230008, 'Printer', 'NeedsRepair', '2023-01-03 14:15:00', 3, 'Inventory'),
    (104, 20230009, 'Desk', 'CurrentlyLoaned', '2023-01-04 08:45:00', 4, 'Office D'),
    (105, 20230010, 'Projector', 'Available', '2023-01-05 16:20:00', 5, 'Inventory'),
    (106, 20230011, 'Sofa', 'CurrentlyLoaned', '2023-01-06 11:10:00', 6, 'Office F'),
    (107, 20160002, 'Refrigerator', 'Available', '2023-01-07 13:30:00', 7, 'Inventory'),
    (108, 20160076, 'Bookshelf', 'NeedsRepair', '2023-01-08 09:55:00', 8, 'Office H'),
    (109, 20180004, 'Microwave', 'Available', '2023-01-09 15:40:00', 9, 'Inventory'),
    (110, 20230021, 'Whiteboard', 'CurrentlyLoaned', '2023-01-10 07:25:00', 10, 'Office J');

INSERT INTO Item_Transaction (Transaction_Id, Item_Id, Transaction_Type, Transaction_Datetime, Transaction_Maker)
VALUES
    (201, 101, 'Loan', '2023-02-01 09:00:00', 20160001),
    (202, 102, 'Upgrade', '2023-02-02 14:45:00', 20170004),
    (203, 103, 'Repair', '2023-02-03 11:30:00', 20180006),
    (204, 104, 'ReturnAfterRepair', '2023-02-04 08:15:00', 20170056),
    (205, 105, 'ReturnForUpgrade', '2023-02-05 16:50:00', 20180025),
    (206, 106, 'ReturnAfterLoan', '2023-02-06 10:40:00', 20190013),
    (207, 106, 'Loan', '2023-02-06 10:40:00', 20190013),
    (208, 108, 'Repair', '2023-02-08 09:55:00', 20230007),
    (209, 109, 'ReturnAfterUpgrade', '2023-02-09 15:30:00', 20230008),
    (210, 110, 'ReturnForRepair', '2023-02-10 07:05:00', 20230009);

