const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const AdminSchema = new Schema({
  admin_username: {
    type: String,
    required: [true, "Username is required"],
  },
  admin_password: {
    type: String,
    required: [true, "Password is required"],
  },
  admin_fristname: {
    type: String,
  },
  admin_name: {
    type: String,
  },
  admin_lastname: {
    type: String,
  },
  admin_created_date: {
    type: Date,
    default: Date.now(),
  },
  user_status: {
    type: Boolean,
  },
  admin_status: {
    type: Boolean,
    default: true
  },
  user_pic: {
    type: String,
  },
});

const Admin = (module.exports = mongoose.model("admin", AdminSchema));
