var ProjectModel = require("../models/project");
const mongoose = require("mongoose");

const createPost = async (req, res) => {
  // const { title, link, descripton } = req.body;
  const post = req.body;
  const newPost = new ProjectModel({
    ...post,
    // created_at: new Date().toISOString(),
  });
  // const newPost = new ProjectModel({
  //   title: title,
  //   link: link,
  //   description: descripton,
  // });

  try {
    await newPost.save();

    res.status(201).json({ message: "Project Added Successfully" });
  } catch (error) {
    res.status(409).json({ message: "error" });
  }
};

const getPost = async (req, res) => {
  // const { id } = req.params;

  try {
    const post = await ProjectModel.find();

    res.status(200).json({ post, message: "success" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const { _id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No project with such id");
  await ProjectModel.findByIdAndRemove(_id);

  res.json({ message: "Post deleted successfully" });
};

// const updatePost = async (req, res) => {
//   const { _id: _id } = req.params;
//   const post = req.body;

//   if (!mongoose.Types.ObjectId.isValid(_id))
//     return res.status(404).send("No post with such id");

//   const updatedPost = await ProjectModel.findByIdAndUpdate(
//     _id,
//     { ...post, _id },
//     { new: true }
//   );

//   res.json(updatedPost);
// };

module.exports = { createPost, getPost, deletePost };
