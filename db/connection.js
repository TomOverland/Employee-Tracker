const mysql = require("mysql");
const util = require("util");

//setting up mySQL
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Replace "test" with your mySQL username
  user: "test",
  // Replace "password" with your mySQL password
  password: "password",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as ID " + connection.threadId);
  connection.end();
});

// Setting up connection.query to use promises instead of callbacks
connection.query = util.promisify(connection.query);

module.exports = connection;
