var express = require("express");
var router = express.Router();
const { signUp } = require("../controllers/user.js");
const { signIn } = require("../controllers/user.js");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signUp", signUp);
router.post("/signIn", signIn);

module.exports = router;
