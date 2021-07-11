const cdk = require("@aws-cdk/core");

const { TAG } = require("./constants");

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

const Tagger = class {
  constructor() {
    this.role = {};
    Object.values(TAG.ROLE).forEach((role) => {
      this.role[role] = (resource) => {
        this.tag(resource, TAG.KEY.ROLE, role);
        this.addMeta(resource);
      };
    });
  }

  // eslint-disable-next-line class-methods-use-this
  addMeta(resource) {
    cdk.Tags.of(resource).add(TAG.KEY.ACCOUNT, process.env.PROJECT_ACCOUNT);
    cdk.Tags.of(resource).add(TAG.KEY.ENV, process.env.PROJECT_ENV);
    cdk.Tags.of(resource).add(TAG.KEY.PROJECT, process.env.PROJECT_KEY);
  }

  // eslint-disable-next-line class-methods-use-this
  tag(resource, key, value) {
    cdk.Tags.of(resource).add(key, value);
  }
};

//
//
// Export
//

module.exports = Tagger;
