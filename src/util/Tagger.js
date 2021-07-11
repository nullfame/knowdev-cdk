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
      };
    });
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
