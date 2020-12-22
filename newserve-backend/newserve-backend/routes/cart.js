const express = require("express");
const router = express.Router();
const { MONGODB } = require("../config.json");
const monk = require("monk")(MONGODB);
const ObjectId = monk.id;

/* Get Collection */
const Cart = monk.get("cart");

router.get("/", (req, res, next) => {
  const DATA = {};
  Cart.find(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.get("/:user_id", (req, res, next) => {
  const FROM = "products";
  const LOCAL_FIELD = "pro_id";
  const FOREIGN_FIELD = "_id";
  const AS = "products_data";
  const MATCH = { user_id: ObjectId(req.params.user_id) };
  Cart.aggregate([
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
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
module.exports = router;
