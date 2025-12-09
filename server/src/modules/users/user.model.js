const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: 1,
      maxLength: 30,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      requird: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "instructor", "student"],
      default: "student",
    },
  },
  { timestamps: true }
);

const userModel = new mongoose.model("User", userSchema);

module.exports = {
  userModel,
};
