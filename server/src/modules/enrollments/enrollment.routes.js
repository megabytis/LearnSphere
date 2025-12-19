const express = require("express");

const { userAuth } = require("../../middleware/Auth");
const {
  enrollCourse,
  getEnrollments,
  getEnrollmentStatus,
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
  "/courses/:courseId/enrollment",
  userAuth,
  getEnrollmentStatus
);

module.exports = enrollmentRouter;
