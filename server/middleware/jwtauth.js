const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
// const user = require("../models/customerModel");

const protect = asynchandler(async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token + "This is the token...");
      const decoded = jwt.verify(token, "usermanagement");  // this usermanagement should be in env (but for now it is being added here )
      // req.user = await user.findById(decoded.id).select("-password");
      // console.log("Valid Token ");
      next();
    } catch (error) {
      res.status(401).json("TOKEN INVALID");
    }
  }

  if (!token) {
    res.status(401).json("Token Not Found");
    console.log("U");
  }
});

module.exports = { protect };
