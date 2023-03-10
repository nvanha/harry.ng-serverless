const AWS = require("aws-sdk");

const fetchWork = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  let workItem;

  try {
    const result = await dynamodb
      .get({
        TableName: "WorksTable",
        Key: { id },
      })
      .promise();
    workItem = result.Item;
  } catch (error) {
    console.log("error: ", error);
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workItem),
  };
};

module.exports = {
  handler: fetchWork,
};
