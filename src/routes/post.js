const express = require("express");
const router = express.Router();
const { createPost, getMyPosts } = require("../controllers/post");
const { requireSignin } = require("../common-middleware");
const {
  validationCreatePostRequest,
  isRequestValidated,
} = require("../validators/post");

router.post(
  "/create",
  requireSignin,
  validationCreatePostRequest,
  isRequestValidated,
  createPost
);

router.get("/my", requireSignin, getMyPosts);

module.exports = router;
