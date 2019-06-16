const { createTestDir, removeTestDataDir } = require("../testutils/utils");
const io = require("../src/io");

describe("Test readFile", () => {
  beforeEach(async done => {
    await createTestDir();
    done();
  });

  afterEach(async done => {
    await removeTestDataDir();
    done();
  });

  test("should read from file", done => {
    const successCallback = data => {
      expect(data).toStrictEqual({ article: {} });
      done();
    };

    const createFileCallback = jest.fn();

    io.create({
      file: "updatearticle",
      data: { article: {} },
      callback: createFileCallback,
      testing: true
    });

    io.readFile({
      file: "updatearticle",
      callback: successCallback,
      testing: true
    });
  });

  test("should give back error if file does not exist", done => {
    const failureCallback = data => {
      expect(data).toBe(
        "Cannot read file updatearticle.json, it does not exist."
      );
      done();
    };
    io.readFile({
      file: "updatearticle",
      callback: failureCallback,
      testing: true
    });
  });
});
