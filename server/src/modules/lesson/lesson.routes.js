const express = require("express");

const { authorize } = require("../../middleware/Role");
const { createLesson } = require("./lesson.controller");
const { userAuth } = require("../../middleware/Auth");

const lessonRouter = express.Router();

lessonRouter.post(
  "/:courseId/lessons",
  userAuth,
  authorize("admin", "instructor"),
  createLesson
);

module.exports = lessonRouter;
