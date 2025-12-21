const express = require("express");
const { authorize } = require("../../middleware/Role");
const {
  createCourse,
  fetchCourses,
  fetchCourseById,
  updateCourse,
} = require("./course.controller");
const { userAuth } = require("../../middleware/Auth");

const coursesRouter = express.Router();

coursesRouter.post(
  "/",
  userAuth,
  authorize("admin", "instructor"),
  createCourse
);
coursesRouter.get("/", fetchCourses);
coursesRouter.get("/:id", fetchCourseById);
coursesRouter.put(
  "/:id",
  userAuth,
  authorize("admin", "instructor"),
  updateCourse
);

module.exports = coursesRouter;
