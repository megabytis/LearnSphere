const { createError } = require("../../utils/error");
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

const updateLesson = async (req, res, next) => {
  try {
    const { title, content, order } = req.body;
    const { courseId, lessonId } = req.params;
    validateMongoID(courseId);
    validateMongoID(lessonId);

    const foundCourse = await courseModel.findById(courseId);
    if (!foundCourse) {
      throw createError("Course not Found!", 404);
    }

    if (
      !foundCourse.instructorId.equals(req.user._id) &&
      req.user.role !== "admin"
    ) {
      throw createError("You are not authorized!", 403);
    }

    const foundLesson = await lessonModel.findById(lessonId);
    if (!foundLesson) {
      throw createError("Lesson not found!", 404);
    }

    const lessonBelongsToCourse = foundLesson.courseId.equals(foundCourse._id);
    if (!lessonBelongsToCourse) {
      throw createError("Lesson doesn't belong to the course!", 400);
    }

    const toUpdateFields = {};
    if (title && String(title).length > 0) {
      toUpdateFields.title = title;
    }
    if (content && String(content).length > 0) {
      toUpdateFields.content = content;
    }
    if (order && Number(order) > 0) {
      toUpdateFields.order = order;
    }

    if (Object.keys(toUpdateFields).length === 0) {
      throw createError("No fields to Update!", 400);
    }

    const updatedLesson = await lessonModel.findByIdAndUpdate(
      lessonId,
      toUpdateFields,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Lesson Updated!",
      updatedLesson,
    });
  } catch (err) {
    next(err);
  }
};

const deleteLesson = async (req, res, next) => {
  try {
    const { courseId, lessonId } = req.params;
    validateMongoID(courseId);
    validateMongoID(lessonId);

    const foundCourse = await courseModel.findById(courseId);
    if (!foundCourse) {
      throw createError("Course not Found!", 404);
    }

    if (
      !foundCourse.instructorId.equals(req.user._id) &&
      req.user.role !== "admin"
    ) {
      throw createError("You are not authorized!", 403);
    }

    const foundLesson = await lessonModel.findById(lessonId);
    if (!foundLesson) {
      throw createError("Lesson not found!", 404);
    }

    const lessonBelongsToCourse = foundLesson.courseId.equals(foundCourse._id);
    if (!lessonBelongsToCourse) {
      throw createError("Lesson doesn't belong to the course!", 400);
    }

    const lesson = await lessonModel.findByIdAndDelete(lessonId);

    return res.status(200).json({
      message: "Lesson deleted Successfully!",
      deletedLesson: lesson,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createLesson,
  updateLesson,
  deleteLesson,
};
