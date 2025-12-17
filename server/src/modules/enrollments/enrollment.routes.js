const express = require("express");

const { userAuth } = require("../../middleware/Auth");
const { enrollCourse } = require("./enrollment.controller");

const enrollmentRouter = express.Router();

enrollmentRouter.post("/courses/:id/enroll", userAuth, enrollCourse);

module.exports = enrollmentRouter;
