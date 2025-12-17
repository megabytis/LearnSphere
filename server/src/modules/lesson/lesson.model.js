const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    order: {
      type: Number,
    },
    freePreview: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const lessonModel = mongoose.model("Lesson", lessonSchema);

module.exports = { lessonModel };
