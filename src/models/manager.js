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
  getManagers(limit = 5) {
    return dynamodb.scan({ TableName: "managers", Limit: limit }).promise();
  },

  getManager(id) {
    //console.log("ID", id);
    var params = {
      ExpressionAttributeValues: {
        ":id": {
          S: id
        }
      },
      KeyConditionExpression: "id = :id",
      TableName: "managers"
    };
    return dynamodb.query(params).promise();
  },

  addManager(emp) {
    return docClient
      .put({
        TableName: "managers",
        ConditionExpression: "attribute_not_exists(id)",
        Item: emp
      })
      .promise();
  },

  deleteManager(id, firstname) {
    var params = {
      TableName: "managers",
      Key: {
        id: id,
        firstname: firstname
      }
    };
    return docClient.delete(params).promise();
  },


  /**
   * Return simplified JSON representation of the dynamodb Item
   *
   * @param {DynamoDB Item} emp
   */
  getManagerJSON(emp) {
    return {
      id: emp.id.S,
      firstname: emp.firstname.S,
      lastname: emp.lastname.S
    };
  }
};
