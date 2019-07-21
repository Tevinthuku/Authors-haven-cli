import fs from "fs";
import fileops from "../src/io";

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

function removeTestDataDir(path = fileops.testDir) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        removeTestDataDir(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

module.exports = {
  createTestDir,
  removeTestDataDir
};
