var express = require("express");
var mongoose = require("mongoose");
var app = express();

var PORT = process.env.PORT || 3000;

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());

app.use(express.static("public"));

require("./routes/apiRoutes")(app);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
