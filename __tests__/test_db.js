import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

import {
  saveArticleToDb,
  readArticleFromDb,
  mongoconnectionhoc
} from "../src/db";

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  test("should return inner function with ({ db, client }) as params", async () => {
    const callback = jest.fn();
    const articles = db.collection("articles");
    const article = { slug: "interesting-article", title: "none" };
    saveArticleToDb(article, callback)({
      client: connection,
      db: db
    });
    const insertedArticle = await articles.findOne({
      _id: "interesting-article"
    });

    expect(insertedArticle).toEqual({ ...article, _id: "interesting-article" });
    expect(callback).toBeCalled();
  });

  test("should read article from db", done => {
    const article = { slug: "interesting-article-2", title: "none" };
    const callback = (result, client, db) => {
      expect(result).toEqual({ ...article, _id: article.slug });
      done();
    };
    db.collection("articles").insertOne(
      { ...article, _id: article.slug },
      function(err, r) {}
    );

    readArticleFromDb("interesting-article-2", callback)({
      client: connection,
      db: db
    });
  });

  test("should return an error if an article is not found", done => {
    const slug = "interesting-article-3";
    const callback = (result, client, db) => {
      expect(result).toEqual(`Article with slug ${slug} not found in db`);
      done();
    };

    readArticleFromDb(slug, callback)({
      client: connection,
      db: db
    });
  });

  test("should only save 1 instance of an article to db", async done => {
    const callback = (result, client, db) => {
      expect(result).toBe("⚠️  ⚠️  Cannot save article to db twice");
      done();
    };
    const articles = db.collection("articles");

    const mockArticle = {
      _id: "some-article-id",
      slug: "some_article_id",
      name: "John"
    };
    await articles.insertOne(mockArticle);
    saveArticleToDb(mockArticle, callback)({
      client: connection,
      db: db
    });
  });

  test("should call callback once connected in hoc", done => {
    const callback = ({ client, db }) => {
      expect(typeof client).toBe("object");
      expect(typeof db).toBe("object");
      client.close();
      done();
    };

    mongoconnectionhoc(callback);
  });
});
