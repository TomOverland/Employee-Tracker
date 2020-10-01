const inquirer = require("inquirer");
const mysql = require("mysql");

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
  return;
}

function viewAllEmployeesByDepartment() {
  console.log(
    "This is where you'd be able to view all employees by department"
  );
  return;
}

function viewAllEmployeesByManager() {
  console.log(
    "This is where you'd be able to view all employees by department"
  );
  return;
}

function viewAllEmployeesByRole() {
  console.log("This is where you would be able to view all employees by role");
  return;
}

function addEmployee() {
  console.log("This is where you would be able to add an employee");
  return;
}

function removeEmployee() {
  console.log("This is where you would be able to remove an employee");
  return;
}

function addRole() {
  console.log("This is where you would be able to add roles");
  return;
}

function deleteRole() {
  console.log("This is where you would be able to remove roles");
  return;
}

function addDepartment() {
  console.log("This is where you would be able to add Departments");
  return;
}

function deleteDepartment() {
  console.log("This is where you would be able to delete departments");
  return;
}

function updateEmployeeRole() {
  console.log("This is where you would be able to update an employee's role");
  return;
}

function updateEmployeeManager() {
  console.log(
    "This is where you would be able to update an employee's manager"
  );
}

function init() {
  questions();
}

init();
