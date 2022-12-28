const { ObjectId } = require("mongodb");
const Customer = require("../models/customerModel");

exports.adminHomeGet = (req, res) => {
  // console.log("controller");
  try {
    Customer.find().then((result) => {
      // console.log(result);
      let details = {
        CustomerData: result,
      };
      res.status(200).json(details);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.adminHomePost = (req, res) => {};

exports.adminUserBlock = (req, res) => {
  try {
    Customer.find({ _id: ObjectId(req.query.id) })
      .then((data) => {
        // console.log(data);
        Customer.findOneAndUpdate(
          { _id: ObjectId(req.query.id) },
          {
            $set: {
              blocked_status: !data[0].blocked_status,
            },
          }
        ).then((result) => {
          // console.log(result);
          res.status(200).json("USER BLOCKED SUCCESSFULLY");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log("here" + error);
    res.status(400).json(error);
  }
};
