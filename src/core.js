const cdk = require("@aws-cdk/core");

const { TAG } = require("./util/constants");
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
tagger.tag(app, TAG.KEY.BUILD_TIME, String(now.getTime()));
tagger.tag(app, TAG.KEY.BUILD_DATE, now.toISOString());
tagger.tag(app, TAG.KEY.KNOWDEV_CDK, version);
tagger.addMeta(app);

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
