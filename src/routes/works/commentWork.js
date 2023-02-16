const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const updateWork = async (event) => {
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

  const commentListNew = [...commentListOld, commentItem];

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
    body: JSON.stringify({ message: "Comment Successfully" }),
  };
};

module.exports = {
  handler: middy(updateWork).use(httpJsonBodyParser()),
};
