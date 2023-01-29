const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const addWork = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const {
    titleThumb = "",
    titleFull = "",
    stack = [],
    category = [],
    // image
    content = "",
    linkWebsite = "",
    linkRepo = "",
  } = event.body;
  const createdAt = new Date().toISOString();
  const id = v4();

  const newWork = {
    id,
    createdAt,
    titleThumb,
    titleFull,
    stack,
    category,
    content,
    linkWebsite,
    linkRepo,
    image: [],
  };

  await dynamodb
    .put({
      TableName: "WorksTable",
      Item: newWork,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(newWork),
  };
};

module.exports = {
  handler: middy(addWork).use(httpJsonBodyParser()),
};
