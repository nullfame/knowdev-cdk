/* eslint-disable global-require, max-classes-per-file */
const lambda = require("@aws-cdk/aws-lambda");
const { TAG } = require("../util/constants");

const { mockTaggerResultTags } = require("../mocks/Tagger.mock");

//
//
// Mock constants
//

const MOCK = {
  CODE_FOLDER: "mockCodeFolder",
  DEFAULT_FILE_PREFIX: "mockFile",
  HANDLER: "mockFile.mockHandler",
  HANDLER_FUNCTION: "mockHandler",
  ID: "mockFunctionId",
  TAGS: {
    mockTagKey1: "mockTagValue1",
    mockTagKey2: "mockTagValue2",
  },
  THIS: "mockThis",
  TIMEOUT: 60,
  UNEXPECTED_KEY: "UNEXPECTED_KEY",
  UNEXPECTED_VALUE: "MOCK-unexpected_key",
};

//
//
// Mock modules
//

const mockFunction = jest.fn();
jest.mock("@aws-cdk/aws-lambda", () => ({
  ...jest.requireActual("@aws-cdk/aws-lambda"),
  Function: class {
    constructor(stack, name, properties, settings) {
      mockFunction(stack, name, properties, settings);
    }
  },
}));

//
//
// Mock environment
//

const DEFAULT_ENV = process.env;
beforeEach(() => {
  process.env = { ...process.env };
  jest.resetModules();
});
afterEach(() => {
  process.env = DEFAULT_ENV;
  jest.clearAllMocks();
});

//
//
// Run tests
//

describe("Lambda Function", () => {
  let lambdaFunction;
  beforeEach(() => {
    lambdaFunction = require("../lambda");
  });

  describe("Lambda Function Defaults", () => {
    it("Works", () => {
      const { app } = require("../core");
      lambdaFunction(
        MOCK.THIS,
        MOCK.ID,
        { timeout: MOCK.TIMEOUT },
        { codeFolder: MOCK.CODE_FOLDER }
      );
      const functionCallParams = mockFunction.mock.calls[0];
      expect(functionCallParams[0]).toBe(MOCK.THIS);
      expect(functionCallParams[1]).toBe(app);
      expect(functionCallParams[2]).toBe(MOCK.ID);
      const functionCallProperties = functionCallParams[3];
      expect(functionCallProperties).toBeObject();
    });

    describe("Code Parameter", () => {
      it("Ignores `code` if it is an object", () => {
        lambdaFunction(MOCK.THIS, MOCK.ID, {
          code: lambda.Code.asset(MOCK.CODE_FOLDER),
        });
        const functionCallParams = mockFunction.mock.calls[0];
        const functionCallProperties = functionCallParams[3];
        expect(functionCallProperties.code).toBeObject();
        expect(functionCallProperties.code.path).toBe(MOCK.CODE_FOLDER);
      });
      it("Uses `lambda.Code.asset` if `code` is string", () => {
        lambdaFunction(MOCK.THIS, MOCK.ID, {
          code: MOCK.CODE_FOLDER,
        });
        const functionCallParams = mockFunction.mock.calls[0];
        const functionCallProperties = functionCallParams[3];
        expect(functionCallProperties.code).toBeObject();
        expect(functionCallProperties.code.path).toBe(MOCK.CODE_FOLDER);
      });
      it("Uses codeFolder if `code` is missing", () => {
        const setLambdaFunctionDefaults = require("../util/setLambdaDefaults");
        setLambdaFunctionDefaults({}, { codeFolder: MOCK.CODE_FOLDER });
        lambdaFunction(MOCK.THIS, MOCK.ID);
        const functionCallParams = mockFunction.mock.calls[0];
        const functionCallProperties = functionCallParams[3];
        expect(functionCallProperties.code).toBeObject();
        expect(functionCallProperties.code.path).toBe(MOCK.CODE_FOLDER);
      });
      it("Defaults to 'src' if `code` is missing and no codeFolder", () => {
        lambdaFunction(MOCK.THIS, MOCK.ID);
        const functionCallParams = mockFunction.mock.calls[0];
        const functionCallProperties = functionCallParams[3];
        expect(functionCallProperties.code).toBeObject();
        expect(functionCallProperties.code.path).toBe("src");
      });
    });

    describe("Handler Parameter", () => {
      it("Leaves well-formed handlers alone", () => {
        lambdaFunction(MOCK.THIS, MOCK.ID, { handler: MOCK.HANDLER });
        const functionCallParams = mockFunction.mock.calls[0];
        const functionCallProperties = functionCallParams[3];
        expect(functionCallProperties).toContainEntry([
          "handler",
          MOCK.HANDLER,
        ]);
      });
      it("If there is not dot, assume index if no defaultFilePrefix", () => {
        lambdaFunction(MOCK.THIS, MOCK.ID, { handler: MOCK.HANDLER_FUNCTION });
        const functionCallParams = mockFunction.mock.calls[0];
        const functionCallProperties = functionCallParams[3];
        expect(functionCallProperties).toContainEntry([
          "handler",
          `index.${MOCK.HANDLER_FUNCTION}`,
        ]);
      });
      it("If there is not dot, assume defaultFilePrefix if set", () => {
        lambdaFunction(
          MOCK.THIS,
          MOCK.ID,
          { handler: MOCK.HANDLER_FUNCTION },
          { defaultFilePrefix: MOCK.DEFAULT_FILE_PREFIX }
        );
        const functionCallParams = mockFunction.mock.calls[0];
        const functionCallProperties = functionCallParams[3];
        expect(functionCallProperties).toContainEntry([
          "handler",
          MOCK.HANDLER,
        ]);
      });
      it("If no handler is passed, assume index.name", () => {
        lambdaFunction(MOCK.THIS, MOCK.ID);
        const functionCallParams = mockFunction.mock.calls[0];
        const functionCallProperties = functionCallParams[3];
        expect(functionCallProperties).toContainEntry([
          "handler",
          `index.${MOCK.ID}`,
        ]);
      });
    });

    describe("Tags Parameter", () => {
      it("Supplies default tags", () => {
        lambdaFunction(MOCK.THIS, MOCK.ID);
        expect(Object.keys(mockTaggerResultTags())).toIncludeAllMembers([
          TAG.KEY.BUILD_DATE,
          TAG.KEY.HANDLER,
        ]);
      });
      it("Accepts tags", () => {
        lambdaFunction(MOCK.THIS, MOCK.ID, { tags: MOCK.TAGS });
        const tags = mockTaggerResultTags();
        expect(tags).toContainEntries([
          ["mockTagKey1", MOCK.TAGS.mockTagKey1],
          ["mockTagKey2", MOCK.TAGS.mockTagKey2],
        ]);
      });
    });

    describe("Timeout Parameter", () => {
      it("Converts timeout in number to duration", () => {
        lambdaFunction(
          MOCK.THIS,
          MOCK.ID,
          { timeout: MOCK.TIMEOUT },
          { codeFolder: MOCK.CODE_FOLDER }
        );
        const functionCallParams = mockFunction.mock.calls[0];
        const functionCallProperties = functionCallParams[3];
        expect(functionCallProperties.timeout).toBeObject();
        expect(functionCallProperties.timeout.amount).toBe(MOCK.TIMEOUT);
      });
    });
  });
});
