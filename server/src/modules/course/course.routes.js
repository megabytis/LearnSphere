const express = require("express");
const { authorize } = require("../../middleware/Role");
const {
  createCourse,
  fetchCourses,
  fetchCourseById,
} = require("./course.controller");
const { userAuth } = require("../../middleware/Auth");

const coursesRouter = express.Router();

coursesRouter.post("/courses", userAuth, authorize("admin"), createCourse);
coursesRouter.get("/courses", fetchCourses);
coursesRouter.get("/courses/:id", fetchCourseById);

module.exports = coursesRouter;
