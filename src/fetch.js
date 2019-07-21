const axios = require("axios");

export const getAllArticles = () => {
  return axios
    .get("https://ah-premier-staging.herokuapp.com/api/articles/")
    .then(data => {
      console.log(data.data);
    })
    .catch(err => {
      console.log("❗❗ Something went wrong fetching the articles.");
    });
};

export const getSingleArticle = async args => {
  return axios
    .get(`http://ah-premier-staging.herokuapp.com/api/articles/${args[2]}`)
    .then(data => {
      console.log(data.data);
      return data.data;
    })
    .catch(err => {
      const error = "❗❗ Something went wrong fetching the article.";
      console.log(error);
      return null;
    });
};

export const getFilteredArticles = async args => {
  const queryparams = args.slice(2).join("&");
  return axios
    .get(`https://ah-premier-staging.herokuapp.com/api/articles?${queryparams}`)
    .then(data => {
      console.log(data.data);
    })
    .catch(err => {
      const error = "❗❗ Something went wrong fetching the filtered articles.";
      console.log(error);
    });
};
