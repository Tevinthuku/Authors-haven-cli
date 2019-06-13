const path = require("path");
const exec = require("child_process").exec;
function cli(args) {
  return new Promise(resolve => {
    exec(
      `node ${path.join(__dirname, "./cli.js")} ${args.join(" ")}`,
      (error, stdout, stderr) => {
        resolve({
          code: error && error.code ? error.code : 0,
          error,
          stdout,
          stderr
        });
      }
    );
  });
}

module.exports = {
  cli
};
