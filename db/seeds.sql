USE employee_trackerDB;

-- Employee Seeds
INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, "Tom", "Overland", 1, 2);

-- Role Seeds
INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (1, "Engineer", 65000, 1);

-- Department Seeds
INSERT INTO department
    (id, name)
VALUES
    (1, "Marketing");