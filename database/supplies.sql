USE CS127;

-- SUPPLIES AND INVENTORY --

CREATE TABLE IF NOT EXISTS Supplier (
    Supplier_Id INT PRIMARY KEY,
    Supplier_Name VARCHAR(255),
    Supplier_Address VARCHAR(255),
    Supplier_ContactNumber VARCHAR(15),
    Supplier_ContactEmail VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Item (
    Property_Id INT PRIMARY KEY,
    Employee_Id INT,
    Item_Type VARCHAR(50),
    Item_Status VARCHAR(20),
    Item_LastUpdated DATETIME,
    Supplier_Id INT,
    Item_Location VARCHAR(100),
    FOREIGN KEY (Supplier_Id) REFERENCES Supplier(Supplier_Id)
);

CREATE TABLE IF NOT EXISTS Transaction_History (
    Transaction_Id INT PRIMARY KEY,
    Property_Id INT,
    Transaction_Type VARCHAR(50),
    Transaction_Datetime DATETIME,
    FOREIGN KEY (Property_Id) REFERENCES Item(Property_Id)
);

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

INSERT INTO Item (Property_Id, Employee_Id, Item_Type, Item_Status, Item_LastUpdated, Supplier_Id, Item_Location)
VALUES
    (101, 1001, 'Laptop', 'Available', '2023-01-01 12:00:00', 1, 'Inventory'),
    (102, 1002, 'Chair', 'CurrentlyLoaned', '2023-01-02 10:30:00', 2, 'Office B'),
    (103, 1003, 'Printer', 'Available', '2023-01-03 14:15:00', 3, 'Inventory'),
    (104, 1004, 'Desk', 'CurrentlyLoaned', '2023-01-04 08:45:00', 4, 'Office D'),
    (105, 1005, 'Projector', 'Available', '2023-01-05 16:20:00', 5, 'Inventory'),
    (106, 1006, 'Sofa', 'CurrentlyLoaned', '2023-01-06 11:10:00', 6, 'Office F'),
    (107, 1007, 'Refrigerator', 'Available', '2023-01-07 13:30:00', 7, 'Inventory'),
    (108, 1008, 'Bookshelf', 'CurrentlyLoaned', '2023-01-08 09:55:00', 8, 'Office H'),
    (109, 1009, 'Microwave', 'Available', '2023-01-09 15:40:00', 9, 'Inventory'),
    (110, 1010, 'Whiteboard', 'CurrentlyLoaned', '2023-01-10 07:25:00', 10, 'Office J');

INSERT INTO Transaction_History (Transaction_Id, Property_Id, Transaction_Type, Transaction_Datetime)
VALUES
    (201, 101, 'Loan', '2023-02-01 09:00:00'),
    (202, 102, 'Upgrade', '2023-02-02 14:45:00'),
    (203, 103, 'Repair', '2023-02-03 11:30:00'),
    (204, 104, 'ReturnAfterRepair', '2023-02-04 08:15:00'),
    (205, 105, 'ReturnForUpgrade', '2023-02-05 16:50:00'),
    (206, 106, 'Loan', '2023-02-06 10:40:00'),
    (207, 107, 'Upgrade', '2023-02-07 13:20:00'),
    (208, 108, 'Repair', '2023-02-08 09:55:00'),
    (209, 109, 'ReturnAfterUpgrade', '2023-02-09 15:30:00'),
    (210, 110, 'ReturnForRepair', '2023-02-10 07:05:00');


