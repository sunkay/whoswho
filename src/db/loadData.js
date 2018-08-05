const AWS = require("aws-sdk");
const config = require("../config");

AWS.config.update({
  region: config.dynamodb.region,
  endpoint: config.dynamodb.endpoint
});

const employeeData = [
  {
    id: "1",
    firstname: "Bill",
    lastname: "Clinton"
  },
  {
    id: "2",
    firstname: "George",
    lastname: "Bush"
  }
];

const docClient = new AWS.DynamoDB.DocumentClient();

console.log("Adding sample data into DynamoDB. Please wait.");

employeeData.forEach(emp => {
  docClient.put(
    {
      TableName: "Employees",
      Item: {
        id: emp.id,
        firstname: emp.firstname,
        lastname: emp.lastname
      }
    },
    (err, data) => {
      if (err) {
        console.error(
          "Unable to add employee",
          emp.title,
          ". Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log("Added item: " + emp.id);
      }
    }
  );
});
