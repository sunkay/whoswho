const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
const typeDefs = require("./schema/schema");
const config = require("./config");
const employees = require("./models/employee");

const resolvers = {
  Query: {
    employees: () => {
      return employees
        .getEmployees()
        .then(data => {
          var items = [];
          data.Items.forEach(item => {
            items.push(employees.getEmployeeJSON(item));
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
      return axios
        .get(`http://localhost:3000/managers`)
        .then(resp => resp.data);
    },
    employee: (root, args) => {
      return employees
        .getEmployee(args.id)
        .then(data => {
          return employees.getEmployeeJSON(data.Items[0]);
        })
        .catch(err => {
          console.error(
            "Unable to get employee. Error JSON:",
            JSON.stringify(err, null, 2)
          );
          return [];
        });
      /*
      return axios
        .get(`http://localhost:3000/employees/${args.id}`)
        .then(resp => resp.data);
        */
    },
    manager: (root, args) => {
      return axios
        .get(`http://localhost:3000/managers/${args.id}`)
        .then(resp => resp.data);
    }
  },

  Mutation: {
    addEmployee(_, args) {
      console.log(" args: ", args);
      return;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Start our server with our port config
const url = config.server.url;
server
  .listen({ port: config.server.port })
  .then(({ url }) => console.log(`🚀 app running at ${url}`));
