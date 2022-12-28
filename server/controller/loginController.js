const Customer = require("../models/customerModel");
const generateToken = require("../utils/generatetoken");

exports.LoginPost = (req, res) => {
  Customer.find({ email: req.body.email, password: req.body.password })
    .then((result) => {
      // console.log(result);
      if (result[0].blocked_status === false) {
        let details = {
          _id: result[0]._id,
          name: result[0].name,
          email: result[0].email,
          gender: result[0].gender,
          profile_picture: result[0].profile_picture,
          blocked_status: result[0].blocked_status,
          token: generateToken(result[0]._id),
        };
        res.status(200).json(details);
      } else {
        res.status(401).json("BLOCKED");
      }
    })
    .catch((err) => {
      res.status(401).json("INCORRECT");
    });
};


