const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: 1,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
      index: 1,
    },
    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Lesson",
      },
    ],
    progress: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "cancelled"],
      default: "active",
    },
    enrolledAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const enrollmentModel = new mongoose.model("Enrollment", enrollmentSchema);

module.exports = {
  enrollmentModel,
};
