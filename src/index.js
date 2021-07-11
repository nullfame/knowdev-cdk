const { DURATION, TAG } = require("./util/constants");
const { cdk, tagger, VERSION } = require("./core");
const { stack } = require("./stack");

//
//
// Export
//

module.exports = {
  cdk,
  DURATION,
  stack,
  TAG,
  tagger,
  VERSION,
};
