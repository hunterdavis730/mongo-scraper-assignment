const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  _creator: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  note: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
