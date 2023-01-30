const AWS = require("aws-sdk");

const fetchWorks = async () => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let worksList;

  try {
    const results = await dynamodb
      .scan({
        TableName: "WorksTable",
      })
      .promise();
    worksList = results.Items;
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
    body: JSON.stringify(worksList),
  };
};

module.exports = {
  handler: fetchWorks,
};
