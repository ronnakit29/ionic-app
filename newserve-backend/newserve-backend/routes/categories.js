const express = require("express");
const router = express.Router();
const { MONGODB } = require("../config.json");
const monk = require("monk")(MONGODB);
const ObjectId = monk.id;

/* Get Collection */
const Categories = monk.get("catelogories");
router.get("/", (req, res, next) => {
  const DATA = {};
  Categories.find(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.post("/add", (req, res, next) => {
  const DATA = {
    category_text: req.body.category_text,
  };
  Categories.insert(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.post("/edit", (req, res, next) => {
  const FIND_DATA = { _id: req.body._id };
  const UPDATE_DATA = { category_text: req.body.category_text };
  Categories.update(FIND_DATA, { $set: UPDATE_DATA }).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.get("/:id", (req, res, next) => {
  const DATA = { _id: ObjectId(req.params.id) };
  Categories.findOne(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.delete("/delete/:id", (req, res, next) => {
  const DATA = { _id: req.params.id };
  Categories.remove(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
module.exports = router;
