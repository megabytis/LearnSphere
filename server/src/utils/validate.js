const mongoose = require("mongoose");
const validator = require("validator");

const validateSignupData = (req) => {
  const { name, email, password } = req.body;

  if (!name || String(name).trim().length < 2) {
    throw new Error("Name not valid!");
  }
  if (!email || !validator.isEmail(String(email))) {
    throw new Error("Email not valid!");
  }
  if (!password || !validator.isStrongPassword(String(password))) {
    throw new Error("Password is not strong!");
  }
};

const validateMongoID = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID!");
  }
};

const validateCourseData = (data) => {
  const { title, description, instructorId, published } = data;

  if (!title) {
    throw new Error("Title unavailable!");
  }
  if (!instructorId) {
    throw new Error("Instructor not set!");
  } else {
    validateMongoID(instructorId);
  }
};

module.exports = {
  validateSignupData,
  validateMongoID,
  validateCourseData,
};
