USE employee_trackerDB;

-- Department Seeds
INSERT INTO department (id, name)
VALUES (1, "Engineering");

INSERT INTO department (id, name)
VALUES (2, "Marketing");

INSERT INTO department (id, name)
VALUES (3, "Human Resources");

INSERT INTO department (id, name)
VALUES (4, "IT");

-- Role Seeds
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Engineer", 65000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Engineer Supervisor", 80000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Sales Representative", 55000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Sales Manager", 70000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Human Resources Coordinator", 48000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Human Resources Supervisor", 59000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Tech Support", 60000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "IT Supervisor", 75000, 4);

-- Employee Seeds
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Alex", "Armstrong", 2, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Edward", "Elric", 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Roy", "Mustang", 6, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Alphonse", "Elric", 8, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Winry", "Rockbell", 1, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Ling", "Yao", 1, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Riza", "Hawkeye", 1, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "King", "Bradley", 3, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Jean", "Havoc", 3, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "Maria", "Ross", 3, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (11, "Selim", "Bradley", 5, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (12, "Izumi", "Curtis", 5, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (13, "Vato", "Falman", 5, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (14, "Tim", "Marcoh", 7, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (15, "Kain", "Fuery", 7, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (16, "May", "Chang", 7, 4);