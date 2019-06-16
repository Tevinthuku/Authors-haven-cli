const io = require("./save");
const { getSingleArticle } = require("./fetch");

const fetchandsave = (args, callback) => {
  console.log(args)
  getSingleArticle(args)
    .then(callback)
    .catch(console.log);
};

module.exports = {
  fetchandsave
};
