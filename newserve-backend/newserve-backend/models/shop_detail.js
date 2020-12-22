const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const validator = require("validator");

const ShopDetail = new Schema({
    //_id >>?
    _id: {
        type: String
    },
    shop_name: {
        type: String,
    },
    shop_detail: {
        type:
            String,
    },
    shop_tel: {
        type:
            String
    }
});

const Shop = (module.exports = mongoose.model("Shop", ShopDetail));
