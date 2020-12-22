const express = require("express");
const router = express.Router();
const { MONGODB } = require("../config.json");
const monk = require("monk")(MONGODB);
const ObjectId = monk.id;

/* Get Collection */
const Guides = monk.get("guides");
router.get("/", (req, res, next) => {
  const DATA = {};
  Guides.find(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.post("/add", (req, res, next) => {
  const DATA = {
    created_date: new Date(),
    user_id: ObjectId(req.body.user_id),
    guide_priority: req.body.guide_priority,
    guide_header: req.body.guide_header,
    guide_detail: req.body.guide_detail,
  };
  Guides.insert(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.get("/:id", (req, res, next) => {
  const DATA = { _id: req.params.id };
  Guides.findOne(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.get("/t/:user_id", (req, res, next) => {
  const MATCH = { user_id: req.params.user_id };
  const FROM = "users";
  const LOCAL_FIELD = "user_id";
  const FOREIGN_FIELD = "_id";
  const AS = "users_data";
  Guides.aggregate([
    { $match: {} },
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
router.post("/edit", (req, res, next) => {
  const FIND_DATA = { _id: req.body._id };
  const UPDATE_DATA = {
    user_id: ObjectId(req.body.user_id),
    guide_priority: 0,
    guide_header: req.body.guide_header,
    guide_detail: req.body.guide_detail,
  };
  Guides.update(FIND_DATA, { $set: UPDATE_DATA }).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.delete("/delete/:id", (req, res, next) => {
  const DATA = { _id: req.params.id };
  Guides.remove(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
module.exports = router;
