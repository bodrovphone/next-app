const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requiredString = {
  type: String,
  required: true
};

const blogSchema = new Schema({
  userId: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  title: requiredString,
  subTitle: requiredString,
  story: requiredString,
  author: requiredString,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  status: { type: String, default: "draft" }
});

module.exports = mongoose.model("Blog", blogSchema);
