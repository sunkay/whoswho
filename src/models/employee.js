const AWS = require("aws-sdk");
const config = require("../config");

AWS.config.update({
  region: config.dynamodb.region,
  endpoint: config.dynamodb.endpoint
});

var dynamodb = new AWS.DynamoDB();

module.exports = {
  /**
   * Uses Dynamodb Scan employees table
   * @param {Int} limit (default = 5)
   */
  getEmployees(limit = 5) {
    return dynamodb.scan({ TableName: "employees", Limit: limit }).promise();
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
