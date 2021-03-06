import axios from "axios";

import {
  getAllArticles,
  getSingleArticle,
  getFilteredArticles
} from "../src/fetch";

jest.spyOn(axios, "get");
global.console = { log: jest.fn() };

test("should get all articles successfully", () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: {
        data: []
      }
    })
  );

  getAllArticles().then(data => {
    expect(console.log).toBeCalled();
    expect(console.log).toHaveBeenCalledWith({ data: [] });
  });
});

test("should resolve to an error when something goes wrong", () => {
  axios.get.mockImplementation(() =>
    Promise.reject({
      error: {}
    })
  );

  getAllArticles().then(data => {
    expect(console.log).toBeCalled();
    expect(console.log).toHaveBeenCalledWith(
      "❗❗ Something went wrong fetching the articles."
    );
  });
});

test("should get a single article successfully", () => {
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        article: {}
      }
    })
  );

  getSingleArticle(["ah view single-article"]).then(data => {
    expect(console.log).toBeCalled();
    expect(console.log).toHaveBeenCalledWith({ article: {} });
  });
});

test("should raise an error when getting article is unsuccessful", () => {
  axios.get.mockImplementationOnce(() =>
    Promise.reject({
      error: {}
    })
  );

  getSingleArticle(["ah view single-article"]).then(data => {
    expect(console.log).toBeCalled();
    expect(console.log).toHaveBeenCalledWith(
      "❗❗ Something went wrong fetching the article."
    );
  });
});

test("should retrieve list of articles upon filtering", () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: {
        data: {
          count: 0,
          next: null,
          prev: null,
          results: []
        }
      }
    })
  );
  getFilteredArticles(["ah", "search", "title=tev", "author=benson"]).then(
    data => {
      expect(console.log).toBeCalled();
      expect(console.log).toHaveBeenCalledWith({
        data: {
          count: 0,
          next: null,
          prev: null,
          results: []
        }
      });
    }
  );
});

test("should return an error when there is an issue retrieving the filtered articles", () => {
  axios.get.mockImplementationOnce(() =>
    Promise.reject({
      error: {}
    })
  );

  getFilteredArticles(["ah", "search", "title=tev", "author=benson"]).then(
    data => {
      expect(console.log).toBeCalled();
      expect(console.log).toHaveBeenCalledWith(
        "❗❗ Something went wrong fetching the filtered articles."
      );
    }
  );
});
