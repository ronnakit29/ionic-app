const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const CatelogorySchema = {
  category_text: {
    type: String,
    required: true
  },
};

const Catelogory = (module.exports = mongoose.model(
  "catelogory",
  CatelogorySchema
));
