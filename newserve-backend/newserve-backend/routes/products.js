const express = require("express");
const router = express.Router();
const { MONGODB } = require("../config.json");
const monk = require("monk")(MONGODB);
const ObjectId = monk.id;

/* Get Collection */
const Products = monk.get("products");
const Stock = monk.get("stock");

router.get("/", (req, res, next) => {
  const FROM = "catelogories";
  const LOCAL_FIELD = "category_id";
  const FOREIGN_FIELD = "_id";
  const AS = "category_data";
  Products.aggregate([
    {
      $lookup: {
        from: FROM,
        localField: LOCAL_FIELD,
        foreignField: FOREIGN_FIELD,
        as: AS,
      },
    },
  ]).then((response) => {
    response.forEach((item) => {
      item.category_data = item.category_data[0];
    });
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.get("/t/:user_id", (req, res, next) => {
  const FROM = "catelogories";
  const LOCAL_FIELD = "category_id";
  const FOREIGN_FIELD = "_id";
  const AS = "category_data";
  const MATCH = { tra_id: req.params.user_id };
  Products.aggregate([
    {
      $match: MATCH,
    },
    {
      $lookup: {
        from: FROM,
        localField: LOCAL_FIELD,
        foreignField: FOREIGN_FIELD,
        as: AS,
      },
    },
  ]).then((response) => {
    response.forEach((item) => {
      item.category_data = item.category_data[0];
    });
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.post("/add", (req, res, next) => {
  const DATA = {
    pro_stock: parseInt(req.body.pro_stock),
    pro_status: req.body.pro_status,
    pro_cost: req.body.pro_cost,
    pro_price: req.body.pro_price,
    tra_id: req.body.tra_id,
    pro_name: req.body.pro_name,
    pro_detail: req.body.pro_detail,
    category_id: req.body.category_id,
  };
  Products.insert(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
    Stock.insert({
      pro_id: response._id,
      stock_qty: response.pro_stock,
      stock_date: new Date(),
    });
  });
});
router.get("/:id", (req, res, next) => {
  const FROM = "catelogories";
  const LOCAL_FIELD = "category_id";
  const FOREIGN_FIELD = "_id";
  const AS = "category_data";
  const MATCH = { _id: ObjectId(req.params.id) };
  Products.aggregate([
    { $match: MATCH },
    {
      $lookup: {
        from: FROM,
        localField: LOCAL_FIELD,
        foreignField: FOREIGN_FIELD,
        as: AS,
      },
    },
  ]).then((response) => {
    response = response[0];
    response.category_data = response.category_data[0];
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.delete("/delete/:id", (req, res, next) => {
  const DATA = { _id: req.params.id };
  Products.remove(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.post("/edit", (req, res, next) => {
  const FIND_DATA = { _id: req.body._id };
  const UPDATE_DATA = {
    pro_stock: req.body.pro_stock,
    pro_status: req.body.pro_status,
    pro_cost: req.body.pro_cost,
    pro_price: req.body.pro_price,
    tra_id: req.body.tra_id,
    pro_name: req.body.pro_name,
    pro_detail: req.body.pro_detail,
    category_id: req.body.category_id,
  };
  Products.update(FIND_DATA, { $set: UPDATE_DATA }).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
module.exports = router;
