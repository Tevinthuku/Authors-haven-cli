import axios from "axios";
import { fetchandsave } from "../src";

jest.spyOn(axios, "get");

global.console = { log: jest.fn(), error: jest.fn() };

test("get and save single article successfully", () => {
  const callbackfn = data => {
    expect(data).toBe({ article: {} });
    done();
  };
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        article: {}
      }
    })
  );

  fetchandsave(["ah", "view", "article-slug", "--save"], callbackfn);
});
