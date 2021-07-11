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
    const resourcesByRole = Object.values(TAG.ROLE).reduce(
      (accumulator, role) => {
        accumulator[role] = [];
        this.role[role] = (resource) => {
          this.tag(resource, TAG.KEY.ROLE, role);
        };
        return accumulator;
      },
      {}
    );

    // Store all private members in a WeakMap
    this.private = new WeakMap();
    this.private.set(this, {
      resourcesByRole,
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
