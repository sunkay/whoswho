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
    },
    deleteEmployee: (_, args) => {
      console.log("deleteing employee with id: ", args.id, args.firstname);
      return employee
        .deleteEmployee(args.id, args.firstname)
        .then(data => {
          return;
        })
        .catch(err => {
          console.error(
            "Unable to delete employee: ",
            args.id,
            ". Error JSON:",
            JSON.stringify(err, null, 2)
          );
          return {};
        });
    },
    deleteManager: (_, args) => {
      console.log("deleteing manager with id: ", args.id, args.firstname);
      return manager
        .deleteManager(args.id, args.firstname)
        .then(data => {
          return;
        })
        .catch(err => {
          console.error(
            "Unable to delete manager: ",
            args.id,
            ". Error JSON:",
            JSON.stringify(err, null, 2)
          );
          return {};
        });
    },
  }
};
