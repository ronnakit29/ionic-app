const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const FishSchema = new Schema({
  user_id: {
    type: ObjectId,
  },
  fish_name: {
    type: String,
  },
  fish_growth_time: {
    type: Number,
  },
  fish_price: {
    type: Number,
  },
});

const Fish = (module.exports = mongoose.model("Fish", FishSchema));
