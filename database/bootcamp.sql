CREATE TABLE IF NOT EXISTS Course_Enrolled (
    Enrollment_ID INT NOT NULL PRIMARY KEY,
    Course_ID VARCHAR(6) NOT NULL,
    Employee_ID INT NOT NULL,
    Start_Date DATE NOT NULL,
    End_Date DATE NOT NULL,
    Grade INT NOT NULL,
    FOREIGN KEY (Course_ID) REFERENCES Course_Offered(Course_ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Course_Offered (
    Course_ID VARCHAR(6) PRIMARY KEY,
    Employee_ID INT NOT NULL,
    Course_Name VARCHAR(255) NOT NULL,
    Course_Category VARCHAR(255) NOT NULL,
    Course_Duration VARCHAR(255) NOT NULL,
    Course_Capacity INT NOT NULL,
    Course_Schedule VARCHAR(255) NOT NULL,
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Certificate (
    Certificate_ID VARCHAR(12) PRIMARY KEY,
    Employee_ID INT NOT NULL,
    Course_ID VARCHAR(6) NOT NULL,
    Release_Date DATE NOT NULL,
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Course_ID) REFERENCES Course_Offered(Course_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Instructor (
    Employee_ID INT NOT NULL,
    Course_ID VARCHAR(6) NOT NULL,
    PRIMARY KEY (Employee_ID, Course_ID),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Course_ID) REFERENCES Course_Offered(Course_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO Course_Enrolled (Enrollment_ID, Course_ID, Employee_ID, Start_Date, End_Date, Grade) VALUES 
('EI101', 'JAV100', 20160001, '2023-02-15', '2023-05-15', 96),
('EI102', 'LEA100', 20170004, '2023-01-10', '2023-03-26', 88),
('EI103', 'FRO100', 20180006, '2023-03-01', '2023-04-30', 91),
('EI104', 'EFF100', 20170056, '2023-02-01', '2023-04-16', 95),
('EI105', 'FIN100', 20180025, '2023-03-15', '2023-05-15', 89),
('EI106', 'JAV100', 20190013, '2023-02-20', '2023-05-20', 94),
('EI107', 'WEB100', 20190014, '2023-03-05', '2023-06-05', 86),
('EI108', 'ADV100', 20230007, '2023-01-20', '2023-04-06', 92),
('EI109', 'PRO100', 20230012, '2023-03-10', '2023-06-10', 97),
('EI1010', 'ADV100', 20220001, '2023-02-05', '2023-04-20', 87);

INSERT INTO Course_Offered (Course_ID, Employee_ID, Course_Name, Course_Category, Course_Duration, Course_Capacity, Course_Schedule) VALUES 
('JAV100', 20160001, 'Java Development Fundamentals', 'Technical Skills', '3 months (6 hours/week)', '15', 'MWF 10:00 AM - 12:00 PM'),
('LEA100', 20170004, 'Advanced Spring Framework', 'Technical Skills', '2.5 months (6 hours/week)', '15', 'TThSat 2:00 PM - 4:00 PM'),
('FRO100', 20180006, 'Web Development with Laravel Framework', 'Technical Skills', '3 months (6 hours/week)', '15', 'MWF 2:00 PM - 4:00 PM'),
('EFF100', 20170056, 'Frontend Essentials: HTML, CSS, and UI/UX Basics', 'Technical Skills', '2 months (6 hours/week)', '15', 'TThSat 7:00 PM - 9:00 PM'),
('FIN100', 20180025, 'Project Management', 'Technical Skills', '3 months (6 hours/week)', '15', 'MWF 4:00 PM - 6:00 PM'),
('STR100', 20190013, 'Stress Management and Work-Life Balance', 'Soft Skills', '2.5 months (6 hours/week)', '15', 'TThSat 4:00 PM - 6:00 PM'),
('WEB100', 20190014, 'Yoga and Mindfulness', 'Soft Skills', '3 months (6 hours/week)', '15', 'MWF 5:00 AM - 7:00 AM'),
('ADV100', 20230007, 'Leadership and Team Management', 'Soft Skills', '3 months (6 hours/week)', '15', 'TThSat 8:00 AM - 10:00 AM'),
('PRO100', 20230012, 'Financial Literacy: Investing and Personal Finance', 'Soft Skills', '2 months (6 hours/week)', '15', 'MWF 5:00 PM - 7:00 PM'),
('COM100', 20220001, 'Effective Communication and Presentation Skills', 'Soft Skills', '2.5 months (6 hours/week)', '15', 'TThSat 5:00 PM - 7:00 PM');

INSERT INTO Certificate (Certificate_ID, Employee_ID, Course_ID, Release_Date) VALUES 
('JAV100160001', 20160001, 'JAV100', '2023-05-15'),
('LEA100170004', 20170004, 'LEA100', '2023-03-26'),
('FRO100180006', 20180006, 'FRO100', '2023-04-30'),
('EFF100170056', 20170056, 'EFF100', '2023-04-16'),
('FIN100180025', 20180025, 'FIN100', '2023-05-15'),
('JAV100190013', 20190013, 'JAV100', '2023-05-20'),
('WEB100190014', 20190014, 'WEB100', '2023-06-05'),
('ADV100230007', 20230007, 'ADV100', '2023-04-06'),
('PRO100230012', 20230012, 'PRO100', '2023-06-10'),
('ADV100220001', 20220001, 'ADV100', '2023-04-20');

INSERT INTO Instructor (Employee_ID, Course_ID) VALUES 
(20160001, 'JAV100'),
(20170004, 'LEA100'),
(20180006, 'FRO100'),
(20170056, 'EFF100'),
(20180025, 'FIN100'),
(20190013, 'JAV100'),
(20190014, 'WEB100'),
(20230007, 'ADV100'),
(20230012, 'PRO100'),
(20220001, 'ADV100'); 

