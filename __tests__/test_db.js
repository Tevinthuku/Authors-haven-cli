import {
  saveArticleToDb,
  readArticleFromDb,
  mongoconnectionhoc
} from "../src/db";

describe("insert", () => {
  test("should return inner function with ({ db, client }) as params", async () => {
    const callback = jest.fn();
    const article = { slug: "interesting-article", title: "none" };
    const dbObject = {
      collection: collectionname => ({
        insertOne: documentObj =>
          Promise.resolve({
            message: "New message here"
          })
      })
    };
    const connectionobj = {};
    saveArticleToDb(article, callback)({
      client: connectionobj,
      db: dbObject
    }).then(() => {
      expect(callback).toBeCalled();
    });
  });

  test("should read article from db", done => {
    const article = { slug: "interesting-article-2", title: "none" };
    const callback = (result, client, db) => {
      expect(result).toEqual({ ...article, _id: article.slug });
      done();
    };

    const documentObj = {
      collection: collectionname => ({
        findOne: param => Promise.resolve({ ...article, _id: article.slug })
      })
    };

    readArticleFromDb("interesting-article-2", callback)({
      client: {},
      db: documentObj
    });
  });

  test("should return an error if an article is not found", done => {
    const slug = "interesting-article-3";
    const callback = (result, client, db) => {
      expect(result).toEqual(`Article with slug ${slug} not found in db`);
      done();
    };

    const documentObj = {
      collection: collectionname => ({
        findOne: param => Promise.resolve(null)
      })
    };
    readArticleFromDb(slug, callback)({
      client: {},
      db: documentObj
    });
  });

  test("should only save 1 instance of an article to db", async done => {
    const callback = (result, client, db) => {
      expect(result).toBe("⚠️  ⚠️  Cannot save article to db twice");
      done();
    };
    const mockArticle = {
      _id: "some-article-id",
      slug: "some_article_id",
      name: "John"
    };

    const dbObject = {
      collection: collectionname => ({
        insertOne: documentObj =>
          Promise.reject({
            message: "New message here"
          })
      })
    };

    saveArticleToDb(mockArticle, callback)({
      client: {},
      db: dbObject
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
