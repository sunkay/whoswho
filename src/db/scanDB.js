const employees = require("../models/employee");

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
