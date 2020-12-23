const express = require("express");
const router = express.Router();
const { MONGODB } = require("../config.json");
const monk = require("monk")(MONGODB);
const ObjectId = monk.id;

/* Get Collection */
const Ponds = monk.get("ponds");

router.get("/", (req, res, next) => {
  const DATA = {};
  Ponds.aggregate([
    {
      $lookup: {
        from: "fish",
        localField: "fish_type",
        foreignField: "_id",
        as: "fish_type_data",
      },
    },
  ]).then((response) => {
    response.forEach((item) => {
      item.fish_type_data = item.fish_type_data[0];
    });
    res.json({ code: 1, message: "Aggregate faild!", result: response });
  });
});
router.get("/u/:user_id", (req, res, next) => {
  const FROM = "fish";
  const LOCAL_FIELD = "fish_type";
  const FOREIGN_FIELD = "_id";
  const AS = "fish_type_data";
  const MATCH = { user_id: ObjectId(req.params.user_id) };
  Ponds.aggregate([
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
      item.fish_type_data = item.fish_type_data[0];
    });
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.post("/add", (req, res, next) => {
  const DATA = {
    p_date: new Date(),
    user_id: ObjectId(req.body.user_id),
    p_name: req.body.p_name,
    fish_type: ObjectId(req.body.fish_type),
    p_width: req.body.p_width,
    p_length: req.body.p_length,
    p_height: req.body.p_height,
    p_new: req.body.p_new,
    p_number_fish: req.body.p_number_fish,
    p_number_dead: 0,
    p_fish_date: new Date(),
    p_number_success: 0,
  };
  Ponds.insert(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.post("/edit", (req, res, next) => {
  const FIND_DATA = { _id: ObjectId(req.body._id) };
  const UPDATE_DATA = {
    p_date: new Date(),
    user_id: ObjectId(req.body.user_id),
    p_name: req.body.p_name,
    fish_type: ObjectId(req.body.fish_type),
    p_width: req.body.p_width,
    p_length: req.body.p_length,
    p_height: req.body.p_height,
    p_new: req.body.p_new,
    p_number_fish: req.body.p_number_fish,
    p_fish_date: new Date(),
    p_number_success: 0,
  };
  Ponds.update(FIND_DATA, UPDATE_DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.delete("/delete/:id", (req, res, next) => {
  const DATA = { _id: ObjectId(req.params.id) };
  Ponds.remove(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.get("/:id", (req, res, next) => {
  const DATA = { _id: req.params.id };
  const FROM = "timelines";
  const LOCAL_FIELD = "fish_type";
  const FOREIGN_FIELD = "fish_type";
  const AS = "timeline";
  const MATCH = { _id: ObjectId(req.params.id) };
  Ponds.aggregate([
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
    {
      $lookup: {
        from: "fish",
        localField: "fish_type",
        foreignField: "_id",
        as: "fish_data",
      },
    },
  ]).then((response) => {
    const fishChart = [
      {
        name: "จำนวนปลา",
        population: parseInt(response.p_number_fish),
        color: "rgb(131,167,34)",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15,
      },
      {
        name: "จำนวนปลาตาย",
        population: parseInt(response.p_number_dead),
        color: "rgb(255,0,0)",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15,
      },
    ];
    res.json({
      code: 0,
      message: "Query Success!",
      result: response,
      fishChart: fishChart,
    });
  });
  // Ponds.findOne(DATA).then((response) => {

  //   res.json({
  //     code: 0,
  //     message: "Query Success!",
  //     result: response,
  //     fishChart: fishChart,
  //   });
  // });
});
router.post("/dead", (req, res, next) => {
  const FIND_DATA = { _id: req.body._id };
  const UPDATE_DATA = { $inc: { p_fish_dead: +req.body.qty } };
  Ponds.update(FIND_DATA, UPDATE_DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
module.exports = router;
