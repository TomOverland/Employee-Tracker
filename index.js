const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = require("./db/connection");
const cTable = require("console.table");

function questions() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "Welcome to the Employee Tracker",
      choices: [
        "View All Employees",
        "View All Departments",
        // "View All Employees By Manager",
        "View All Roles",
        "Add Employee",
        "Remove Employee",
        "Add Role",
        "Delete Role",
        "Add Department",
        "Delete Department",
        "Update Employee Role",
        // "Update Employee Manager",
      ],
    })
    .then((answer) => {
      switch (answer.menu) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "View All Departments":
          viewAllDepartments();
          break;

        // -- Bonus --
        // case "View All Employees By Manager":
        //   viewAllEmployeesByManager();
        //   break;

        case "View All Roles":
          viewAllRoles();
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

        // -- Bonus --
        // case "Update Employee Manager":
        //   updateEmployeeManager();
        //   break;
      }
    });
}

function viewAllEmployees() {
  const query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  });
}

function viewAllDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  });
}

// -- Bonus --
// function viewAllEmployeesByManager() {
//   console.log(
//     "This is where you'd be able to view all employees by department"
//   );
//   questions();
// }

function viewAllRoles() {
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "newFirstName",
        type: "input",
        message: "What's the new employee's first name?",
      },
      {
        name: "newLastName",
        type: "input",
        message: "What's the new employee's last name?",
      },
      {
        name: "newRoleID",
        type: "input",
        message:
          "What's the new employee's role ID number? (1 Engineer) (2 Engineer Supervisor) (3 Sales Rep) (4 Sales Manager) (5 HR Coordinator) (6 HR Supervisor) (7 Tech Support) (8 IT Supervisor)",
      },
      {
        name: "newManagerID",
        type: "input",
        message:
          "What's the new employee's manager's ID? (1 Engineering Supervisor) (2 Marketing Supervisor) (3 HR Supervisor) (4 IT Supervisor)",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          answer.newFirstName,
          answer.newLastName,
          answer.newRoleID,
          answer.newManagerID,
        ]
      ),
        function (err, res) {
          if (err) throw err;
          console.table(res);
        };
      console.log("The employee has been added!");
      questions();
    });
}

function removeEmployee() {
  // Displays list of all employees first so you will be able to find the ID of the one you would like to remove.
  // let query = "SELECT * FROM employee";
  // connection
  //   .query(query, function (err, res) {
  //     if (err) throw err;
  //     console.table(res);
  //   })
  inquirer
    .prompt({
      name: "removeEmployee",
      type: "input",
      message:
        "Please enter the employee ID of the employee you would like to remove",
    })
    .then((answer) => {
      let query = "DELETE FROM employee WHERE ?";
      const deleteID = parseInt(answer.removeEmployee);

      connection.query(query, { id: deleteID }, function (err, res) {
        if (err) throw err;
      });
      console.log("Employee has been removed.");
      questions();
    });
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
      questions();
    });
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

// -- Bonus --
// function updateEmployeeManager() {
//   console.log(
//     "This is where you would be able to update an employee's manager"
//   );
//   questions();
// }

function init() {
  questions();
}

init();
