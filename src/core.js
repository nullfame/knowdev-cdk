const { version } = require("../package.json");
const Tagger = require("./util/Tagger");

//
//
// Export
//

module.exports = {
  tagger: new Tagger(),
  VERSION: version,
};
