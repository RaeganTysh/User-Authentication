CREATE DATABASE MyGuestbook;

USE MyGuestbook;
CREATE TABLE Users(
Id int IDENTITY(1,1) PRIMARY KEY,
FirstName char(50) NOT NULL,
LastName char(50) NOT NULL,
Email varchar(50) NOT NULL UNIQUE,
UserPass varchar(20) NOT NULL,
Comment varchar(250) NOT NULL,
DT Date  
); 


Use MyGuestbook;
Select *
From Users;

Use MyGuestbook;
INSERT INTO Users (FirstName, LastName, Email, UserPass, Comment )
VALUES ('Rae','Tysh', 'rae-gan@shaw.ca', 'rae', 'Happy Birthday' );
INSERT INTO Users (FirstName, LastName, Email, UserPass, Comment ) 
VALUES ('John','Smith', 'john@shaw.ca', 'john', 'Happy Anniversary'); 

USE MyGuestbook;
DROP TABLE Users;
