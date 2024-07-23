CREATE DATABASE project;
use project;

CREATE table users(email varchar(30) PRIMARY key, pwd varchar(30), type varchar(20),dos date,status int);
select * from users;

create table donors(email VARCHAR(40) primary key, name varchar(30), mobile varchar(10), address varchar(50), city varchar(20), proof varchar(20), picname varchar(200));
select * from donors;

drop table needy;

create table needy(email VARCHAR(40) primary key, name varchar(30), mobile varchar(10),gender varchar(10),dob date, address varchar(150), city varchar(20), proof varchar(20), picname varchar(200));
select * from needy;

CREATE TABLE medsavailable (
    srno INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(40),
    med VARCHAR(30),
    expdate DATE,
    packing VARCHAR(25),
    qty INT
);
select * from medsavailable;

CREATE TABLE availmed (
    srno INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(40),
    medName varchar(50),
    exp DATE,
    qty INT
);
select * from availmed;


---------------------| MAIN CODE |-----------------------------

SELECT donors.name, donors.address, donors.city, donors.email
FROM donors
INNER JOIN medsavailable ON donors.email = medsavailable.email
WHERE medsavailable.med = '?' AND donors.city = '?';

---------------------------------------------------------------


-- Sample data for users
INSERT INTO users (email, pwd, type, dos, status) VALUES
('donor1@example.com', 'password1', '1', '2024-03-30', 1),
('donor2@example.com', 'password2', '1', '2024-03-30', 1),
('donor3@example.com', 'password3', '1', '2024-03-30', 1),
('donor4@example.com', 'password4', '1', '2024-03-30', 1),
('donor5@example.com', 'password5', '1', '2024-03-30', 1),
('needy6@example.com', 'password6', '2', '2024-03-30', 1),
('needy7@example.com', 'password7', '2', '2024-03-30', 1),
('needy8@example.com', 'password8', '2', '2024-03-30', 1),
('needy9@example.com', 'password9', '2', '2024-03-30', 1),
('needy10@example.com', 'password10', '2', '2024-03-30', 1);
select * from users;

-- Sample data for donors
INSERT INTO donors (email, name, mobile, address, city, proof, pic) VALUES
('donor1@example.com', 'Amit Kumar', 9876543210, '123, ABC Street', 'Delhi', 'Aadhar', 'donor1_pic.jpg'),
('donor2@example.com', 'Priya Singh', 9876543211, '456, XYZ Road', 'Mumbai', 'PAN', 'donor2_pic.jpg'),
('donor3@example.com', 'Rahul Sharma', 9876543212, '789, PQR Lane', 'Bangalore', 'Aadhar', 'donor3_pic.jpg'),
('donor4@example.com', 'Neha Patel', 9876543213, '1011, LMN Avenue', 'Chennai', 'Voter ID', 'donor4_pic.jpg'),
('donor5@example.com', 'Sandeep Gupta', 9876543214, '1213, RST Colony', 'Kolkata', 'PAN', 'donor5_pic.jpg'),
('donor6@example.com', 'Pooja Shah', 9876543215, '1415, UVW Nagar', 'Hyderabad', 'Aadhar', 'donor6_pic.jpg'),
('donor7@example.com', 'Ravi Verma', 9876543216, '1617, GHI Street', 'Pune', 'Voter ID', 'donor7_pic.jpg'),
('donor8@example.com', 'Deepak Reddy', 9876543217, '1819, JKL Road', 'Ahmedabad', 'PAN', 'donor8_pic.jpg'),
('donor9@example.com', 'Anjali Yadav', 9876543218, '2021, NOP Lane', 'Jaipur', 'Aadhar', 'donor9_pic.jpg'),
('donor10@example.com', 'Rajesh Kumar', 9876543219, '2223, QRS Colony', 'Lucknow', 'Voter ID', 'donor10_pic.jpg');
select * from donors;

