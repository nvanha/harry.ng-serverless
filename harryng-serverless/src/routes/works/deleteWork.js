const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

require("dotenv").config();

const deleteWork = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  await dynamodb
    .delete({
      TableName: `WorksTable-${process.env.CURRENT_ENV}`,
      Key: { id },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ message: "Work Deleted" }),
  };
};

module.exports = {
  handler: middy(deleteWork).use(httpJsonBodyParser()),
};
