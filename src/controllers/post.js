const Post = require("../models/post");

exports.createPost = (req, res) => {
  const { title, content, photo } = req.body;
  const postedBy = req.user._id;
  const post = new Post({
    title,
    content,
    photo,
    postedBy,
  });
  post
    .save()
    .then((post) => {
      res.status(201).json({ post });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getMyPosts = (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate({
      path: "postedBy",
      select: "_id firstName lastName",
    })
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
