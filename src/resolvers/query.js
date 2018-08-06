const employee = require("../models/employee");

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
      return axios
        .get(`http://localhost:3000/managers`)
        .then(resp => resp.data);
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
      return axios
        .get(`http://localhost:3000/managers/${args.id}`)
        .then(resp => resp.data);
    }
  }
};
