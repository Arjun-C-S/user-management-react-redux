const Admin = require("../models/adminModel");
const generateToken = require("../utils/generatetoken");

exports.adminLoginPost = (req, res) => {
  Admin.find({ email: req.body.email, password: req.body.password })
    .then((result) => {
      // console.log(result);
      let details = {
        _id: result[0]._id,
        email: result[0].email,
        token: generateToken(result[0]._id),
      };
      res.status(200).json(details);
    })
    .catch((err) => {
      res.status(401).json("Incorrect Email or Password");
    });
};
