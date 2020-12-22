const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const TrainerSchema = new Schema({
  tra_username: {
    type: String,
  },
  tra_password: {
    type: String,
  },
  tra_fristname: {
    type: String,
  },
  tra_name: {
    type: String,
  },
  tra_lastname: {
    type: String,
  },
  tra_tel: {
    type: String,
  },
  tra_created_date: {
    type: Date,
    default: Date.now(),
  },
  tra_status: {
    type: Number,
  },
  fish_type: {
    type: ObjectId,
  },
  tra_pic: {
    type: String,
  },
});

const Trainer = (module.exports = mongoose.model("Trainer", TrainerSchema));
