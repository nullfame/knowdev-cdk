---
to: src/util/__tests__/<%= name %>.spec.js
---
const <%= name %> = require("../<%= name %>");

//
//
// Mock constants
//

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

describe("<%= Name %> util", () => {
  it("Works", async () => {
    const response = <%= name %>();
    console.log("response :>> ", response);
    expect(response).toBeDefined();
  });
});
