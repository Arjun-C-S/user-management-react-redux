const Customer = require("../models/customerModel");

exports.signUpGet = (req, res) => {};

exports.signUpPost = (req, res) => {
  // new user
  const user = new Customer({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    password: req.body.password,
    profile_picture: req.body.profilePic,
    blocked_status: false,
  });

  // console.log(user);

  // save user in the database
  user
    .save(user)
    .then((result) => {
      let details = {
        name: result.name,
        email: result.email,
        gender: result.gender,
        profile_picture: result.profile_picture,
        blocked_status: result.blocked_status,
      };
      res.status(201).json(details);
      // console.log(result);
    })
    .catch((err) => {
      console.log("exist");
      res.status(400).json("email exists");
      console.log(err);
    });
};
