const connection = require("./connection");

class Data {
	constructor(connection) {
		this.connection = connection;
	}

	findDepartments() {
		return this.connection.promise().query("SELECT * FROM department;");
	}

	findRoles() {
		// id, title, salary , department name..look into left join
		return this.connection.promise().query("");
	}

	findEmployees() {
		// employee id, firstname, last name, the department name, their Role title, Salary, manager full name. you will have to join all tables and employee will need to be joined..look into renaming the tables in join.
		return this.connection.promise().query("");
	}
}

module.exports = new Data(connection);
