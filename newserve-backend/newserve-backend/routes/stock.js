const express = require("express");
const router = express.Router();
const { MONGODB } = require("../config.json");
const monk = require("monk")(MONGODB);
const ObjectId = monk.id;

/* Get Collection */
const Stock = monk.get("stock");
const Products = monk.get("products");

router.get("/p/:pro_id", (req, res, next) => {
  const DATA = { pro_id: ObjectId(req.params.pro_id) };
  Stock.find(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.post("/add", (req, res, next) => {
  const DATA = {
    stock_date: new Date(),
    stock_qty: parseInt(req.body.qty),
    pro_id: ObjectId(req.body.pro_id),
  };
  Products.update(
    { _id: ObjectId(req.body.pro_id) },
    { $inc: { pro_stock: +parseInt(req.body.qty) } }
  ).then((response) => {
    Stock.insert(DATA).then((response1) => {
      res.json({ code: 0, message: "Query Success!", result: response1 });
    });
  });
});
module.exports = router;
