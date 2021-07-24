//
//
// Mock Functions
//

const mockTaggerConstructor = jest.fn();
const mockTaggerAddMeta = jest.fn();
const mockTaggerTag = jest.fn();

//
//
// Mock Helpers
//

const mockTaggerResultTags = () => {
  const result = mockTaggerTag.mock.calls.reduce((previous, current) => {
    const key = current[1];
    const value = current[2];
    // eslint-disable-next-line no-param-reassign
    previous[key] = value;
    return previous;
  }, {});
  return result;
};

//
//
// Mock Class
//

const Tagger = class {
  constructor() {
    mockTaggerConstructor();
  }

  // eslint-disable-next-line class-methods-use-this
  addMeta(resource) {
    mockTaggerAddMeta(resource);
  }

  // eslint-disable-next-line class-methods-use-this
  tag(resource, key, value) {
    mockTaggerTag(resource, key, value);
  }
};

//
//
// Assign Mock
//

jest.mock("../util/Tagger", () => Tagger);

//
//
// Export
//

module.exports = {
  mockTaggerConstructor,
  mockTaggerAddMeta,
  mockTaggerTag,
  mockTaggerResultTags,
};
