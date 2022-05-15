const connection = require("./connection");

class Data {
	constructor(connection) {
		this.connection = connection;
	}

	findDepartments() {
		return this.connection.promise().query('SELECT * FROM department;');
	}

	findRoles() {
		// id, title, salary , department name..look into left join
		return this.connection.promise().query("SELECT role.id AS 'ID', role.title AS 'Title', department.name AS 'Department', role.salary AS 'Salary' FROM role LEFT JOIN department ON role.department.id = department.id'",);
	}

	findEmployees() {
		// employee id, firstname, last name, the department name, their Role title, Salary, manager full name. you will have to join all tables and employee will need to be joined..look into renaming the tables in join.
		return this.connection.promise().query('SELECT employee.id AS ID,
		employee.first_name AS "First Name", 
		employee.last_name AS "Last Name",
		empRole.title AS "Role",
		department.depName AS "Department",
		empRole.salary AS "Salary",
		CONCAT (manager.first_name, " ", manager.last_name) AS "Manager"
		FROM employee
		LEFT JOIN role ON employee.role_id = role.id
		LEFT JOIN department ON role.department_id = department.id
		LEFT JOIN employee AS manager ON employee.manager_id = manager.id,');
	}
}

module.exports = new Data(connection);
