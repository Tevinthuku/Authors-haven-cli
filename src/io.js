import fs from "fs";
import path from "path";

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

lib.readFile = function({ dir, file, callback, testing }) {
  let destination = testing ? lib.testDir : lib.baseDir + dir + "/";
  let fullpath = destination + file + ".json";

  fs.readFile(fullpath, "utf8", (err, data) => {
    if (err) {
      callback(`Cannot read file ${file}.json, it does not exist.`);
    } else {
      callback(JSON.parse(data));
    }
  });
};

export default lib;
