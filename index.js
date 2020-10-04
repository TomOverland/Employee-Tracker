const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = require("./db/connection");
const cTable = require("console.table");
const { connect } = require("./db/connection");

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
        // "View Department Budget"
        "Exit",
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

        // -- TO DO --
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

        // -- TO DO --
        // case "Update Employee Manager":
        //   updateEmployeeManager();
        //   break;

        // -- TO DO --
        // case "View Department Budget":
        //   viewDepartmentBudget();
        //   break;

        case "Exit":
          connection.end();
          break;
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

// -- TO DO --
// function viewAllEmployeesByManager() {

// const managerID = // This needs to be defined.  create array of employees, get employee name, and manager id, split the manager id.

//  let query =  SELECT * FROM employees WHERE ?

// connection.query(query, { manager_id: managerID }, function (err, res) {
//   if (err) throw err;
// });
//   console.log(
//     "This is where you'd be able to view all employees by manager"
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

function deleteRole() {
  let roleArr = [];

  connection.query("SELECT * FROM role", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      let roleStr = res[i].id + " " + res[i].title;
      roleArr.push(roleStr);
    }
    inquirer
      .prompt({
        name: "removeRole",
        type: "list",
        message: "Please select the role you would like to remove",
        choices: roleArr,
      })
      .then((answer) => {
        const removeID = parseInt(answer.removeRole.split(" ")[0]);

        let query = "DELETE FROM role WHERE ?";

        connection.query(query, { id: removeID }, function (err, res) {
          if (err) throw err;
        });
        console.log("Role has been removed.");
        questions();
      });
  });
}

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

function deleteDepartment() {
  let departmentArr = [];

  connection.query("SELECT * FROM department", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      let departmentStr = res[i].id + " " + res[i].name;
      departmentArr.push(departmentStr);
    }
    inquirer
      .prompt({
        name: "removeDepartment",
        type: "list",
        message: "Please select the department you would like to remove",
        choices: departmentArr,
      })
      .then((answer) => {
        const removeID = parseInt(answer.removeDepartment.split(" ")[0]);

        let query = "DELETE FROM department WHERE ?";

        connection.query(query, { id: removeID }, function (err, res) {
          if (err) throw err;
        });
        console.log("Department has been removed.");
        questions();
      });
  });
}

function updateEmployeeRole() {
  // TO DO: Update manager_id to reflect which supervisor oversees the new role.
  let roleArr = [];
  connection.query("SELECT * FROM role", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      let roleStr = res[i].id + " " + res[i].title;
      roleArr.push(roleStr);
    }

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
            choices: roleArr,
          },
        ])
        .then((answer) => {
          const updateID = {};
          updateID.employeeID = parseInt(answer.updateRole.split(" ")[0]);
          updateID.newID = parseInt(answer.newRole.split(" ")[0]);

          connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [
            updateID.newID,
            updateID.employeeID,
          ]);
          console.log("Role successfully updated!");
          questions();
        });
    });
  });
}

// function updateEmployeeManager() {  // TO DO: Still working on updating manager.
//   let employeeArr = [];

//   connection.query("SELECT * FROM employee", function (err, res) {
//     for (let i = 0; i < res.length; i++) {
//       let employeeStr =
//         res[i].id + " " + res[i].first_name + " " + res[i].last_name;
//       employeeArr.push(employeeStr);
//     }
//     inquirer
//       .prompt({
//         name: "employee",
//         type: "list",
//         message: "Which employee needs a new manager?",
//         choices: employeeArr,
//       },
//       {
//         name: "manager",
//         type: "list",
//         message: "Who is the new manager for this employee?",
//         choices: employeeArr
//       })
//       .then((answer) => {
//         const employeeID = parseInt(answer.employee.split(" ")[0]);
//         const managerID = parseInt(answer.manager.split(" ")[0]);
//         let query = "UPDATE employee SET ? WHERE ?";

//         connection.query(query, [{manager_id},{id: employeeID}], function (err, res) {
//           if (err) throw err;
//         });
//         console.log("Employee manager has been updated.");
//         questions();
//       });
//   });
// }

// function viewDepartmentBudget() {

//   const departmentArr = [];
//   connection.query("SELECT * FROM department", function (err, res) {
//     for (let i = 0; i < res.length; i++) {
//       let departmentStr =
//         res[i].id + " " + res[i].name;

//       departmentArr.push(departmentStr);
//     }
//     inquirer
//       .prompt({
//         name: "departmentBudget",
//         type: "list",
//         message: "Please select which department's budget you would like to view",
//         choices: departmentArr,
//       })
//       .then((answer) => {
//         const departmentID = parseInt(answer.departmentBudget.split(" ")[0]);

//         let query = "SELECT * FROM role WHERE ?";

//         connection.query(query, { department_id: departmentID }, function (err, res) {
//           if (err) throw err;
//           // Do the math function to add all the employee's salarys into one object.  Will need to get employee array likely, so a JOIN will be needed?
//           console.log(`log out the total salary here`)
//         });
//       }
//   )}
// )}

questions();
