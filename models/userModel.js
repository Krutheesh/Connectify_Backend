const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const crypto = require("crypto");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [50, "Name must be less than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String, // URL of profile picture
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTML0gExaohZHdZW3609F12nUmVc14WXYNx_w&s",
    },
    nativeLanguage: {
      type: String,
      default: "",
    },
    learningLanguage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods = {
  // Compare password entered by user with the hashed password in the database
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  // For generating JWT Token - METHOD
  getJwtToken: function () {
    return JWT.sign(
      { _id: this._id, role: this.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },

  // generate forgotPasswordToken - METHOD (string)
  generateForgotPasswordToken: function () {
    // generate long and random string
    const forgotToken = crypto.randomBytes(20).toString("hex");
    // set the token to the forgotPasswordToken using crypto hashing and sha256 algorithm
    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(forgotToken)
      .digest("hex");

    // time for token to expire
    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

    return forgotToken;
  },
  // generate verificationToken - METHOD (string)
  generateVerificationToken: function () {
    // generate long and random string
    const verificationToken = crypto.randomBytes(20).toString("hex");
    // set the token to the verificationToken using crypto hashing and sha256 algorithm
    this.verificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    // time for token to expire
    this.verificationTokenExpiresAt = Date.now() + 20 * 60 * 1000;

    return verificationToken;
  },
};

module.exports = mongoose.model("User", userSchema);
