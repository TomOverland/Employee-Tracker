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
        "View All Roles", // Done
        "Add Employee", // Done
        "Remove Employee", // Done
        "Add Role", // Done
        // "Delete Role",
        "Add Department", // Done
        // "Delete Department",
        "Update Employee Role", // Done
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

        // -- Bonus --
        // case "Delete Role":
        //   deleteRole();
        //   break;

        case "Add Department":
          addDepartment();
          break;

        // -- Bonus --
        // case "Delete Department":
        //   deleteDepartment();
        //   break;

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
      // TO DO: Make this into a list with a switch/case.  The (# Role) is too bulky on the Command Line.  Assign a var to manager ID depending on the role?
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
          "What's the new employee's manager's ID? (1 Engineering Supervisor) (2 Sales Supervisor) (3 HR Supervisor) (4 IT Supervisor)",
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
  let employeeArr = [];

  connection.query("SELECT * FROM employee", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      let employeeStr =
        res[i].id + " " + res[i].first_name + " " + res[i].last_name;
      employeeArr.push(employeeStr);
    }
    inquirer
      .prompt({
        name: "removeEmployee",
        type: "list",
        message: "Please select the employee you would like to remove",
        choices: employeeArr,
      })
      .then((answer) => {
        const removeID = parseInt(answer.removeEmployee.split(" ")[0]);

        let query = "DELETE FROM employee WHERE ?";

        connection.query(query, { id: removeID }, function (err, res) {
          if (err) throw err;
        });
        console.log("Employee has been removed.");
        questions();
      });
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

// -- Bonus --
// function deleteRole() {
//   console.log("This is where you would be able to remove roles");
//   questions();
// }

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the title of the department you would like to add?",
      name: "newDepartment",
    })
    .then((answer) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.newDepartment],
        function (err, res) {
          if (err) throw err;
          console.log("Department added successfully!");
        }
      );
      questions();
    });
}

// -- Bonus --
// function deleteDepartment() {
//   console.log("This is where you would be able to delete departments");
//   questions();
// }

function updateEmployeeRole() {
  // TO DO: Update manager_id to reflect which supervisor oversees the new role.
  let employeeArr = [];

  connection.query("SELECT * FROM employee", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      let employeeStr =
        res[i].id + " " + res[i].first_name + " " + res[i].last_name;
      employeeArr.push(employeeStr);
    }

    inquirer
      .prompt([
        {
          name: "updateRole",
          type: "list",
          message: "Select the employee whose role you would like to update.",
          choices: employeeArr,
        },
        {
          name: "newRole",
          type: "list",
          message: "Please select the employee's new role.",
          choices: [
            "Engineer",
            "Engineering Supervisor",
            "Sales Representative",
            "Sales Manager",
            "Human Resources Coordinator",
            "Human Resources Supervisor",
          ],
        },
      ])
      .then((answer) => {
        const updateID = {};
        updateID.employeeID = parseInt(answer.updateRole.split(" ")[0]);
        if (answer.newRole === "Engineer") {
          updateID.role_id = 1;
        } else if (answer.newRole === "Engineering Supervisor") {
          updateID.role_id = 2;
        } else if (answer.newRole === "Sales Representative") {
          updateID.role_id = 3;
        } else if (answer.newRole === "Sales Manager") {
          updateID.role_id = 4;
        } else if (answer.newRole === "Human Resources Coordinator") {
          updateID.role_id = 5;
        } else if (answer.newRole === "Human Resources Supervisor") {
          updateID.role_id = 6;
        }
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [
          updateID.role_id,
          updateID.employeeID,
        ]);
        console.log("Role successfully updated!");
        questions();
      });
  });
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
