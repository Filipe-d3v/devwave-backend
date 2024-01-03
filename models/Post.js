const mongoose = require('../db/conn');

const { Schema } = mongoose;

const Post = mongoose.model(
  'Post',
  new Schema({
    subtitle: {
      type: String,
      required: true
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: 'Project',
      required: true
  },
  date: {
    type: String,
  },
    user: Object
  }, {timestamps: true})
);

module.exports = Post;