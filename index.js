const mysql = require("mysql");
const inquirer = require("inquirer");

//setting up mySQL
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: ""
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as ID " + connection.threadId);
    connection.end();
});

function init(){
    inquirer.prompt({
        name: "menu",
        type: "list",
        message: "Welcome to the Employee Tracker",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "View All Employees By Role",
            "Add Employee",
            "Remove Empoyee",
            "Add Role",
            "Delete Role",
            "Add Department",
            "Delete Department",
            "Update Employee Role",
            "Update Employee Manager"
        ]
    }).then((answer) => {
        switch (answer.menu) {
            case "View All Employees":
                viewAllEmployees();
                break;

            case "View All Employees By Department":
                viewAllEmployeesByDepartment();
                break;
        }
    })
}

function viewAllEmployees(){
    console.log("This is where you'd be able to view all employees");
};

function viewAllEmployeesByDepartment(){
    console.log("This is where you'd be able to view all employees by department");
}