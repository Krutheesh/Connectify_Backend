const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/userModel");
const { upsertStreamUser } = require("../../config/stream");
const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};
//signup

module.exports.signup = asyncHandler(async (req, res) => {
  // console.log("signup called");

  const { name, email, password } = req.body;
  // console.log(name, email, password);
  if (!name || !email || !password) {
    const error = new Error("Please fill all the fields");
    error.code = 400; // Bad Request
    throw error;
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("User already exists");
    error.code = 400; // Conflict
    throw error;
  }
  // const verificationToken = user.generateVerificationToken();
  const user = await User.create({
    name,
    email,
    password,
  });

  //TODO:
  try {
    await upsertStreamUser({
      id: user._id.toString(),
      name: user.name,
      image: user.profilePic || "",
    });
    console.log("Stream user upserted successfully");
  } catch (error) {
    console.error("Error upserting Stream user:", error?.message);
  }

  const token = user.getJwtToken();
  user.password = undefined;

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    token,
    user,
  });
});

//verify email
//signin
module.exports.signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please fill all the fields");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (isPasswordMatched) {
    const token = user.getJwtToken();
    user.password = undefined;
    // user.lastLogin = new Date();
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      success: true,
      token,
      user,
    });
  }

  throw new Error("Password is incorrect");
});
//signout
module.exports.logout = asyncHandler(async (_req, res) => {
  console.log("logout called");
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

module.exports.onboard = asyncHandler(async (req, res) => {
  const userId = req.user;

  const { name, bio, nativeLanguage, learningLanguage, location } = req.body;
  console.log(name, bio, nativeLanguage, learningLanguage, location);
  if (!name || !bio || !nativeLanguage || !learningLanguage || !location) {
    throw new Error("Please fill all the fields");
  }
  const updateUser = await User.findByIdAndUpdate(
    userId,
    {
      ...req.body,
      isOnboarded: true,
    },
    {
      new: true,
    }
  );
  if (!updateUser) {
    throw new Error("User not found");
  }
  try {
    await upsertStreamUser({
      id: updateUser._id.toString(),
      name: updateUser.name,
      image: updateUser.profilePic || "",
    });
    console.log("Stream onboard user upserted successfully");
  } catch (error) {
    console.error("Error onboard  upserting Stream user:", error?.message);
  }
  res.status(200).json({
    sucess: true,
    user: updateUser,
  });
});
//forgot password
//reset password
//getProfile
module.exports.getProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new Error("User not found");
  }
  res.status(200).json({
    success: true,
    user,
  });
});
