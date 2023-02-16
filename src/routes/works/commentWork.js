const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const commentWork = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id, content } = event.body;

  const commentItem = {
    content,
    created_at: new Date().toISOString(),
  };

  const result = await dynamodb
    .get({
      TableName: "WorksTable",
      Key: { id },
    })
    .promise();

  const workItem = result.Item;

  const commentListOld = workItem.commentsList || [];

  const commentListNew = [commentItem, ...commentListOld];

  await dynamodb
    .update({
      TableName: "WorksTable",
      Key: { id },
      UpdateExpression: "set commentsList = :commentsList",
      ExpressionAttributeValues: {
        ":commentsList": commentListNew,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "Comment Successfully" }),
  };
};

module.exports = {
  handler: middy(commentWork).use(httpJsonBodyParser()),
};
