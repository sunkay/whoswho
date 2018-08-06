var employee = require("../models/employee");
var manager = require("../models/manager");

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
    },

    addManager: (root, emp) => {
      console.log(emp);
      return manager
        .addManager(emp)
        .then(data => {
          return emp;
        })
        .catch(err => {
          console.error(
            "Unable to add manager",
            emp.title,
            ". Error JSON:",
            JSON.stringify(err, null, 2)
          );
          return {};
        });
    }
  }
};
