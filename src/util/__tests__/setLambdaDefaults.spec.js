const cloneDeep = require("lodash.clonedeep");

const setLambdaDefaults = require("../setLambdaDefaults");

const {
  lambdaDefaultProperties,
  lambdaDefaultSettings,
} = require("../setLambdaDefaults");

//
//
// Mock constants
//

const MOCK = {
  CODE_FOLDER: "mockCodeFolder",
  RUNTIME: "mockRuntime",
  TIMEOUT: 60,
};

//
//
// Mock modules
//

//
//
// Mock environment
//

const DEFAULT_ENV = process.env;
beforeEach(() => {
  process.env = { ...process.env };
});
afterEach(() => {
  process.env = DEFAULT_ENV;
});

//
//
// Run tests
//

describe("Set Lambda Defaults", () => {
  // Track original settings
  let originalProperties;
  let originalSettings;
  beforeEach(() => {
    originalProperties = cloneDeep(setLambdaDefaults.lambdaDefaultProperties);
    originalSettings = cloneDeep(setLambdaDefaults.lambdaDefaultSettings);
  });

  it("Works", () => {
    expect(lambdaDefaultProperties).toEqual(originalProperties);
    expect(lambdaDefaultSettings).toEqual(originalSettings);
  });
  it("Updates only what is passed", () => {
    setLambdaDefaults(
      {
        runtime: MOCK.RUNTIME,
        timeout: MOCK.TIMEOUT,
      },
      {
        codeFolder: MOCK.CODE_FOLDER,
      }
    );
    // The unchanged things are unchanged
    expect(lambdaDefaultProperties.code).toEqual(originalProperties.code);
    expect(lambdaDefaultProperties.memorySize).toEqual(
      originalProperties.memorySize
    );
    expect(lambdaDefaultSettings.defaultFilePrefix).toEqual(
      originalSettings.defaultFilePrefix
    );
    // The changed things are changed
    expect(lambdaDefaultProperties.runtime).toEqual(MOCK.RUNTIME);
    expect(lambdaDefaultProperties.timeout).toEqual(MOCK.TIMEOUT);
    expect(lambdaDefaultSettings.codeFolder).toEqual(MOCK.CODE_FOLDER);
  });
});
