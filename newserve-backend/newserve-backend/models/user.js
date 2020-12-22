const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const UserSchema = new Schema({
  reference_user_id: { type: String },
  user_username: {
    type: String,
    required: [true, "Username is required"],
  },
  user_password: {
    type: String,
    required: [true, "Password is required"],
  },
  user_prefix: {
    type: String,
  },
  user_firstname: {
    type: String,
  },
  user_lastname: {
    type: String,
  },
  user_tel: {
    type: String,
  },
  user_created_date: {
    type: Date,
    default: Date.now(),
  },
  user_role: {
    type: String,
    default: "user",
  },
  user_status: {
    type: Boolean,
    default: true,
  },
  user_pic: {
    type: String,
    default: "user.png",
  },
  address: {
    type: Object,
  },
  user_token: {
    type: String,
  },
  user_token_exp: {
    type: String,
  },
});

const User = (module.exports = mongoose.model("user", UserSchema));
