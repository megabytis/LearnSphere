const express = require("express");
const { authorize } = require("../../middleware/Role");
const {
  createCourse,
  fetchCourses,
  fetchCourseById,
} = require("./course.controller");
const { userAuth } = require("../../middleware/Auth");

const coursesRouter = express.Router();

coursesRouter.post("/", userAuth, authorize("admin"), createCourse);
coursesRouter.get("/", fetchCourses);
coursesRouter.get("/:id", fetchCourseById);

module.exports = coursesRouter;
