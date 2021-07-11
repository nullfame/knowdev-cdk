const { DURATION, TAG } = require("./util/constants");
const { tagger } = require("./core");
const { version } = require("../package.json");

//
//
// Export
//

module.exports = {
  DURATION,
  TAG,
  tagger,
  VERSION: version,
};
