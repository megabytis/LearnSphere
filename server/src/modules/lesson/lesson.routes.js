const express = require("express");

const { authorize } = require("../../middleware/Role");
const {
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonById,
  getLessons,
} = require("./lesson.controller");
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
lessonRouter.delete(
  "/:courseId/lessons/:lessonId",
  userAuth,
  authorize("admin", "instructor"),
  deleteLesson
);
lessonRouter.get("/:courseId/lessons", getLessons);
lessonRouter.get("/:courseId/lessons/:lessonId", getLessonById);

module.exports = lessonRouter;
