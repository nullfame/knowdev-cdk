const { DURATION, TAG } = require("./util/constants");
const { cdk, tagger, VERSION } = require("./core");
const lambda = require("./lambda");
const stack = require("./stack");
const setLambdaDefaults = require("./util/setLambdaDefaults");

//
//
// Export
//

module.exports = {
  cdk,
  DURATION,
  lambda,
  setLambdaDefaults,
  stack,
  TAG,
  tagger,
  VERSION,
};
