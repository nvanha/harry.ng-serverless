const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const deleteWork = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  await dynamodb
    .delete({
      TableName: "WorksTable",
      Key: { id },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ message: "Work Deleted", id }),
  };
};

module.exports = {
  handler: middy(deleteWork).use(httpJsonBodyParser()),
};
