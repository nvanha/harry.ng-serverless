const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

require("dotenv").config();

const deleteImageWork = async (event) => {
  const fileKey = decodeURIComponent(event.pathParameters.fileKey);

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileKey,
  };

  const s3 = new AWS.S3();

  const deleteResult = await s3.deleteObject(params).promise();
  console.log("deleteResult: ", deleteResult);

  return {
    statusCode: 200,
    body: JSON.stringify(fileKey),
  };
};

module.exports = {
  handler: middy(deleteImageWork).use(httpJsonBodyParser()),
};
