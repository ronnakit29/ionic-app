const express = require("express");
const router = express.Router();
const { MONGODB } = require("../config.json");
const monk = require("monk")(MONGODB);
const ObjectId = monk.id;

/* Get Collection */
const Authen = monk.get("users");
router.post("/login", (req, res, next) => {
  const DATA = {
    user_username: req.body.username,
    user_password: req.body.password,
  };
  Authen.findOne(DATA).then((response) => {
    if (response == null) {
      res.json({ code: 0, message: "Username or password incorrect!" });
    } else {
      res.json({ code: 0, message: "Login successfully", user: response });
    }
  });
});
module.exports = router;
