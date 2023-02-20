-- Ranger Database Demo
-- Based on Military SRP Packet

DROP DATABASE IF EXISTS regiment;
CREATE DATABASE IF NOT EXISTS regiment;
USE regiment;    

DROP TABLE IF EXISTS rangers;
CREATE TABLE rangers (
	fname varchar(20) not null,
    mname varchar(20),
    lname varchar(20) not null,
    ssn char(11) not null,
    dodID char(10) not null,
    birthdate date not null,
    address varchar(40) not null,
    company varchar(10) not null,
    livingstatus boolean not null,
    milrank enum('Private', 'Private First Class', 'Corporal', 'Specialist', 'Sergeant', 'Staff Sergeant', 'Sergeant First Class',
    'Master Sergeant', 'First Sergeant', 'Sergeant Major', 'Command Sergeant Major', 'Sergeant Major of the Army', 
    'Second Lieutenant', 'First Lieutenant', 'Captain', 'Major', 'Lieutenant Colonel', 'Colonel', 'Brigadier General', 'Major General',
    'Lieutenant General', 'General', 'General of the Army') not null,
    primary key (dodID),
    unique key (ssn)
    );
    
    insert into rangers values ('John', 'Placeholder', 'Smith', '111-11-1111', '1234567890', '1997-04-09', '7372 Milquetoast Rd','07', True, 'First Lieutenant')
    , ('Smith', 'Angle', 'John', '222-22-2222', '1231231231', '1990-08-07', '4273 Boring Dr', '07', True, 'Master Sergeant'); 
    
DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
	ID char(10) not null,
    rangerpassword varchar(30) not null,
    IsAdmin boolean not null,
    primary key (ID),
	CONSTRAINT login_fk1 foreign key (ID) references rangers (dodID)
    );
    
    insert into accounts values ('1234567890', 'password', false);
    
DROP TABLE IF EXISTS srp_files;
CREATE TABLE srp_files (
	filename varchar(30) not null,
    file_location varchar(100) not null,
    srpID char(10) not null,
    file_date date not null,
    primary key (srpID, filename),
    CONSTRAINT srp_fk1 foreign key (srpID) references rangers (dodID)
    );
    
    insert into srp_files values ('srp112024', 'C:/Dummy/DummyFolder/Srp_Files/srp112024.pdf', '1234567890', '2022-11-22'), 
    ('out_of_date_srp', 'C:/Dummy/DummyFolder/Srp_Files/out_of_date_srp.pdf', '1231231231', '2010-09-08');
    
DROP TABLE IF EXISTS relatives;
CREATE TABLE relatives (
	fname varchar(20) not null,
    mname varchar(20),
    lname varchar(20) not null,
    ssn char(11) not null,
    rangerID char(10) not null,
    birthdate date not null,
    address varchar(40) not null,
    relationship varchar(20) not null,
    primary key (rangerID, ssn),
    CONSTRAINT relatives_fk2 foreign key (rangerID) references rangers (dodID)
    );
    
    insert into relatives values ('Mary', 'Redlohecalp', 'Smith', '987-65-4321', '1234567890', '1998-02-02', '7372 Milquetoast Rd', 'Spouse');
    
create or replace view display_out_of_date_srps as
select * from srp_files where file_date not between DATE_SUB(CURDATE(),INTERVAL (1/2) YEAR) AND CURDATE();

drop procedure if exists add_ranger;
delimiter //
create procedure add_ranger (in ip_fname varchar(20), in ip_mname varchar(20),
	in ip_lname varchar(20), in ip_ssn char(11), in ip_dodID char(10), in ip_birthdate date, 
     in ip_address varchar(40), in ip_company varchar(10), in ip_milrank varchar(20))
sp_main: begin
    if ((ip_ssn in (select ssn from rangers)) or ip_dodID in (select dodID from rangers))
    then leave sp_main; end if;
    insert into rangers values (ip_fname, ip_mname, ip_lname, ip_ssn, ip_dodID, ip_birthdate, ip_address, ip_company, ip_milrank);
end //
delimiter ;

drop procedure if exists add_relative;
delimiter //
create procedure add_relative (in ip_fname varchar(20), in ip_mname varchar(20),
	in ip_lname varchar(20), in ip_ssn char(11), in ip_rangerID char(10), in ip_birthdate date, 
     in ip_address varchar(40), in ip_relationship varchar(20))
sp_main: begin
    if ((ip_ssn in (select ssn from relatives where rangerID = rangerID)) or ip_rangerID not in (select dodID from rangers))
    then leave sp_main; end if;
    insert into relatives values (ip_fname, ip_mname, ip_lname, ip_ssn, ip_rangerID, ip_birthdate, ip_address, ip_relationship);
