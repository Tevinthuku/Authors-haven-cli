const { getAllArticles } = require("./src/fetch");

const stats = (function(args) {
  switch (args.join()) {
    case "--list":
      console.log("⏱️  ⏱️  Kindly wait as I fetch the articles available.");
      return getAllArticles();
    default:
      console.log("Command not found");
  }
})(process.argv.slice(2));
