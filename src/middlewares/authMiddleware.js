const JWT = require("jsonwebtoken");
const User = require("./../models/userModel");
const asyncHandler = require("./../utils/asyncHandler");
const dotenv = require("dotenv");
dotenv.config();

module.exports.isLoggedIn = asyncHandler(async (req, res, next) => {
  // console.log(process.env.JWT_SECRET_KEY);
  let token;
  // console.log("cookie")
  console.log("--",req.cookies.token);
  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new Error("Not authorized to access this route");
  }

  try {
    const decodedJwtPayload = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedJwtPayload._id).select("-password");
    next();
  } catch (error) {
    throw new Error("Not authorized to access this route. Please login!");
  }
});
