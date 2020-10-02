const mysql = require("mysql");
const util = require("util");
const secrets = require("./config");

//setting up mySQL
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: secrets.username,
  password: secrets.password,
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
