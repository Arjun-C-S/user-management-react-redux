const { ObjectId } = require("mongodb");
const Customer = require("../models/customerModel");
const generateToken = require("../utils/generatetoken");

exports.profileGet = (req, res) => {
  // console.log(req.query.id);
  try {
    Customer.findOne({ _id: ObjectId(req.query.id) }).then((result) => {
      // console.log(result);
      let details = {
        name: result.name,
        email: result.email,
        gender: result.gender,
        profile_picture: result.profile_picture,
        password: result.password,
        blocked_status: result.blocked_status,
      };
      res.status(200).json(details);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.profilePost = (req, res) => {
  if (req.body.profilePic) {
    try {
      Customer.findOneAndUpdate(
        { _id: ObjectId(req.body.userId) },
        {
          $set: {
            profile_picture: req.body.profilePic,
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
          },
        }
      ).then((result) => {
        Customer.findOne({ _id: ObjectId(req.body.userId) })
          .then((data) => {
            let details = {
              _id: data._id,
              name: data.name,
              email: data.email,
              gender: data.gender,
              profile_picture: data.profile_picture,
              blocked_status: data.blocked_status,
              token: generateToken(data._id.toString()),
            };
            res.status(200).json(details);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    try {
      Customer.findOneAndUpdate(
        { _id: ObjectId(req.body.userId) },
        {
          $set: {
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
          },
        }
      ).then((result) => {
        Customer.findOne({ _id: ObjectId(req.body.userId) })
          .then((data) => {
            let details = {
              _id: data._id,
              name: data.name,
              email: data.email,
              gender: data.gender,
              profile_picture: data.profile_picture,
              blocked_status: data.blocked_status,
              token: generateToken(data._id.toString()),
            };
            res.status(200).json(details);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }
};