const fs = require("fs");
const path = require("path");

const lib = {};

lib.baseDir = path.join(__dirname, "../data/");
lib.testDir = path.join(__dirname, "../testdata/");

lib.create = function({ dir, file, data, callback, testing }) {
  // create a new file and append data to it.
  const destination = testing ? lib.testDir : lib.baseDir + dir + "/";
  fs.open(destination + file + ".json", "wx", function(err, fileDescriptor) {
    if (!err & fileDescriptor) {
      // write data in string version.
      var strData = JSON.stringify(data);
      fs.writeFile(fileDescriptor, strData, function(err) {
        if (!err) {
          fs.close(fileDescriptor, function(err) {
            if (!err) {
              callback("🙌 success");
            }
          });
        }
      });
    } else {
      callback(`Error creating  file ${file}.json, it may already exist.`);
    }
  });
};

module.exports = lib;
