const inquirer = require("inquirer");
const data = require("./db");
const mysql2 = require("mysql2");
const db = require("./db");
require("console.table");

function init() {
	inquirer.prompt({
		type: "list",
		name: "task",
		message: "what would you like to do",
		choices: [
			"view all departments",
			"view all roles",
			"view all employees",
			"Add a department",
			"Add a role",
			"Add an employee",
			"Update an employee's role",
			"exit",
		],
	});
}
function newEmployee() {
	inquirer.prompt([
		{
			type: "input",
			name: "firstName",
			message: "Employee's first name?",
		},
		{
			type: "input",
			name: "lastName",
			message: "Employee's last name?",
		},
		{
			type: "input",
			name: "role",
			message: "Employee's role?",
		},
		{
			type: "input",
			name: "manager",
			message: "Employee's manager.",
		},
	]);
}
function newDepartment() {
	inquirer
		.prompt([
			{
				type: "input",
				name: "newDept",
				message: "Department you would like to add.",
			},
		])
		.then(function (data) {
			const depName = data.newDept;
			const sql = "INSERT INTO department(name) VALUES (?)";
			db.query(sql, depName, function (err, resulets) {
				if (err) {
					console.log(err);
				}
				console.table("Department Added");
				init();
			});
		});
}

function newRole() {
	inquirer
		.prompt([
			{
				type: "input",
				name: "role",
				message: "role to add",
			},
			{
				type: "input",
				name: "salary",
				message: "salary of job",
			},

			{
				type: "input",
				name: "Department",
				message: "Department",
			},
		])
		.then(function (data) {
			const dept = data.dept;
			const deptId = "SELECT id FROM `department` WHERE name = ?";
			const finalId = db.query(deptId, dept, function (err, results) {
				if (err) {
					console.log(err);
				}
				console.table(results);
				const role = data.role;
				const salary = data.salary;
			});
		});
}
