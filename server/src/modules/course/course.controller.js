const { validateCourseData, validateMongoID } = require("../../utils/validate");
const { courseModel } = require("../course/course.model");

const createCourse = async (req, res, next) => {
  try {
    const { title, description, instructorId, published } = req.body;
    validateCourseData(req.body);

    const course = new courseModel({
      title,
      description,
      instructorId,
      published,
    });

    const addedCourse = await course.save();

    return res.json({
      message: "Course added successfully!",
      course: addedCourse,
    });
  } catch (err) {
    next(err);
  }
};

const fetchCourses = async (req, res, next) => {
  try {
    const courses = await courseModel
      .find({ published: true })
      .sort({ createdAt: -1 });

    return res.json({
      courses,
    });
  } catch (err) {
    next(err);
  }
};

const fetchCourseById = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    validateMongoID(courseId);

    const course = await courseModel.findOne({
      _id: courseId,
      published: true,
    });
    if (!course) {
      return res.status(404).json({
        message: "Course not Found!",
      });
    }

    return res.json({
      course,
    });
  } catch (err) {
    next(err);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    validateMongoID(courseId);

    const foundCourse = await courseModel.findById(courseId);
    if (!foundCourse) {
      const err = new Error("Course not Found!");
      err.statusCode = 404;
      throw err;
    }

    // Check ownership: admin can update any course, instructor can only update their own
    if (
      req.user.role !== "admin" &&
      !foundCourse.instructorId.equals(req.user._id)
    ) {
      const err = new Error("You are not authorized to update this course!");
      err.statusCode = 403;
      throw err;
    }

    const { title, description, published } = req.body;
    const toUpdateFields = {};

    if (title && String(title).trim().length > 0) {
      toUpdateFields.title = title.trim();
    }
    if (description !== undefined) {
      toUpdateFields.description = description;
    }
    if (typeof published === "boolean") {
      toUpdateFields.published = published;
    }

    if (Object.keys(toUpdateFields).length === 0) {
      const err = new Error("No fields to update!");
      err.statusCode = 400;
      throw err;
    }

    const updatedCourse = await courseModel.findByIdAndUpdate(
      courseId,
      toUpdateFields,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Course updated successfully!",
      course: updatedCourse,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createCourse, fetchCourses, fetchCourseById, updateCourse };
