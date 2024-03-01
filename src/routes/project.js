var express = require("express");
var {
  createPost,
  getPost,
  deletePost,
  // updatePost,
} = require("../controllers/project");
var router = express.Router();

// const bodyParser = require("body-parser");

router.post("/", createPost);
router.get("/", getPost);
router.delete("/:_id", deletePost);
// router.patch("/:_id", updatePost);

module.exports = router;
