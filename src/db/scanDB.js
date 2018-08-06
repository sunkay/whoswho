const employees = require("../models/employee");
const manager = require("../models/manager");

employees
  .getEmployees()
  .then(data => {
    console.log(data.Items);
  })
  .catch(err => {
    console.error(
      "Unable to scan table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  });

manager
  .getManagers()
  .then(data => {
    console.log(data.Items);
  })
  .catch(err => {
    console.error(
      "Unable to scan table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  });
