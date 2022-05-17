const inquirer = require("inquirer");
const db = require("./db");
require("console.table");

init();

function init() {
	inquirer
		.prompt({
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
		})
		.then((res) => {
			switch (res.task) {
				case "view all departments":
					viewAlldepartments();
					break;
				case "view all roles":
					veiwAllroles();
					break;
				case "view all employees":
					viewAllemployees();
					break;
				case "Add a department":
					newDepartment();
					break;
				case "Add a role":
					newRole();
					break;
				case "Add an employee":
					newEmployee();
					break;
				case "Update an employee's role":
					break;
				default:
					process.exit();
					break;
			}
		});
}

function viewAlldepartments() {
	db.findDepartments()
		.then(([data]) => {
			console.table(data);
		})
		.then(() => init());
}
function veiwAllroles() {
	db.findRoles()
		.then(([data]) => {
			console.table(data);
		})
		.then(() => init());
}
function viewAllemployees() {
	db.findEmployees()
		.then(([data]) => {
			console.table(data);
		})
		.then(() => init());
}

function newEmployee() {
	db.findRole()
		.then(([rows]) => {
			let results = rows;
			const listrole = [];
			results.forEach((object) => {
				listrole.push({ name: object.name, value: object.id });
			});
			return listrole;
		})
		.then((listrole) => {
			inquirer
				.prompt([
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
						type: "list",
						name: "role",
						message: "Employee's role?",
						choices: listrole,
					},
					{
						type: "input",
						name: "manager",
						message: "Employee's manager.",
					},
				])
				.then(function (data) {
					init();
				});
		});
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
			db.addDepartment(depName).then(() => init());
		});
}

function newRole() {
	db.findDepartments()
		.then(([rows]) => {
			let results = rows;
			const listDepartment = [];
			results.forEach((object) => {
				listDepartment.push({ name: object.name, value: object.id });
			});
			return listDepartment;
		})
		.then((listDepartment) => {
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
						type: "list",
						name: "department_id",
						message: "What department does this role belong to?",
						choices: listDepartment,
					},
				])
				.then(function (data) {
					init();
				});
		});
}
