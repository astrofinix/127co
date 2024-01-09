-- PROJECT MANAGEMENT --

CREATE TABLE IF NOT EXISTS Timeline (
    Timeline_ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    Timeline_StartDate DATE NOT NULL,
    Timeline_ExpectedFinishDate DATE NOT NULL,
    Timeline_FinishDate DATE NOT NULL,
    Timeline_DaysLeft INT NOT NULL,
    PRIMARY KEY (Timeline_ID)
);

CREATE TABLE IF NOT EXISTS Team (
    Team_ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    Team_Name VARCHAR(50) NOT NULL,
    Team_Leader_ID INT NOT NULL,
    PRIMARY KEY (Team_ID),
    FOREIGN KEY (Team_Leader_ID) REFERENCES Employee(Employee_ID)
);

CREATE TABLE IF NOT EXISTS Project (
    Project_ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    Project_Name VARCHAR(50) NOT NULL,
    Project_Description VARCHAR(50) NOT NULL,
    Project_Type VARCHAR(50) NOT NULL,
    Project_Budget INT NOT NULL,
    Project_Status VARCHAR(50) NOT NULL,
    Project_Timeline_ID INT NOT NULL,
    Project_Team_ID INT NOT NULL,
    Project_Contract_ID INT NOT NULL,
    PRIMARY KEY (Project_ID),
    FOREIGN KEY (Project_Timeline_ID) REFERENCES Timeline(Timeline_ID),
    FOREIGN KEY (Project_Team_ID) REFERENCES Team(Team_ID),
    FOREIGN KEY (Project_Contract_ID) REFERENCES Contract(Contract_ID)
);

CREATE TABLE IF NOT EXISTS Software (
    Software_Name VARCHAR(50) NOT NULL,
    Software_Version VARCHAR(50) NOT NULL,
    Software_Type VARCHAR(50) NOT NULL,
    Software_OS VARCHAR(50) NOT NULL,
    Software_Size INT NOT NULL,
    Software_Publisher VARCHAR(50) NOT NULL,
    Software_License VARCHAR(50) NOT NULL,
    PRIMARY KEY (Software_Name, Software_Version)
);

CREATE TABLE IF NOT EXISTS Team_Software (
    Team_ID INT NOT NULL,
    Software_Name VARCHAR(50) NOT NULL,
    Software_Version VARCHAR(50) NOT NULL,
    PRIMARY KEY (Team_ID, Software_Name, Software_Version),
    FOREIGN KEY (Team_ID) REFERENCES Team(Team_ID),
    FOREIGN KEY (Software_Name, Software_Version) REFERENCES Software(Software_Name, Software_Version)
);

INSERT INTO Timeline (Timeline_StartDate, Timeline_ExpectedFinishDate, Timeline_FinishDate, Timeline_DaysLeft) VALUES
('2018-10-01', '2018-10-31', '2018-10-31', 0),
('2018-10-01', '2018-11-28', '2018-11-28', 0),
('2018-10-01', '2018-10-31', '2018-10-31', 0),
('2018-10-01', '2018-10-30', '2018-10-30', 0),
('2018-10-01', '2018-11-30', '2018-11-30', 0);

INSERT INTO Team (Team_Name, Team_Leader_ID) VALUES
('Team 1', 20160001),
('Team 2', 20170004),
('Team 3', 20180006),
('Team 4', 20170056),
('Team 5', 20180025);

INSERT INTO Project (Project_Name, Project_Description, Project_Type, Project_Budget, Project_Status, Project_Timeline_ID, Project_Team_ID, Project_Contract_ID) VALUES
('Uno', 'Project 1 Description', 'Web Application', 100000, 'In Development', 1, 1, 1),
('Dos', 'Project 2 Description', 'Mobile Application', 200000, 'For Presentation', 2, 2, 2),
('Tenesis', 'Project 3 Description', 'Stand-alone Systems', 300000, 'For Deployment', 3, 3, 3),
('Quatro', 'Project 4 Description', 'Web Application', 400000, 'For Monitoring', 4, 4, 4),
('Senco', 'Project 5 Description', 'Mobile Application', 500000, 'Done', 5, 5, 5);

INSERT INTO Software (Software_Name, Software_Version, Software_Type, Software_OS, Software_Size, Software_Publisher, Software_License) VALUES
('Software 1', '1.0', 'Software 1 Type', 'Software 1 OS', 100, 'Software 1 Publisher', 'PDI'),
('Software 2', '2.0', 'Software 2 Type', 'Software 2 OS', 200, 'Software 2 Publisher', 'LGPL'),
('Software 3', '3.0', 'Software 3 Type', 'Software 3 OS', 300, 'Software 3 Publisher', 'Permissive'),
('Software 4', '4.0', 'Software 4 Type', 'Software 4 OS', 400, 'Software 4 Publisher', 'Copy Left'),
('Software 5', '5.0', 'Software 5 Type', 'Software 5 OS', 500, 'Software 5 Publisher', 'Proprietary');

INSERT INTO Team_Software (Team_ID, Software_Name, Software_Version) VALUES
(1, 'Software 1', '1.0'),
(2, 'Software 2', '2.0'),
(3, 'Software 3', '3.0'),
(4, 'Software 4', '4.0'),
(5, 'Software 5', '5.0');
