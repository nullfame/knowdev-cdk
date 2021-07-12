const lambda = require("@aws-cdk/aws-lambda");

//
//
// Local Variables
//

// "Settings" - how the library functions internally
const lambdaDefaultSettings = {
  codeFolder: "src",
  defaultFilePrefix: "index",
};

// "Properties" - what is passed to CDK
const lambdaDefaultProperties = {
  memorySize: 512,
  runtime: lambda.Runtime.NODEJS_14_X,
  timeout: 30,
};

//
//
// Main
//

const setLambdaDefaults = (properties, settings) => {
  Object.assign(lambdaDefaultProperties, properties);
  Object.assign(lambdaDefaultSettings, settings);
};

//
//
// Export
//

module.exports = setLambdaDefaults;
module.exports.lambdaDefaultProperties = lambdaDefaultProperties;
module.exports.lambdaDefaultSettings = lambdaDefaultSettings;
