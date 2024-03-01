var express = require("express");
var path = require("path");
var router = express.Router();

//const email = require("../controllers/mail");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.get("/", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "/frontend/src/components/contact/Contact.jsx")
//   );
// });

//router.post("/send_email", email);
module.exports = router;
