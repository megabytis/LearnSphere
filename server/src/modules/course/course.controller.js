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

module.exports = { createCourse, fetchCourses, fetchCourseById };
