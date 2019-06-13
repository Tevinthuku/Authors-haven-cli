const { cli } = require("../utils");

jest.spyOn(global.console, "log");

describe("The AH CLI", () => {
  it("should print the correct code", async () => {
    const a = await cli(["hello world"]);
    expect(a.code).toBe(0);
    expect(a.stdout).toEqual("Command not found\n");
  });
  it("should return list of articles with the --list flag", async () => {
    const a = await cli(["--list"]);
    expect(a.code).toBe(0);
  });
});
