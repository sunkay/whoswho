const AWS = require("aws-sdk");
const config = require("../config");

AWS.config.update({
  region: config.dynamodb.region,
  endpoint: config.dynamodb.endpoint
});

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
  /**
   * Uses Dynamodb Scan employees table
   * @param {Int} limit (default = 5)
   */
  getEmployees(limit = 50) {
    return docClient.scan({ TableName: "employees", Limit: limit }).promise();
  },

  allEmployees(filter){
    var params = {
      TableName: "employees",
      FilterExpression: "contains(#firstname, :firstname) OR \
                         contains(#lastname, :lastname) OR \
                         contains(#firstname, :firstnameUpper) OR \
                         contains(#lastname, :lastnameUpper)",
      ExpressionAttributeNames: {
        "#firstname": "firstname",
        "#lastname": "lastname"
      },
      ExpressionAttributeValues: {
        ":firstname": filter.toLowerCase(),
        ":lastname": filter.toLowerCase(),
        ":firstnameUpper": filter.toUpperCase(),
        ":lastnameUpper": filter.toUpperCase(),
      }
    };

    return docClient.scan(params).promise();
  },

  getEmployee(id) {
    console.log("ID", id);
    var params = {
      ExpressionAttributeValues: {
        ":id": id
      },
      KeyConditionExpression: "id = :id",
      TableName: "employees"
    };
    return docClient.query(params).promise();
  },

  addEmployee(emp) {
    return docClient
      .put({
        TableName: "employees",
        ConditionExpression: "attribute_not_exists(id)",
        ReturnValues: "ALL_OLD",
        Item: emp
      })
      .promise();
  },

  updateEmployee(emp){
    return docClient
      .update({
        TableName: "employees",
        Key: {
          id: emp.id,
        },
        UpdateExpression: "set firstname = :fn, lastname = :ln",
        ReturnValues: "ALL_NEW",
        ExpressionAttributeValues:{
          ":fn": emp.firstname,
          ":ln": emp.lastname
        }
      })
      .promise();
  },

  deleteEmployee(id, firstname) {
    var params = {
      TableName: "employees",
      Key: {
        id: id,
      }
    };
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
