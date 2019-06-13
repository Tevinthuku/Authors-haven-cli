// const cli = require("./cli");

// cli.init()
let path = require("path");
let exec = require("child_process").exec;

function cli(args, cwd) {
  return new Promise(resolve => {
    console.log(path.join(__dirname, "./cli.js"));
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

cli(["hello world"], "hel").then(console.log);
