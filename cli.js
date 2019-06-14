const { getAllArticles, getSingleArticle } = require("./src/fetch");

const stats = (function(args) {
  const args_string = args.join(" ");
  switch (true) {
    case /^ah list$/.test(args_string):
      console.log("⏱️  ⏱️  Kindly wait as I fetch the articles available.");
      return getAllArticles();
    case /ah view/.test(args_string):
      console.log("⏱️  ⏱️ Kindly wait as we get your desired article.");
      getSingleArticle(args);
      return;
    default:
      console.log("Command not found");
  }
})(process.argv.slice(2));
