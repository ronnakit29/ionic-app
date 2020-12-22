const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const GuideSchema = new Schema({
  user_id: {
    type: String,
    required: [true, "User ID is required"],
  },
  guide_priority: {
    type: Number,
    required: [true, "Priority is required"],
  },
  guide_header: {
    type: String,
    required: [true, "Priority Header"],
  },
  guide_detail: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
});

const Guide = (module.exports = mongoose.model("guide", GuideSchema));
