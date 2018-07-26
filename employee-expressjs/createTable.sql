CREATE TABLE empTable (
    empId int,
    name varchar(255),
    dob varchar(255),
    salary int,
    skills varchar(255)
);

ALTER TABLE empTable MODIFY COLUMN empId INT auto_increment primary key
