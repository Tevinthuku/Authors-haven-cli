const io = require("./io");
const { getSingleArticle } = require("./fetch");

export const fetchandsave = (args, callback) => {
  getSingleArticle(args)
    .then(callback)
    .catch(console.log);
};
