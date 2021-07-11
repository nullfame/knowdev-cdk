const { app, tagger } = require("./core");
const { TAG } = require("./util/constants");

//
//
// Constants
//

//
//
// Helper Functions
//

function createStackName(packageJson) {
  const prefix = "cdk";

  let stackName = prefix;
  if (process.env.PROJECT_ACCOUNT) {
    stackName = `${stackName}-${process.env.PROJECT_ACCOUNT}`;
  }
  if (process.env.PROJECT_ENV) {
    stackName = `${stackName}-${process.env.PROJECT_ENV}`;
  }
  if (process.env.PROJECT_KEY) {
    stackName = `${stackName}-${process.env.PROJECT_KEY}`;
  }
  if (stackName !== prefix) return stackName;

  return `${prefix}-${packageJson.name}`;
}

//
//
// Main
//

const stackFunction = (Template, packageJson, options = {}) => {
  const stackName = createStackName(packageJson);

  const stack = new Template(app, stackName, options);
  tagger.addMeta(stack);
  if (packageJson.version) {
    tagger.tag(stack, TAG.KEY.VERSION, packageJson.version);
  }
  return stack;
};

//
//
// Export
//

module.exports = stackFunction;
