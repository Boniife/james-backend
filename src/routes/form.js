const { getMessage, viewMessage } = require("../controllers/message");
var express = require("express");
var router = express.Router();

router.get("/", viewMessage);

router.post("/", getMessage);

module.exports = router;
