-- PROJECT MANAGEMENT --

CREATE TABLE IF NOT EXISTS Timeline (
    Timeline_ID INT NOT NULL UNIQUE AUTO_INCREMENT,
    Timeline_StartDate DATE NOT NULL,
    Timeline_ExpectedFinishDate DATE NOT NULL,
    Timeline_FinishDate DATE NOT NULL,
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
    Project_Team_ID INT,
    PRIMARY KEY (Project_ID),
    FOREIGN KEY (Project_Timeline_ID) REFERENCES Timeline(Timeline_ID),
    FOREIGN KEY (Project_Team_ID) REFERENCES Team(Team_ID) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Software (
    Software_Name VARCHAR(50) NOT NULL,
    Software_Version VARCHAR(50) NOT NULL,
    Software_Type VARCHAR(50) NOT NULL,
    Software_OS VARCHAR(50) NOT NULL,
    Software_Size VARCHAR(50) NOT NULL,
    Software_Publisher VARCHAR(50) NOT NULL,
    Software_License VARCHAR(50) NOT NULL,
    PRIMARY KEY (Software_Name, Software_Version)
);

CREATE TABLE IF NOT EXISTS Team_Software (
    Team_ID INT NOT NULL,
    Software_Name VARCHAR(50) NOT NULL,
    Software_Version VARCHAR(50) NOT NULL,
    PRIMARY KEY (Team_ID, Software_Name, Software_Version),
    FOREIGN KEY (Team_ID) REFERENCES Team(Team_ID) ON DELETE CASCADE,
    FOREIGN KEY (Software_Name, Software_Version) REFERENCES Software(Software_Name, Software_Version) ON DELETE CASCADE
);

INSERT INTO Timeline (Timeline_StartDate, Timeline_ExpectedFinishDate, Timeline_FinishDate) VALUES
('2018-10-01', '2018-10-31', '2018-10-31'),
('2018-10-01', '2018-11-28', '2018-11-28'),
('2018-10-01', '2018-10-31', '2018-10-31'),
('2018-10-01', '2018-10-30', '2018-10-30'),
('2018-10-01', '2018-11-30', '2018-11-30'),
('2018-10-01', '2018-10-31', '2018-10-31'),
('2018-10-01', '2018-11-28', '2018-11-28'),
('2018-10-01', '2018-10-31', '2018-10-31'),
('2018-10-01', '2018-10-30', '2018-10-30'),
('2018-10-01', '2018-11-30', '2018-11-30'),
('2018-10-01', '2018-10-31', '2018-10-31');

INSERT INTO Team (Team_Name, Team_Leader_ID) VALUES
('Alpha', 20160089),
('Beta', 20160091),
('Gamma', 20160092),
('Delta', 20160093),
('Epsilon', 20160094),
('Zeta', 20160095),
('Eta', 20170000),
('Theta', 20170001),
('Iota', 20170002),
('Kappa', 20170003);

INSERT INTO Project (Project_Name, Project_Description, Project_Type, Project_Budget, Project_Status, Project_Timeline_ID, Project_Team_ID) VALUES
('Uno', 'Grading Management Application', 'Web Application', 500000, 'Done', 1, 1),
('Dos', 'Mobile Application for Resource Management', 'Mobile Application', 500000, 'Done', 2, 2),
('Tenesis', 'Stand-alone System for Medical Laboratories', 'Stand-alone Systems', 500000, 'Done', 3, 3),
('Quatro', 'Note Taking Application', 'Web Application', 500000, 'Done', 4, 4),
('Senco', 'Mobile Application for the Blind', 'Mobile Application', 500000, 'Done', 5, 5),
('Hydra', 'E-Commerce Application', 'Web Application', 600000, 'In Development', 6, 6),
('Helios', 'Smart Home Automation System', 'Mobile Application', 600000, 'For Presentation', 7, 7),
('Aqua', 'Library Management Software', 'Standalone Systems', 300000, 'For Deployment', 8, 8),
('Medicord', 'Medical Records Management System', 'Web Application', 200000, 'For Monitoring', 9, 9),
('Traveler', 'Travel Companion Application', 'Mobile Application', 600000, 'Terminated', 10, 10),
('Talk', 'Language Learning Application', 'Mobile Application', 600000, 'For Monitoring', 11, 10);


INSERT INTO Software (Software_Name, Software_Version, Software_Type, Software_OS, Software_Size, Software_Publisher, Software_License) VALUES
('CodeCraft', '3', 'Integrated Development Environment (IDE)', 'Windows, macOS, Linux', '300 MB', 'DevWorks Inc.', 'Proprietary'),
('SecureShield', '2.5', 'Security Suite', 'Windows', '150 MB', 'CyberSec Labs', 'Commercial'),
('DataSphere', '1.2', 'Data Analytics Tool', 'Windows, Linux', '500 MB', 'Analytix Corp.', 'Open Source'),
('PixelPulse', '5.1', 'Graphic Design Software', 'macOS', '700 MB', 'DesignMasters Ltd.', 'Commercial'),
('CloudConnect', '4', 'Cloud Management', 'Cross-platform', '200 MB', 'Cloudify Systems', 'Proprietary'),
('NetEngine', '7.3', 'Networking Software', 'Windows, Linux', '400 MB', 'NetWorks Inc.', 'Commercial'),
('AIForge', '2', 'Artificial Intelligence Platform', 'Linux', '600 MB', 'AITech Solutions', 'Open Source'),
('MusicMatrix', '3.5', 'Audio Editing Software', 'Windows, macOS', '250 MB', 'SonicMasters Inc.', 'Commercial'),
('HealthHub', '1', 'Healthcare Management Software', 'Web-based', '250 MB', 'HealthTech Innovations', 'Commercial'),
('SwiftServe', '6.2', 'Web Server Software', 'Linux', '100 MB', 'WebSoft Ltd.', 'Open Source');

INSERT INTO Team_Software (Team_ID, Software_Name, Software_Version) VALUES
(1, 'CodeCraft', '3'),
(2, 'SecureShield', '2.5'),
(3, 'DataSphere', '1.2'),
(4, 'PixelPulse', '5.1'),
(5, 'CloudConnect', '4'),
(6, 'NetEngine', '7.3'),
(7, 'AIForge', '2'),
(8, 'MusicMatrix', '3.5'),
(9, 'HealthHub', '1'),
(10, 'SwiftServe', '6.2');