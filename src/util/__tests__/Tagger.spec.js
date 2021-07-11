const Tagger = require("../Tagger");
const { TAG } = require("../constants");

//
//
// Mock constants
//

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
});
