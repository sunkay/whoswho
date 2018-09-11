var AWS = require("aws-sdk");
const config = require("../config");

AWS.config.update({
  region: config.dynamodb.region,
  endpoint: config.dynamodb.endpoint
});

var dynamodb = new AWS.DynamoDB();

var employees = {
  TableName: "employees",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }, //Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

var managers = {
  TableName: "managers",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }, //Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(employees, function(err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});

dynamodb.createTable(managers, function(err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});

dynamodb.listTables({}, function(err, data) {
  if (err) {
    console.error(
      "Unable to list tables. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("Listing Tables: JSON:", JSON.stringify(data, null, 2));
  }
});
