const AWS = require("aws-sdk");

require("dotenv").config();

const fetchWork = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  let workItem;

  try {
    const result = await dynamodb
      .get({
        TableName: `WorksTable-${process.env.CURRENT_ENV}`,
        Key: { id },
      })
      .promise();
    workItem = result.Item;
  } catch (error) {
    console.log("error: ", error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(workItem),
  };
};

module.exports = {
  handler: fetchWork,
};
