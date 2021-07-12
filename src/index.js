const { DURATION, TAG } = require("./util/constants");
const { cdk, tagger, VERSION } = require("./core");
const stack = require("./stack");
const setLambdaDefaults = require("./util/setLambdaDefaults");

//
//
// Export
//

module.exports = {
  cdk,
  DURATION,
  setLambdaDefaults,
  stack,
  TAG,
  tagger,
  VERSION,
};
