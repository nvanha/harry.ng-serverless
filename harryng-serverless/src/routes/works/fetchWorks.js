const AWS = require("aws-sdk");

require("dotenv").config();

const fetchWorks = async () => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let worksList;

  try {
    const results = await dynamodb
      .scan({
        TableName: `WorksTable-${process.env.CURRENT_ENV}`,
      })
      .promise();
    worksList = results.Items;
  } catch (error) {
    console.log("error: ", error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(worksList),
  };
};

module.exports = {
  handler: fetchWorks,
};
