const fs = require("fs");
const path = require("path");

const lib = {};

lib.baseDir = path.join(__dirname, "../data/");
lib.testDir = path.join(__dirname, "../testdata/");

lib.create = function({ dir, file, data, callback, testing }) {
  // create a new file and append data to it.
  const destination = testing ? lib.testDir : lib.baseDir + dir + "/";
  let fullpath = destination + file + ".json";
  fs.writeFile(fullpath, JSON.stringify(data), err => {
    return err
      ? callback(`Error writing to file ${file}.json`)
      : callback("🙌 success");
  });
};

module.exports = lib;
