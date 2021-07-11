/* eslint-disable global-require */

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

describe("Index", () => {
  it("Has version constant", () => {
    const { VERSION } = require("../index");
    expect(VERSION).toBeString();
  });

  it("Returns instantiated tagger", () => {
    const { tagger } = require("../index");
    const Tagger = require("../util/Tagger");
    expect(tagger).toBeInstanceOf(Tagger);
  });
});
