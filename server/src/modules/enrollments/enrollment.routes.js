const express = require("express");

const { userAuth } = require("../../middleware/Auth");
const {
  enrollCourse,
  getEnrollments,
  getEnrollmentStatus,
  unenrollCourse,
} = require("./enrollment.controller");
const { authorize } = require("../../middleware/Role");

const enrollmentRouter = express.Router();

enrollmentRouter.post(
  "/courses/:id/enroll",
  userAuth,
  authorize("student"),
  enrollCourse
);
enrollmentRouter.get("/auth/me/enrollments", userAuth, getEnrollments);
enrollmentRouter.get(
  "/courses/:courseId/enrollment-status",
  userAuth,
  getEnrollmentStatus
);
enrollmentRouter.delete(
  "/courses/:courseId/unenroll",
  userAuth,
  unenrollCourse
);

module.exports = enrollmentRouter;
