const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const CartSchema = new Schema({
  user_id: {
    type: ObjectId,
  },
  pro_id: {
    type: ObjectId,
  },
  pro_quatity: {
    type: Number,
  },
});

const Cart = (module.exports = mongoose.model("cart", CartSchema));
