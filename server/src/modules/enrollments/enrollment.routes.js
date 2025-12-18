const express = require("express");

const { userAuth } = require("../../middleware/Auth");
const { enrollCourse, getEnrollments } = require("./enrollment.controller");
const { authorize } = require("../../middleware/Role");

const enrollmentRouter = express.Router();

enrollmentRouter.post(
  "/courses/:id/enroll",
  userAuth,
  authorize("student"),
  enrollCourse
);
enrollmentRouter.get("/auth/me/enrollments", userAuth, getEnrollments);

module.exports = enrollmentRouter;
