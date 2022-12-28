const Customer = require("../models/customerModel");

exports.adminSearchGet = (req, res) => {};

exports.adminSearchPost = (req, res) => {
  // console.log(req.body.name);
  Customer.find({
    name: { $regex: req.body.name },
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(401).json("Error");
    });
};
