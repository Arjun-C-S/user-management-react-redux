const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: String,
  password: String,
  profile_picture: {
    type: String,
  },
  blocked_status: {
    type: Boolean,
    required: true,
  },
});

const Customer = mongoose.model("Customer", schema);

module.exports = Customer;
