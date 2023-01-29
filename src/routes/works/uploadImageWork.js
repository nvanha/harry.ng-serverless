const AWS = require("aws-sdk");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

require("dotenv").config();

const uploadImageWork = async (event) => {
  const { file, name, type } = event.body;

  const base64File = file;
  const decodedFile = Buffer.from(
    base64File.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `images/${new Date().toISOString()}-${name}`,
    Body: decodedFile,
    ContentType: type,
  };

  const s3 = new AWS.S3();

  const upload = await s3.upload(params).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(upload),
  };
};

module.exports = {
  handler: middy(uploadImageWork).use(httpJsonBodyParser()),
};
