const { createError } = require("../../utils/error");
const { validateMongoID } = require("../../utils/validate");
const { courseModel } = require("../course/course.model");
const { lessonModel } = require("./lesson.model");

const createLesson = async (req, res, next) => {
  try {
    const { title, content, order, freePreview } = req.body;
    const { courseId } = req.params;
    validateMongoID(courseId);

    const foundCourse = await courseModel.findById(courseId);
    if (!foundCourse) {
      throw createError("Course not found!", 404);
    }

    if (
      !foundCourse.instructorId.equals(req.user._id) &&
      req.user.role !== "admin"
    ) {
      throw createError("You are not authorized!", 403);
    }

    const newLesson = new lessonModel({
      courseId,
      title,
      content,
      order,
      freePreview,
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
    const { title, content, order, freePreview } = req.body;
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
    if (freePreview && validator.isBoolean(freePreview)) {
      toUpdateFields.freePreview = freePreview;
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

const getLessons = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    validateMongoID(courseId);
    let { page = 1, limit = 10, sortBy = "order", search } = req.query;

    const foundCourse = await courseModel.findById(courseId);
    if (!foundCourse) {
      throw createError("Course not Found!", 404);
    }

    // Initialize filter with courseId to ensure we only get lessons for THIS course
    const filterQuery = { courseId };

    // Check user role for additional filtering
    const userRole = req.user?.role;
    if (!["admin", "instructor"].includes(userRole)) {
      // If not admin/instructor, we could filter by freePreview: true
      // However, the user recently commented this out, so I'll keep it commented
      // but ensure the courseId filter remains active.
      // filterQuery.freePreview = true;
    }

    // Sorting
    const sortOptions = { order: 1 };
    if (sortBy === "createdAt") {
      sortOptions.createdAt = 1;
      delete sortOptions.order;
    } else if (sortBy === "title") {
      sortOptions.title = 1;
      delete sortOptions.order;
    }

    // search
    if (search) {
      filterQuery.title = { $regex: search, $options: "i" };
    }

    // pagination
    page = parseInt(page) || 1;
    const MAX_LIMIT = 10;
    limit = parseInt(limit) || MAX_LIMIT;
    limit = limit > MAX_LIMIT ? MAX_LIMIT : limit;

    const skip = (page - 1) * limit;

    const totalLessons = await lessonModel.countDocuments(filterQuery);
    const totalPages = Math.ceil(totalLessons / limit);

    if (page > totalPages && totalPages > 0) {
      throw createError("Page limit exceeded!", 400);
    }

    const lessons = await lessonModel
      .find(filterQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      message: "Lessons!",
      lessons,
      pagination: { page, limit, totalLessons, totalPages },
    });
  } catch (err) {
    next(err);
  }
};

const getLessonById = async (req, res, next) => {
  try {
    const { courseId, lessonId } = req.params;
    validateMongoID(courseId);
    validateMongoID(lessonId);

    const foundCourse = await courseModel.findById(courseId);
    if (!foundCourse) {
      throw createError("Course not Found!", 404);
    }
    const foundLesson = await lessonModel.findById(lessonId);
    if (!foundLesson) {
      throw createError("Lesson not found!", 404);
    }
    if (
      foundLesson.freePreview === false &&
      !["admin", "instructor"].includes(String(req.user?.role))
    ) {
      throw createError("Lesson is not free to watch!", 403);
    }

    const lessonBelongsToCourse = foundLesson.courseId.equals(foundCourse._id);
    if (!lessonBelongsToCourse) {
      throw createError("Lesson doesn't belong to the course!", 400);
    }

    return res.status(200).json({
      message: "Lessons!",
      foundLesson,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createLesson,
  updateLesson,
  deleteLesson,
  getLessons,
  getLessonById,
};
