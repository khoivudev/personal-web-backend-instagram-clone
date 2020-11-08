const express = require("express");
const router = express.Router();
const { signup, signin, signout } = require("../controllers/auth");
const { requireSignin } = require("../common-middleware");
const {
  validationSignupRequest,
  validationSigninRequest,
  isRequestValidated,
} = require("../validators/auth");

router.post("/signup", validationSignupRequest, isRequestValidated, signup);

router.post("/signin", validationSigninRequest, isRequestValidated, signin);

router.post("/signout", requireSignin, signout);

module.exports = router;
