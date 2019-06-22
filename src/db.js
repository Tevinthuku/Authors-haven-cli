require("dotenv").config();
const { MongoClient } = require("mongodb");
const assert = require("assert");

const url = process.env.NODE_ENV
  ? process.env.MONGO_TEST_URI
  : process.env.MONGO_URI;

const saveArticleToDb = (article, callback) => {
  return ({ client, db }) => {
    db.collection("articles")
      .insertOne({ ...article, _id: article.slug })
      .then(data =>
        callback("🏪 Article saved to database successfully", client, db)
      )
      .catch(err =>
        callback("⚠️  ⚠️  Cannot save article to db twice", client, db)
      );
  };
};

const readArticleFromDb = (slug, callback) => {
  return ({ client, db }) => {
    const articles = db.collection("articles");
    articles.findOne({ _id: slug }).then(result => {
      return result
        ? callback(result, client, db)
        : callback(`Article with slug ${slug} not found in db`, client, db);
    });
  };
};

const mongoconnectionhoc = fn => {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db();
    fn({ client, db });
  });
};

// mongoconnectionhoc(saveArticleToDb({}));
module.exports = {
  saveArticleToDb,
  readArticleFromDb,
  mongoconnectionhoc
};
