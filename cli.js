import fs from "fs";
import io from "./src/io";
import {
  getAllArticles,
  getSingleArticle,
  getFilteredArticles
} from "./src/fetch";
import { fetchandsave } from "./src";
import {
  saveArticleToDb,
  readArticleFromDb,
  mongoconnectionhoc
} from "./src/db";

const cli = (function(args) {
  const args_string = args.join(" ");
  switch (true) {
    case /^list$/.test(args_string):
      console.log("⏱️  ⏱️  Kindly wait as I fetch the articles available.");
      return getAllArticles();
    case /^ah view.*--save$/.test(args_string):
      fs.mkdir(`${io.baseDir}articles`, { recursive: true }, err => {
        if (err) console.log(err);
      });
      fetchandsave(args, data => {
        return data
          ? io.create({
              dir: "articles",
              file: data.article.slug,
              data,
              callback: console.log
            })
          : {};
      });
      return;
    case /^view.*--offline$/.test(args_string):
      io.readFile({
        dir: "articles",
        file: args[1],
        callback: console.log
      });
      return;
    case /^db.*--save/.test(args_string):
      fetchandsave(args, data => {
        mongoconnectionhoc(
          saveArticleToDb(data.article, (result, client, db) => {
            console.log(result);
            client.close();
          })
        );
      });
      return;
    case /^db.*--read/.test(args_string):
      mongoconnectionhoc(
        readArticleFromDb(args[1], (result, client, db) => {
          console.log(result);
          client.close();
        })
      );
      return;
    case /^search/.test(args_string):
      console.log("⏱️  ⏱️ Kindly wait as we get your desired article.");
      return getFilteredArticles(args);
    case /^help$/.test(args_string):
      console.log(
        `ℹ        Checkout
        https://github.com/Tevinthuku/Authors-haven-cli#commands-available 
        to see what commands are available`
      );
      return;
    case /view/.test(args_string):
      console.log("⏱️  ⏱️ Kindly wait as we get your desired article.");
      getSingleArticle(args);
      return;
    default:
      console.log("Command not found");
  }
})(process.argv.slice(2));
