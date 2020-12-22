const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const TimelineSchema = new Schema({
  user_id: {
    type: ObjectId,
  },
  timeline_day: {
    type: Number,
  },
  timeline_title: {
    type: String,
  },
  timeline_detail: {
    type: String,
  },
  timeline_youtube: {
    type: String,
  },
  fish_type: {
    type: ObjectId,
  },
  product_reccomand: {
    type: Array,
  },
});

const Timeline = (module.exports = mongoose.model("Timeline", TimelineSchema));
