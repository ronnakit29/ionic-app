const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const TrainerContentSchema = new Schema({
  tra_id: {
    type: ObjectId,
  },
  tc_upload_date: {
    type: Date,
    default: Date.now(),
  },
  tc_show_date: {
    type: Date,
    default: Date.now(),
  },
  tc_title: {
    type: String,
  },
  tc_content: {
    type: String,
  },
  tc_video_path: {
    type: String,
  },
  tc_priority: {
    type: Number,
  },
});

const TrainerContent = (module.exports = mongoose.model(
  "TrainerContent",
  TrainerContentSchema
));
