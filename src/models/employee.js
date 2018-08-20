const AWS = require("aws-sdk");
const config = require("../config");

AWS.config.update({
  region: config.dynamodb.region,
  endpoint: config.dynamodb.endpoint
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
  /**
   * Uses Dynamodb Scan employees table
   * @param {Int} limit (default = 5)
   */
  getEmployees(limit = 5) {
    return dynamodb.scan({ TableName: "employees", Limit: limit }).promise();
  },

  allEmployees(filter){
    var params = {
      TableName: "employees",
      FilterExpression: "contains(#firstname, :firstname)",
      ExpressionAttributeNames: {
        "#firstname": "firstname",
      },
      ExpressionAttributeValues: {
        ":firstname": filter
      }
    };

    return docClient.scan(params).promise();
  },

  getEmployee(id) {
    //console.log("ID", id);
    var params = {
      ExpressionAttributeValues: {
        ":id": {
          S: id
        }
      },
      KeyConditionExpression: "id = :id",
      TableName: "employees"
    };
    return dynamodb.query(params).promise();
  },

  addEmployee(emp) {
    return docClient
      .put({
        TableName: "employees",
        ConditionExpression: "attribute_not_exists(id)",
        Item: emp
      })
      .promise();
  },

  deleteEmployee(id, firstname) {
    var params = {
      TableName: "employees",
      Key: {
        id: id,
        firstname: firstname
      }
    };
    console.log("params: ", params);
    return docClient.delete(params).promise();
  },

  /**
   * Return simplified JSON representation of the dynamodb Item
   *
   * @param {DynamoDB Item} emp
   */
  getEmployeeJSON(emp) {
    return {
      id: emp.id.S,
      firstname: emp.firstname.S,
      lastname: emp.lastname.S
    };
  }
};
