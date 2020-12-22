const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const OrderSchema = new Schema({
  user_id: {
    type: ObjectId,
  },
  tra_id: {
    type: ObjectId,
  },
  order_date: {
    type: Date,
    default: Date.now(),
  },
  order_status: {
    type: Number,
  },
  order_pic: {
    type: String,
  },
});

const Order = (module.exports = mongoose.model("Order", OrderSchema));
