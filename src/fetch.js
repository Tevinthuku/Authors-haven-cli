const axios = require("axios");

const getAllArticles = () => {
  return axios
    .get("https://ah-premier-staging.herokuapp.com/api/articles/")
    .then(data => {
      console.log(data.data);
    })
    .catch(err => {
      console.log("❗❗ Something went wrong fetching the articles.");
    });
};

const getSingleArticle = async args => {
  return axios
    .get(`http://ah-premier-staging.herokuapp.com/api/articles/${args[2]}`)
    .then(data => {
      console.log(data.data);
      return data.data;
    })
    .catch(err => {
      console.log("❗❗ Something went wrong fetching the article.");
    });
};

const getFilteredArticles = async args => {
  const queryparams = args.slice(2).join("&");
  return axios
    .get(`https://ah-premier-staging.herokuapp.com/api/articles?${queryparams}`)
    .then(data => {
      console.log(data.data);
    })
    .catch(err => {
      console.log("❗❗ Something went wrong fetching the filtered articles.");
    });
};

module.exports = {
  getAllArticles,
  getSingleArticle,
  getFilteredArticles
};
