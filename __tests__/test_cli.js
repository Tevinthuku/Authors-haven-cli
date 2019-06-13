const path = require("path");
const exec = require("child_process").exec;
const cmd = require("../cli");

jest.spyOn(global.console, "log");

function cli(args) {
  return new Promise(resolve => {
    exec(
      `node ${path.join(__dirname, "../cli.js")} ${args.join(" ")}`,
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
describe("The AH CLI", () => {
  it("should print the correct code", async () => {
    const a = await cli(["hello world"]);
    expect(a.code).toBe(0);
  });
});
