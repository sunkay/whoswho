const { ApolloError } = require("apollo-server");

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
          throw new ApolloError("Unable to scan table...");
        });
    },
    allEmployees: (root, args) => {
      return employee
        .allEmployees(args.filter)
        .then(data => {
          var items = [];
          data.Items.forEach(item => {
            console.log(item)
            items.push(employee.getEmployeeJSON(item));
            console.log(items)
          })
          console.log(items)
          return items;
        })
        .catch(err => {
          console.error(
            "Unable to scan table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
          throw new ApolloError("Unable to scan table...");
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
          throw new ApolloError("Unable to scan table...");
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
          throw new ApolloError(`cannot find user ${args.id}`, 10, args);
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
          throw new ApolloError(`cannot find user ${args.id}`, 10, args);
        });
    }
  }
};
