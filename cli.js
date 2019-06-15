const io = require("./src/save");
const { getAllArticles, getSingleArticle } = require("./src/fetch");
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
    case /ah view/.test(args_string):
      console.log("⏱️  ⏱️ Kindly wait as we get your desired article.");
      getSingleArticle(args);
      return;
    default:
      console.log("Command not found");
  }
})(process.argv.slice(2));
