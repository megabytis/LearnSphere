const express = require("express");

const { authorize } = require("../../middleware/Role");
const { createLesson, updateLesson } = require("./lesson.controller");
const { userAuth } = require("../../middleware/Auth");

const lessonRouter = express.Router();

lessonRouter.post(
  "/:courseId/lessons",
  userAuth,
  authorize("admin", "instructor"),
  createLesson
);
lessonRouter.put(
  "/:courseId/lessons/:lessonId",
  userAuth,
  authorize("admin", "instructor"),
  updateLesson
);

module.exports = lessonRouter;
