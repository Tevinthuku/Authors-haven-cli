const io = require("./src/io");
const {
  getAllArticles,
  getSingleArticle,
  getFilteredArticles
} = require("./src/fetch");
const { fetchandsave } = require("./src");

const saveToFileCallback = data => {
  io.create({
    dir: "articles",
    file: data.article.slug,
    data,
    callback: console.log
  });
};

const stats = (function(args) {
  const args_string = args.join(" ");
  switch (true) {
    case /^ah list$/.test(args_string):
      console.log("⏱️  ⏱️  Kindly wait as I fetch the articles available.");
      return getAllArticles();
    case /^ah view.*--save$/.test(args_string):
      fetchandsave(args, saveToFileCallback);
      return;
    case /^ah view.*--offline$/.test(args_string):
      io.readFile({
        dir: "articles",
        file: args[2],
        callback: console.log
      });
      return;
    case /^ah search/.test(args_string):
      console.log("⏱️  ⏱️ Kindly wait as we get your desired article.");
      return getFilteredArticles(args);
    case /^ah help$/.test(args_string):
      console.log(
        `ℹ        Checkout
        https://github.com/Tevinthuku/Authors-haven-cli#commands-available 
        to see what commands are available`
      );
      return;
    case /ah view/.test(args_string):
      console.log("⏱️  ⏱️ Kindly wait as we get your desired article.");
      getSingleArticle(args);
      return;
    default:
      console.log("Command not found");
  }
})(process.argv.slice(2));
