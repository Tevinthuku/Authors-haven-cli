const axios = require("axios");

const getAllArticles = () => {
  return axios
    .get("https://ah-premier-staging.herokuapp.com/api/articles/")
    .then(data => {
      console.log(data.data);
    });
};

module.exports = {
  getAllArticles
};
