/* eslint-disable class-methods-use-this, max-classes-per-file  */
const cloneDeep = require("lodash.clonedeep");

const { TAG } = require("../util/constants");
const stack = require("../stack");

//
//
// Mock constants
//

const MOCK = {
  PACKAGE_JSON: {
    name: "mockName",
    version: "mockVersion",
  },
};

//
//
// Mock modules
//

const mockTemplateConstructor = jest.fn();
const mockTemplateConstructorName = jest.fn();
class MockTemplate {
  constructor(app, stackName, options) {
    mockTemplateConstructor(app, stackName, options);
    mockTemplateConstructorName(stackName);
  }
}

const mockTaggerAddMeta = jest.fn();
const mockTaggerTag = jest.fn();
jest.mock("../core", () => ({
  ...jest.requireActual("../core"),
  tagger: new (class MockTagger {
    addMeta(resource) {
      mockTaggerAddMeta(resource);
    }

    tag(resource, key, value) {
      mockTaggerTag(resource, key, value);
    }
  })(),
}));

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
  jest.clearAllMocks();
});

//
//
// Run tests
//

describe("Stack", () => {
  it("Works", () => {
    const response = stack(MockTemplate, MOCK.PACKAGE_JSON);
    expect(response).toBeInstanceOf(MockTemplate);
  });
  it("Calls tagger functions", () => {
    const response = stack(MockTemplate, MOCK.PACKAGE_JSON);
    expect(mockTaggerAddMeta).toBeCalledWith(response);
    expect(mockTaggerTag).toBeCalledWith(
      response,
      TAG.KEY.VERSION,
      MOCK.PACKAGE_JSON.version
    );
  });
  it("Doesn't tag version if it doesn't exist", () => {
    const packageJson = cloneDeep(MOCK.PACKAGE_JSON);
    delete packageJson.version;
    stack(MockTemplate, packageJson);
    expect(mockTaggerTag).not.toBeCalled();
  });
  it("Creates a name from the package when environment is not set", () => {
    stack(MockTemplate, MOCK.PACKAGE_JSON);
    expect(mockTemplateConstructorName).toBeCalledWith(
      `cdk-${MOCK.PACKAGE_JSON.name}`
    );
  });
  it("Creates a name from the environment when set", () => {
    process.env.PROJECT_ACCOUNT = "mockAccount";
    process.env.PROJECT_ENV = "mockEnv";
    process.env.PROJECT_KEY = "mockKey";
    stack(MockTemplate, MOCK.PACKAGE_JSON);
    expect(mockTemplateConstructorName).toBeCalledWith(
      `cdk-mockAccount-mockEnv-mockKey`
    );
  });
});
