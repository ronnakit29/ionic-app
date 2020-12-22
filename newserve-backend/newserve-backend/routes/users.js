const express = require("express");
const router = express.Router();
const { MONGODB } = require("../config.json");
const monk = require("monk")(MONGODB);
const ObjectId = monk.id;

/* Get Collection */
const Users = monk.get("users");

/* GET users listing. */
router.get("/", (req, res, next) => {
  Users.find({}).then((response) => {
    response.forEach((item) => {
      item.user_token = "hidden";
    });
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});

router.post("/add", (req, res, next) => {
  let r = Math.random().toString(36).substring(30);
  const addUser = {
    reference_user_id: req.body.reference_user_id,
    user_username: req.body.user_username,
    user_password: req.body.user_password,
    user_prefix: req.body.user_prefix,
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_tel: req.body.user_tel,
    user_role: req.body.user_role,
    user_status: req.body.user_status,
    address: req.body.address,
    user_token: r,
    user_token_exp: new Date(),
  };
  Users.insert(addUser).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.get("/:id", (req, res, next) => {
  const DATA = { _id: req.params.id };
  Users.findOne(DATA).then((response) => {
    response.user_token = "hidden";
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.get("/t/:id", (req, res, next) => {
  const DATA = { reference_user_id: req.params.id };
  Users.find(DATA).then((response) => {
    response.forEach((item) => {
      item.user_token = "hidden";
    });
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.post("/edit", (req, res, next) => {
  const FIND_DATA = { _id: req.body._id };
  const UPDATE_DATA = {
    reference_user_id: req.body.reference_user_id,
    user_username: req.body.user_username,
    user_password: req.body.user_password,
    user_prefix: req.body.user_prefix,
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_tel: req.body.user_tel,
    user_role: req.body.user_role,
    user_status: req.body.user_status,
    address: req.body.address,
  };
  console.log(UPDATE_DATA);
  Users.update(FIND_DATA, { $set: UPDATE_DATA }).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
router.delete("/delete/:id", (req, res, next) => {
  const DATA = { _id: ObjectId(req.params.id) };
  Users.remove(DATA).then((response) => {
    res.json({ code: 0, message: "Query Success!", result: response });
  });
});
module.exports = router;
