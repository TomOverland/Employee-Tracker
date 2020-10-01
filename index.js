const inquirer = require("inquirer");
const mysql = require("mysql");
// const connection = require("./db/connection");

// function doesInquirerWork() {
//   inquirer
//     .prompt({
//       name: "test",
//       type: "input",
//       message: "Type something!",
//     })
//     .then((answer) => {
//       console.log("Hello");
//     });
// }

// doesInquirerWork();
function questions() {
  inquirer
    .prompt({
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
        "Update Employee Manager",
      ],
    })
    .then((answer) => {
      console.log(answer.menu);
      switch (answer.menu) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "View All Employees By Department":
          viewAllEmployeesByDepartment();
          break;

        case "View All Employees By Manager":
          viewAllEmployeesByManager();
          break;

        case "View All Employees By Role":
          viewAllEmployeesByRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Delete Role":
          deleteRole();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Delete Department":
          deleteDepartment();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Update Employee Manager":
          updateEmployeeManager();
          break;
      }
    });
}

function viewAllEmployees() {
  console.log("This is where you'd be able to view all employees");
  questions();
}

function viewAllEmployeesByDepartment() {
  console.log(
    "This is where you'd be able to view all employees by department"
  );
  questions();
}

function viewAllEmployeesByManager() {
  console.log(
    "This is where you'd be able to view all employees by department"
  );
  questions();
}

function viewAllEmployeesByRole() {
  console.log("This is where you would be able to view all employees by role");
  questions();
}

function addEmployee() {
  console.log("This is where you would be able to add an employee");
  questions();
}

function removeEmployee() {
  console.log("This is where you would be able to remove an employee");
  questions();
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the title of the role you would like to add?",
        name: "newRole",
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "newRoleSalary",
      },
      // Change this type to list once I create the department numbers; choices would be ((1) Engineering, (2) Human Resources, (3) Marketing, and so on).
      {
        type: "input",
        message: "What is the department number?",
        name: "departmentID",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [answer.newRole, answer.newRoleSalary, answer.departmentID]
      ),
        function (err, res) {
          if (err) throw err;
          console.table(res);
        };
    });
  questions();
}

function deleteRole() {
  console.log("This is where you would be able to remove roles");
  questions();
}

function addDepartment() {
  console.log("This is where you would be able to add Departments");
  questions();
}

function deleteDepartment() {
  console.log("This is where you would be able to delete departments");
  questions();
}

function updateEmployeeRole() {
  console.log("This is where you would be able to update an employee's role");
  questions();
}

function updateEmployeeManager() {
  console.log(
    "This is where you would be able to update an employee's manager"
  );
  questions();
}

function init() {
  questions();
}

init();
