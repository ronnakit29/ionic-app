const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const ProductSchema = new Schema({
  tra_id: {
    type: ObjectId,
    required: true,
  },
  pro_name: {
    type: String,
    required: true,
  },
  pro_detail: {
    type: String,
  },
  category_id: {
    type: ObjectId,
    required: true,
  },
  pro_stock: {
    type: Number,
    default: 0,
  },
  pro_status: {
    type: Boolean,
    default: true,
  },
  pro_image: {
    type: String,
  },
  pro_cost: {
    type: Number,
    default: 0,
  },
  pro_price: {
    type: Number,
    default: 0,
  },
});

const Product = (module.exports = mongoose.model("Product", ProductSchema));
