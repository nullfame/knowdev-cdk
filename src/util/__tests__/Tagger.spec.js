const Tagger = require("../Tagger");
const { TAG } = require("../constants");

//
//
// Mock constants
//

const MOCK = {
  ACCOUNT: "mockAccount",
  ENV: "mockEnv",
  PROJECT: "mockProject",
};

//
//
// Mock modules
//

const mockCdkTagsOfResource = jest.fn();
const mockCdkTagsAdd = jest.fn();
jest.mock("@aws-cdk/core", () => ({
  ...jest.requireActual("@aws-cdk/core"),
  Tags: {
    of: (resource) => {
      mockCdkTagsOfResource(resource);
      return {
        add: (key, value) => {
          mockCdkTagsAdd(key, value);
        },
      };
    },
  },
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

describe("Tagger util", () => {
  it("Works", () => {
    const tagger = new Tagger();
    expect(tagger).toBeObject();
  });

  it("Is a class", () => {
    expect(Tagger).toBeClass();
  });

  it("Has tag function", () => {
    const tagger = new Tagger();
    expect(tagger.tag).toBeFunction();

    const resource = "testResource";
    const key = "testKey";
    const value = "testValue";
    tagger.tag(resource, key, value);
    expect(mockCdkTagsOfResource).toHaveBeenCalledWith(resource);
    expect(mockCdkTagsAdd).toHaveBeenCalledWith(key, value);
  });

  it("Has role tag convenience functions", () => {
    const tagger = new Tagger();
    expect(tagger.role.api).toBeFunction();

    const resource = "TEST_RESOURCE";
    tagger.role.api(resource);
    expect(mockCdkTagsOfResource).toHaveBeenCalledWith(resource);
    expect(mockCdkTagsAdd).toHaveBeenCalledWith(TAG.KEY.ROLE, TAG.ROLE.API);
  });

  it("Role tag applies meta", () => {
    const tagger = new Tagger();
    expect(tagger.role.api).toBeFunction();

    process.env.PROJECT_ACCOUNT = MOCK.ACCOUNT;
    process.env.PROJECT_ENV = MOCK.ENV;
    process.env.PROJECT_KEY = MOCK.PROJECT;

    tagger.role.api("TEST_RESOURCE");
    expect(mockCdkTagsAdd).toHaveBeenCalledWith(TAG.KEY.ACCOUNT, MOCK.ACCOUNT);
    expect(mockCdkTagsAdd).toHaveBeenCalledWith(TAG.KEY.ENV, MOCK.ENV);
    expect(mockCdkTagsAdd).toHaveBeenCalledWith(TAG.KEY.PROJECT, MOCK.PROJECT);
  });
});
