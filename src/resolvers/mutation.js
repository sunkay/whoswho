const { ApolloError } = require("apollo-server");

var employee = require("../models/employee");
var manager = require("../models/manager");

module.exports = {
  Mutation: {
    addEmployee: (root, args) => {
      console.log("input:", args)
      return employee
        .addEmployee(args.input)
        .then(data => {
          return {id: args.input.id};
        })
        .catch(err => {
          console.error(
            "Unable to add employee",
            args.input,
            ". Error JSON:",
            JSON.stringify(err, null, 2)
          );
          throw new ApolloError("Unable to add employee", 20, err);
        });
    },

    addManager: (root, args) => {
      console.log(args.input);
      return manager
        .addManager(args.input)
        .then(data => {
          return {id: args.input.id};
        })
        .catch(err => {
          console.error(
            "Unable to add manager",
            emp.title,
            ". Error JSON:",
            JSON.stringify(err, null, 2)
          );
          throw new ApolloError("Unable to add manager", 20, err);
        });
    },
    deleteEmployee: (_, args) => {
      console.log("deleteing employee with id: ", args.id, args.firstname);
      return employee
        .deleteEmployee(args.id, args.firstname)
        .then(data => {
          return args;
        })
        .catch(err => {
          console.error(
            "Unable to delete employee: ",
            args.id,
            ". Error JSON:",
            JSON.stringify(err, null, 2)
          );
          throw new ApolloError("Unable to delete employee", 20, err);
        });
    },
    deleteManager: (_, args) => {
      console.log("deleteing manager with id: ", args.id, args.firstname);
      return manager
        .deleteManager(args.id, args.firstname)
        .then(data => {
          return args;
        })
        .catch(err => {
          console.error(
            "Unable to delete manager: ",
            args.id,
            ". Error JSON:",
            JSON.stringify(err, null, 2)
          );
          throw new ApolloError("Unable to add manager", 20, err);
        });
    },
  }
};
