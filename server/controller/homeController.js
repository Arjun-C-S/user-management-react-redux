const { ObjectId } = require("mongodb");
const Customer = require("../models/customerModel");

exports.homeGet = (req, res) => {
  // console.log(req.query.id);
  try {
    Customer.findOne({ _id: ObjectId(req.query.id) }).then((result) => {
      // console.log(result);
      let details = {
        name: result.name,
        email: result.email,
        gender: result.gender,
        profile_picture: result.profile_picture,
        blocked_status: result.blocked_status,
      };
      res.status(200).json(details);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
