const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const OrderItemSchema = new Schema({
  order_id: { type: ObjectId },
  pro_id: { type: ObjectId },
  pro_quatity: { type: Number },
});

const OrderItem = (module.exports = mongoose.model(
  "OrderItem",
  OrderItemSchema
));
