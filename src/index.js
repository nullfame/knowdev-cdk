const { DURATION, TAG } = require("./util/constants");
const { version } = require("../package.json");
const Tagger = require("./util/Tagger");

//
//
// Export
//

module.exports = {
  DURATION,
  TAG,
  tagger: new Tagger(),
  VERSION: version,
};
