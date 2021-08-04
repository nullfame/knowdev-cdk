const cdk = require("@aws-cdk/core");

//
//
// Export
//

module.exports = {
  DURATION: {
    THIRTY_SECONDS: cdk.Duration.seconds(30),
    ONE_MINUTE: cdk.Duration.seconds(60),
    TWO_MINUTES: cdk.Duration.seconds(60 * 2),
    FIVE_MINUTES: cdk.Duration.seconds(60 * 5),
    TEN_MINUTES: cdk.Duration.seconds(60 * 10),
    FIFTEEN_MINUTES: cdk.Duration.seconds(60 * 15),
  },
  TAG: {
    KEY: {
      ACCOUNT: "account",
      BUILD_DATE: "buildDate",
      BUILD_TIME: "buildTime",
      ENV: "env",
      HANDLER: "handler",
      KNOWDEV_CDK: "knowDevCdk",
      PROJECT: "project",
      ROLE: "role",
      VERSION: "version",
    },
    ROLE: {
      API: "api",
      COMMAND: "command",
      META: "meta",
      PROCESSING: "processing",
      ORCHESTRATION: "orchestration",
      STORAGE: "storage",
      WEB: "web",
    },
  },
};
