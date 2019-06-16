const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = app => {
  app.get("/", (req, res) => {
    axios.get("https://www.nytimes.com/section/world").then(data => {
      const $ = cheerio.load(data.data);

      $("div.css-13mho3u ol li").each((i, element) => {
        var result = {};
        let urlBase = "https://www.nytimes.com";
        result.title = $(element)
          .children("div")
          .children("div")
          .attr("class", "css-4jyr1y")
          .children("a")
          .children("h2")
          .text();
        result.summary = $(element)
          .children("div")
          .children("div")
          .attr("class", "css-4jyr1y")
          .children("a")
          .children("p")
          .text();
        result.link = urlBase.concat(
          $(element)
            .children("div")
            .children("div")
            .attr("class", "css-4jyr1y")
            .children("a")
            .attr("href")
        );

        db.Article.create(result)
          .then(resp => {
            console.log(resp);
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
    db.Article.find({}).then(resp => {
      console.log(resp);
      res.render("index", { article: resp });
    });
  });

  app.get("/article/notes/:id", (req, res) => {
    db.Comment.find({
      _creator: req.params.id
    })
      .then(resp => {
        console.log("comments");
        console.log(resp);
        res.send(resp);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post("/article/note/:id", (req, res) => {
    var comment = req.body;
    comment._creator = req.params.id;
    db.Comment.create(comment)
      .then(resp => {
        console.log(resp);
        db.Comment.find({
          _creator: req.params.id
        })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.delete("/comment/delete/:id", (req, res) => {
    db.Comment.deleteOne({
      _id: req.params.id
    })
      .then(resp => {
        console.log(resp);
        res.send(resp);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
