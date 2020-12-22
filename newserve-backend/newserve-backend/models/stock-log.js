const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const StockLogSchema = new Schema({
  pro_id: {
    type: ObjectId,
  },
  st_statuts: {
    type: Number,
  },
  st_date: {
    type: Date,
    default: Date.now(),
  },
  st_in: {
    type: Number,
  },
  st_out: {
    type: Number,
  },
  st_total: {
    type: Number,
  },
  st_outprice: {
    type: mongoose.Schema.Types.Decimal,
  },
  st_cost: {
    type: mongoose.Schema.Types.Decimal,
  },
});

const StockLog = (module.exports = mongoose.model("StockLog", StockLogSchema));
