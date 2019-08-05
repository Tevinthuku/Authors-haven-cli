require("dotenv").config();
const { MongoClient } = require("mongodb");
const assert = require("assert");

const url = process.env.NODE_ENV
  ? process.env.MONGO_TEST_URI
  : process.env.MONGO_URI;

export const saveArticleToDb = (article, callback) => ({ client, db }) => {
  return db
    .collection("articles")
    .insertOne({ ...article, _id: article.slug })
    .then(data =>
      callback("🏪 Article saved to database successfully", client, db)
    )
    .catch(err =>
      callback("⚠️  ⚠️  Cannot save article to db twice", client, db)
    );
};

export const readArticleFromDb = (slug, callback) => ({ client, db }) => {
  const articles = db.collection("articles");
  return articles.findOne({ _id: slug }).then(result => {
    return result
      ? callback(result, client, db)
      : callback(`Article with slug ${slug} not found in db`, client, db);
  });
};

export const mongoconnectionhoc = fn =>
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db();
    fn({ client, db });
  });
