const connection = require("../config/connection");

class Data {
	constructor(connection) {
		this.connection = connection;
	}

	findDepartments() {
		return this.connection
			.promise()
			.query("SELECT * FROM department order by id ASC;");
	}
findRole(){
	return this.connection.promise().query("SELECT title From role order by id ASC")
}
	findRoles() {
		// id, title, salary , department name..look into left join
		return this.connection
			.promise()
			.query(
				"SELECT role.id , role.title , department.name AS Department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;"
			);
	}

	findEmployees() {
		// employee id, firstname, last name, the department name, their Role title, Salary, manager full name. you will have to join all tables and employee will need to be joined..look into renaming the tables in join.
		return this.connection.promise().query(`SELECT employee.id AS ID,
		employee.first_name , 
		employee.last_name ,
		role.title AS Role,
		department.name AS Department,
		role.salary,
		CONCAT (manager.first_name, " ", manager.last_name) AS Manager
		FROM employee
		LEFT JOIN role ON employee.role_id = role.id
		LEFT JOIN department ON role.department_id = department.id
		LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`);
	}

	addDepartment(department) {
		return this.connection
			.promise()
			.query("INSERT INTO department(name) VALUES (?);", department);
	}
}

module.exports = new Data(connection);