-- Sample data for needy
INSERT INTO needy (email, name, mobile, gender, dob, address, city, proof, pic) VALUES
('needy1@example.com', 'Aarti Gupta', 9876543220, 'Female', '1990-05-15', '123, ABC Street', 'Delhi', 'Aadhar', 'needy1_pic.jpg'),
('needy2@example.com', 'Suresh Singh', 9876543221, 'Male', '1985-08-20', '456, XYZ Road', 'Mumbai', 'PAN', 'needy2_pic.jpg'),
('needy3@example.com', 'Geeta Sharma', 9876543222, 'Female', '1992-12-10', '789, PQR Lane', 'Bangalore', 'Aadhar', 'needy3_pic.jpg'),
('needy4@example.com', 'Mohan Patel', 9876543223, 'Male', '1980-03-25', '1011, LMN Avenue', 'Chennai', 'Voter ID', 'needy4_pic.jpg'),
('needy5@example.com', 'Rani Verma', 9876543224, 'Female', '1978-06-30', '1213, RST Colony', 'Kolkata', 'PAN', 'needy5_pic.jpg'),
('needy6@example.com', 'Ajay Shah', 9876543225, 'Male', '1987-09-05', '1415, UVW Nagar', 'Hyderabad', 'Aadhar', 'needy6_pic.jpg'),
('needy7@example.com', 'Sonali Reddy', 9876543226, 'Female', '1983-01-12', '1617, GHI Street', 'Pune', 'Voter ID', 'needy7_pic.jpg'),
('needy8@example.com', 'Sanjay Yadav', 9876543227, 'Male', '1975-04-18', '1819, JKL Road', 'Ahmedabad', 'PAN', 'needy8_pic.jpg'),
('needy9@example.com', 'Rita Kumar', 9876543228, 'Female', '1995-07-23', '2021, NOP Lane', 'Jaipur', 'Aadhar', 'needy9_pic.jpg'),
('needy10@example.com', 'Vijay Singh', 9876543229, 'Male', '1970-10-08', '2223, QRS Colony', 'Lucknow', 'Voter ID', 'needy10_pic.jpg');
select * from needy;

-- Sample data for medsavailable
INSERT INTO medsavailable (email, med, expdate, packing, qty) VALUES
('donor1@example.com', 'Paracetamol', '2024-12-31', 'Bottle', 100),
('donor2@example.com', 'Ibuprofen', '2025-06-30', 'Box', 50),
('donor3@example.com', 'Amoxicillin', '2023-09-15', 'Strip', 80),
('donor4@example.com', 'Ciprofloxacin', '2023-11-30', 'Bottle', 60),
('donor5@example.com', 'Omeprazole', '2024-10-31', 'Box', 40),
('donor6@example.com', 'Atorvastatin', '2023-08-15', 'Strip', 70),
('donor7@example.com', 'Metformin', '2025-03-31', 'Bottle', 90),
('donor8@example.com', 'Aspirin', '2024-05-30', 'Box', 55),
('donor9@example.com', 'Prednisone', '2023-07-15', 'Strip', 75),
('donor10@example.com', 'Lisinopril', '2024-09-30', 'Bottle', 65);
select * from medsavailable;

-- Sample data for availmed
INSERT INTO availmed (email, medName, exp, qty) VALUES
('needy1@example.com', 'Paracetamol', '2024-12-31', 5),
('needy2@example.com', 'Ibuprofen', '2025-06-30', 10),
('needy3@example.com', 'Amoxicillin', '2023-09-15', 8),
('needy4@example.com', 'Ciprofloxacin', '2023-11-30', 7),
('needy5@example.com', 'Omeprazole', '2024-10-31', 6),
('needy6@example.com', 'Atorvastatin', '2023-08-15', 9),
('needy7@example.com', 'Metformin', '2025-03-31', 12),
('needy8@example.com', 'Aspirin', '2024-05-30', 11),
('needy9@example.com', 'Prednisone', '2023-07-15', 4),
('needy10@example.com', 'Lisinopril', '2024-09-30', 3);
select * from availmed;