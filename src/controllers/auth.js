var User = require("../models/user");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var shortid = require("shortid");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(async (user) => {
      if (user) {
        return res.status(403).json({
          error: "User already registed",
        });
      } else {
        const { firstName, lastName, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({
          firstName,
          lastName,
          email,
          hash_password,
          username: shortid.generate(),
        });

        _user
          .save()
          .then((data) => {
            return res.status(201).json({
              message: "User created successfully!",
            });
          })
          .catch((error) => {
            return res.status(400).json({ error });
          });
      }
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        if (user.authenticate(req.body.password)) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          const { _id, firstName, lastName, fullName, email } = user;

          res.cookie("token", token, { expiresIn: "1d" });
          res.status(200).json({
            token,
            user: {
              _id,
              firstName,
              lastName,
              fullName,
              email,
            },
          });
        } else {
          return res.status(401).json({ error: "Login failed" });
        }
      } else {
        return res.status(401).json({ error: "Login failed" });
      }
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully!",
  });
};
