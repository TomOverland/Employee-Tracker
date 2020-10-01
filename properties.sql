-- create a new user
CREATE USER 'test'@'localhost' IDENTIFIED BY 'password';
-- add priverlages to user
-- ALL PRIVILEGES- as we saw previously, this would allow a MySQL user full access to a designated database (or if no database is selected, global access across the system)
-- CREATE- allows them to create new tables or databases
-- DROP- allows them to them to delete tables or databases
-- DELETE- allows them to delete rows from tables
-- INSERT- allows them to insert rows into tables
-- SELECT- allows them to use the SELECT command to read through databases
-- UPDATE- allow them to update table rows
-- GRANT OPTION- allows them to grant or remove other users' privileges
grant all privileges on employee_trackerDB . * to 'test'@'localhost';
-- alter an existing user's password
-- alter USER 'newuser'@'localhost' IDENTIFIED BY 'password';
-- allow use of password by user
-- ALTER USER 'test'@'localhost' IDENTIFIED
-- WITH mysql_native_password BY 'password';
-- flush the privleges to clean cache
-- flush privileges;