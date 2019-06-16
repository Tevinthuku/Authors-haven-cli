const io = require("./io");
const { getSingleArticle } = require("./fetch");

const fetchandsave = (args, callback) => {
  getSingleArticle(args)
    .then(callback)
    .catch(console.log);
};

module.exports = {
  fetchandsave
};
