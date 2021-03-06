import fs from "fs";
import path from "path";

import fileops from "../src/io";

import { removeTestDataDir, createTestDir } from "../testutils/utils";
global.console = { log: jest.fn(), error: jest.fn() };

describe("Testing IO", () => {
  beforeEach(async done => {
    await createTestDir();
    done();
  });

  afterEach(async done => {
    await removeTestDataDir();
    done();
  });

  test("should write to file and close the file successfully if file is not present", done => {
    const successCallback = data => {
      expect(data).toBe("🙌 success");
      done();
    };

    fileops.create({
      file: "article",
      data: { article: {} },
      callback: successCallback,
      testing: true
    });
  });
});
