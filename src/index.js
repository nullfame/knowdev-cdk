const { DURATION, TAG } = require("./util/constants");
const { tagger, VERSION } = require("./core");
const { stack } = require("./stack");

//
//
// Export
//

module.exports = {
  DURATION,
  stack,
  TAG,
  tagger,
  VERSION,
};
