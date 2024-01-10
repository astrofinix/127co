DROP DATABASE IF EXISTS CS127;
CREATE DATABASE CS127;
USE CS127;
SET GLOBAL event_scheduler = ON;

-- NOTE: 
-- if you depend on a certain department make sure the files are sourced
-- before your department

SOURCE database/human_resources.sql
-- SOURCE database/projects.sql
-- SOURCE database/marketing.sql

-- Loners
SOURCE database/supplies.sql
source database/cooperative.sql
-- SOURCE database/finance.sql
