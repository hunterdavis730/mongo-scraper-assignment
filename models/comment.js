const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  note: String
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
