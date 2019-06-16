const fs = require("fs");
const path = require("path");

const fileops = require("../src/save");
global.console = { log: jest.fn(), error: jest.fn() };

function createTestDir() {
  // create test directory if it does not exist
  if (!fs.existsSync(fileops.testDir)) {
    fs.mkdir(fileops.testDir, err => {
      if (err) {
        console.log(err);
      }
    });
  }
}

function removeTestDataDir() {
  const path = fileops.testDir;
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

describe("Testing IO", () => {
  beforeAll(async done => {
    await createTestDir();
    done();
  });

  beforeEach(async done => {
    await createTestDir();
    done();
  });

  afterEach(async done => {
    await removeTestDataDir();
    done();
  });

  afterAll(async done => {
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
