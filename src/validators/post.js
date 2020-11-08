var { check, validationResult } = require("express-validator");

exports.validationCreatePostRequest = [
  check("title").notEmpty().withMessage("title is required"),
  check("content").notEmpty().withMessage("content is required"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }
  next();
};
