const { createError } = require("../../utils/error");
const { validateMongoID } = require("../../utils/validate");
const { courseModel } = require("../course/course.model");
const { enrollmentModel } = require("./enrollment.model");

const enrollCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    validateMongoID(courseId);

    const foundCourse = await courseModel.findById(courseId);
    if (!foundCourse) {
      throw createError("Course not found!", 404);
    }
    const alreadyEnrolled = await enrollmentModel.findOne({
      userId: req.user._id,
      courseId: courseId,
      status: "active",
    });
    if (alreadyEnrolled) {
      throw createError("Already enrolled!", 403);
    }

    const enroll = new enrollmentModel({
      userId: req.user._id,
      courseId: courseId,
      status: "active",
      enrolledAt: new Date(Date.now()),
    });

    const newEnroll = await enroll.save();

    return res.status(200).json({
      message: "Enrolled Successfully!",
      newEnroll,
    });
  } catch (err) {
    next(err);
  }
};

const getEnrollments = async (req, res, next) => {
  try {
    const enrollments = await enrollmentModel
      .find({
        userId: req?.user?._id,
        status: "active",
      })
      .populate({ path: "courseId", select: "title description" })
      .select("completedLessons progress status enrolledAt")
      .sort({ enrolledAt: -1 })
      .lean();

    return res.status(200).json({
      message: "Enrollment retrieved successfully",
      enrollments: enrollments,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  enrollCourse,
  getEnrollments,
};
