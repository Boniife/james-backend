const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: String,
  descripton: String,
  link: String,
  img: String,
  // created_at: {
  //   type: Date,
  //   default: new Date(),
  // },
});

const ProjectModel = mongoose.model("proj", ProjectSchema);

module.exports = ProjectModel;
