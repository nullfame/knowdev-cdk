const { Duration } = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");

const { TAG } = require("./util/constants");
const { app, tagger } = require("./core");
const {
  lambdaDefaultProperties,
  lambdaDefaultSettings,
} = require("./util/setLambdaDefaults");

//
//
// Constants
//

//
//
// Helper Functions
//

//
//
// Main
//

/* eslint-disable no-param-reassign */
const lambdaFunction = (stack, name, properties = {}, settings = {}) => {
  properties = { ...lambdaDefaultProperties, ...properties };
  settings = { ...lambdaDefaultSettings, ...settings };

  // Code: uses lambda.Code.asset if code is string
  if (typeof properties.code === "string") {
    properties.code = lambda.Code.asset(properties.code);
  }
  if (properties.code === undefined) {
    properties.code = lambda.Code.asset(settings.codeFolder);
  }

  // Handler: add prefix if missing
  if (
    typeof properties.handler === "string" &&
    !properties.handler.includes(".")
  ) {
    properties.handler = `${settings.defaultFilePrefix}.${properties.handler}`;
  }
  // Handler: add prefix if missing
  if (!properties.handler) {
    properties.handler = `${settings.defaultFilePrefix}.${name}`;
  }

  // Tags: Save to apply later (needs function to be created)
  const { tags } = properties;
  delete properties.tags; // Remove so it isn't passed

  // Timeout: if timeout is sent as number, convert to duration
  if (typeof properties.timeout === "number") {
    properties.timeout = Duration.seconds(properties.timeout);
  }

  // eslint-disable-next-line no-shadow
  const lambdaFunction = new lambda.Function(stack, app, name, properties);

  // Tags: Apply to function (remember, some are applied at stack level)
  // Always-present tags:
  tagger.tag(lambdaFunction, TAG.KEY.BUILD_DATE, new Date().toString());
  tagger.tag(lambdaFunction, TAG.KEY.HANDLER, name);
  // Depending on environment tags:
  // User-supplied custom tags:
  if (tags && typeof tags === "object") {
    Object.keys(tags).forEach((key) => {
      const value = tags[key];
      tagger.tag(lambdaFunction, key, value);
    });
  }

  return lambdaFunction;
};
/* eslint-enable no-param-reassign */

//
//
// Export
//

module.exports = lambdaFunction;
