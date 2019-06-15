const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = app => {
  app.get("/", (req, res) => {
    // axios.get("https://www.nytimes.com/section/world").then(data => {
    //   const $ = cheerio.load(data.data);

    //   $("div.css-13mho3u ol li").each((i, element) => {
    //     var result = {};
    //     let urlBase = "https://www.nytimes.com";
    //     result.title = $(element)
    //       .children("div")
    //       .children("div")
    //       .attr("class", "css-4jyr1y")
    //       .children("a")
    //       .children("h2")
    //       .text();
    //     result.summary = $(element)
    //       .children("div")
    //       .children("div")
    //       .attr("class", "css-4jyr1y")
    //       .children("a")
    //       .children("p")
    //       .text();
    //     result.link = urlBase.concat(
    //       $(element)
    //         .children("div")
    //         .children("div")
    //         .attr("class", "css-4jyr1y")
    //         .children("a")
    //         .attr("href")
    //     );

    //     db.Article.create(result)
    //       .then(resp => {
    //         console.log(resp);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   });
    // });
    db.Article.find({}).then(resp => {
      console.log("database response");
      console.log(resp);

      res.render("index", { article: resp });
    });
  });
};
