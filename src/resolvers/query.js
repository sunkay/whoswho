const employee = require("../models/employee");
const manager = require("../models/manager");

module.exports = {
  Query: {
    employees: () => {
      return employee
        .getEmployees()
        .then(data => {
          var items = [];
          data.Items.forEach(item => {
            items.push(employee.getEmployeeJSON(item));
          });
          return items;
        })
        .catch(err => {
          console.error(
            "Unable to scan table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
          return [];
        });
    },
    managers: () => {
      return manager
        .getManagers()
        .then(data => {
          var items = [];
          data.Items.forEach(item => {
            items.push(manager.getManagerJSON(item));
          });
          return items;
        })
        .catch(err => {
          console.error(
            "Unable to scan table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
          return [];
        });
    },
    employee: (root, args) => {
      return employee
        .getEmployee(args.id)
        .then(data => {
          return employee.getEmployeeJSON(data.Items[0]);
        })
        .catch(err => {
          console.error(
            "Unable to get employee. Error JSON:",
            JSON.stringify(err, null, 2)
          );
          return [];
        });
    },
    manager: (root, args) => {
      return manager
        .getManager(args.id)
        .then(data => {
          return manager.getManagerJSON(data.Items[0]);
        })
        .catch(err => {
          console.error(
            "Unable to get manager. Error JSON:",
            JSON.stringify(err, null, 2)
          );
          return [];
        });
    }
  }
};
