const express = require("express");
const router = express.Router();
const { MONGODB } = require("../config.json");
const monk = require("monk")(MONGODB);
const ObjectId = monk.id;

/* Get Collection */
const Fish = monk.get("fish");
router.get("/", (req, res, next) => {
  const DATA = {};
  Fish.find(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.get("/:id", (req, res, next) => {
  const DATA = { _id: req.params.id };
  Fish.findOne(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.post("/add", (req, res, next) => {
  const DATA = {
    user_id: req.body.user_id,
    fish_name: req.body.fish_name,
    fish_growth_time: req.body.fish_growth_time,
    fish_price: req.body.fish_price,
  };
  Fish.insert(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.post("/edit", (req, res, next) => {
  const FIND_DATA = { _id: req.body._id };
  const UPDATE_DATA = {
    user_id: req.body.user_id,
    fish_name: req.body.fish_name,
    fish_growth_time: req.body.fish_growth_time,
    fish_price: req.body.fish_price,
  };
  Fish.update(FIND_DATA, { $set: UPDATE_DATA }).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.get("/t/:id", (req, res, next) => {
  const DATA = { user_id: ObjectId(req.params.id) };
  Fish.find(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.delete("/delete/:id", (req, res, next) => {
  const DATA = { _id: req.params.id };
  Fish.remove(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
module.exports = router;
