const { ApolloError } = require("apollo-server");

const employee = require("../models/employee");
const manager = require("../models/manager");

module.exports = {
  Query: {
    employees: () => {
      return employee
        .getEmployees()
        .then(data => {
         return data.Items;
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
      //console.log("args",args);]
      if(args.filter.length == 0) return [];
      return employee
        .allEmployees(args.filter)
        .then(data => {
          //console.log("items",data.Items);
          return data.Items;
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
          return data.Items[0];
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
