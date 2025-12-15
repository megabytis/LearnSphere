const { validateMongoID } = require("../../utils/validate");
const { courseModel } = require("../course/course.model");
const { lessonModel } = require("./lesson.model");

const createLesson = async (req, res, next) => {
  try {
    const { title, content, order } = req.body;
    const { courseId } = req.params;
    validateMongoID(courseId);

    const foundCourse = await courseModel.findById(courseId);
    if (!foundCourse) {
      throw new Error("Course not found!");
    }

    if (
      !foundCourse.instructorId.equals(req.user._id) &&
      req.user.role !== "admin"
    ) {
      throw new Error("You are not authorized!");
    }

    const newLesson = new lessonModel({
      courseId,
      title,
      content,
      order,
    });
    const savedLesson = await newLesson.save();

    return res.json({
      message: "New lesson added.",
      savedLesson,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createLesson,
};
