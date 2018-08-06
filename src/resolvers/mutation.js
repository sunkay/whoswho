var employee = require("../models/employee");

module.exports = {
  Mutation: {
    addEmployee: (root, emp) => {
      return employee
        .addEmployee(emp)
        .then(data => {
          return emp;
        })
        .catch(err => {
          console.error(
            "Unable to add employee",
            emp.title,
            ". Error JSON:",
            JSON.stringify(err, null, 2)
          );
          return {};
        });
    }
  }
};
