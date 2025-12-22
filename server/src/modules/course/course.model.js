const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0, // 0 means free
    },
    currency: {
      type: String,
      default: "inr",
      enum: ["inr", "usd"],
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const courseModel = mongoose.model("Course", courseSchema);

module.exports = {
  courseModel,
};
