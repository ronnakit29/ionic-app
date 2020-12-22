const express = require("express");
const router = express.Router();
const { MONGODB } = require("../config.json");
const monk = require("monk")(MONGODB);
const ObjectId = monk.id;

/* Get Collection */
const Timeline = monk.get("timelines");
router.get("/", (req, res, next) => {
  Timeline.aggregate([
    {
      $sort: { timeline_day: 1 },
    },
  ]).then((response) => {
    res.json({ code: 1, message: "Aggregate faild!", result: response });
  });
});
router.get("/t/:user_id/f/:fish_id", (req, res, next) => {
  const DATA = {
    user_id: ObjectId(req.params.user_id),
    fish_type: ObjectId(req.params.fish_id),
  };
  const FROM = "products";
  const LOCAL_FIELD = "product_recommend";
  const FOREIGN_FIELD = "_id";
  const AS = "product_list";
  Timeline.aggregate([
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
router.get("/:id", (req, res, next) => {
  const DATA = { _id: req.params.id };
  Timeline.findOne(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.post("/add", (req, res, next) => {
  product_recommend = req.body.product_recommend;
  product_recommend.forEach((item) => {
    item = ObjectId(item);
  });
  const DATA = {
    product_recommend: product_recommend,
    user_id: ObjectId(req.body.user_id),
    timeline_day: req.body.timeline_day,
    timeline_title: req.body.timeline_title,
    timeline_detail: req.body.timeline_detail,
    timeline_youtube: req.body.timeline_youtube,
    fish_type: ObjectId(req.body.fish_type),
  };
  Timeline.insert(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.post("/edit", (req, res, next) => {
  product_recommend = req.body.product_recommend;
  product_recommend.forEach((item) => {
    item = ObjectId(item);
  });
  const FIND_DATA = { _id: req.body._id };
  const UPDATE_DATA = {
    product_recommend: product_recommend,
    user_id: ObjectId(req.body.user_id),
    timeline_day: req.body.timeline_day,
    timeline_title: req.body.timeline_title,
    timeline_detail: req.body.timeline_detail,
    timeline_youtube: req.body.timeline_youtube,
    fish_type: ObjectId(req.body.fish_type),
  };
  Timeline.update(FIND_DATA, { $set: UPDATE_DATA }).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.delete("/delete/:id", (req, res, next) => {
  const DATA = { _id: req.params.id };
  Timeline.remove(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
module.exports = router;
