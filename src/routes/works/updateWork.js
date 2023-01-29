const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const updateWork = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id, image } = event.body;

  await dynamodb
    .update({
      TableName: "WorksTable",
      Key: { id },
      UpdateExpression: "set image = :image",
      ExpressionAttributeValues: {
        ":image": image,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Work Updated" }),
  };
};

module.exports = {
  handler: middy(updateWork).use(httpJsonBodyParser()),
};
