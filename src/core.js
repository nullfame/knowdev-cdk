const cdk = require("@aws-cdk/core");

const { version } = require("../package.json");
const Tagger = require("./util/Tagger");

//
//
// Setup
//

// Declare
const app = new cdk.App();
const tagger = new Tagger();

// Tag
const now = new Date();
cdk.Tags.of(app).add("buildTime", String(now.getTime()));
cdk.Tags.of(app).add("knowDevCdk", version);

//
//
// Export
//

module.exports = {
  app,
  cdk,
  tagger,
  VERSION: version,
};
