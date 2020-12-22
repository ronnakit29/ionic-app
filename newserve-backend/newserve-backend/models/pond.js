const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const PondSchema = {
  user_id: {
    type: ObjectId,
  },
  p_name: {
    type: String,
  },
  fish_type: {
    type: ObjectId,
  },
  p_width: {
    type: Number,
  },
  p_length: {
    type: Number,
  },
  p_height: {
    type: Number,
  },
  p_new: {
    type: Number,
  },
  p_cost: {
    type: Number,
  },
  p_date: {
    type: Date,
    default: Date.now(),
  },
  p_fish_date: {
    type: Date,
  },
  p_number_fish: {
    type: Number,
  },
  p_number_dead: {
    type: Number,
  },
  p_number_success: {
    type: Number,
  },
};

const Pond = (module.exports = mongoose.model("Pond", PondSchema));