end //
delimiter ;

drop procedure if exists add_srp;
delimiter //
create procedure add_srp (in ip_filename varchar(30), in ip_file_location varchar(100),
	in ip_srpID char(10), in ip_file_date date)
sp_main: begin
    if ((ip_filename in (select filename from srp_files where srpID = ip_srpID)) or ip_srpID not in (select dodID from rangers))
    then leave sp_main; end if;
    insert into srp_files values (ip_filename, ip_file_location, ip_srpID, ip_file_date);
end //
delimiter ;

drop procedure if exists add_account;
delimiter //
create procedure add_account(in ip_ID char(10), in ip_rangerpassword varchar(30), in ip_IsAdmin boolean)
sp_main: begin
	if ((ip_ID in (select ID from accounts)) or (ip_ID not in (select dodID from rangers)))
    then leave sp_main; end if;
    insert into accounts values (ip_ID, ip_rangerpassword, ip_IsAdmin);
end //
delimiter ;
-- Empty inputs can be rendered as '' to not sort by that input
-- 
drop procedure if exists searchName;
delimiter //
create procedure searchName(in ip_name varchar(62))
sp_main: begin
	select * from regiment.rangers where (concat(fname, ' ', mname, ' ', lname) like concat('%', ip_name, '%')) or (concat(fname, ' ', lname) like concat('%', ip_name, '%'));
end //
delimiter ;

drop procedure if exists searchID;
delimiter //
create procedure searchID(in ip_dodID char(10))
sp_main: begin
	select * from regiment.rangers where (dodID = ip_dodID);
end //
delimiter ;

drop procedure if exists searchMultifield;
delimiter //
create procedure searchMultifield(in ip_dodID char(10), in ip_name varchar(62))
sp_main: begin
	select * from regiment.rangers where (dodID = ip_dodID) and (concat(fname, ' ', mname, ' ', lname) like concat('%', ip_name, '%')) or (concat(fname, ' ', lname) like concat('%', ip_name, '%'));
end //
delimiter ;

-- If no input is used, such as with sorts, views should be used
create or replace view sortName as

select * from regiment.rangers order by lname;

create or replace view sortNameandCompany as
select * from regiment.rangers order by lname, company;

create or replace view sortID as
select * from regiment.rangers order by dodID;

create or replace view sortIDandCompany as
select * from regiment.rangers order by dodID, company;

create or replace view sortNameandID as
select * from regiment.rangers order by lname, dodID;

create or replace view sortIDandRank as
select * from regiment.rangers order by dodID, milrank;

create or replace view sortNameandRank as
select * from regiment.rangers order by lname, milrank;

create or replace view sortCompanyandRank as
select * from regiment.rangers order by company, milrank;

create or replace view sortCompany as
select * from regiment.rangers order by company;

create or replace view sortRank as
select * from regiment.rangers order by milrank;

create or replace view rangersrps as
select fname, mname, lname, dodID, filename, file_location, file_date from regiment.rangers
join
regiment.srp_files on srpID = dodID;

create or replace view rangersrpsSortName as
select fname, mname, lname, dodID, filename, file_location, file_date from regiment.rangers
join
regiment.srp_files on srpID = dodID order by lname;

create or replace view rangerrelatives as
select rangers.fname as rangerfname, rangers.mname as rangermname, rangers.lname as rangerlname, dodID, relatives.fname as relativefname,
relatives.mname as relativemname, relatives.lname as relativelname, relatives.birthdate as relativebirthdate, 
relatives.address as relativeaddress, relationship from regiment.rangers
join
regiment.relatives on rangerID = dodID;

create or replace view rangerrelativesSortRangerName as
select rangers.fname as rangerfname, rangers.mname as rangermname, rangers.lname as rangerlname, dodID, relatives.fname as relativefname,
relatives.mname as relativemname, relatives.lname as relativelname, relatives.birthdate as relativebirthdate, 
relatives.address as relativeaddress, relationship from regiment.rangers
join
regiment.relatives on rangerID = dodID order by rangerlname;

create or replace view rangerrelativesSortRelativeName as
select rangers.fname as rangerfname, rangers.mname as rangermname, rangers.lname as rangerlname, dodID, relatives.fname as relativefname,
relatives.mname as relativemname, relatives.lname as relativelname, relatives.birthdate as relativebirthdate, 
relatives.address as relativeaddress, relationship from regiment.rangers
join
regiment.relatives on rangerID = dodID order by relativelname;