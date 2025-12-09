const express = require("express");
const {
  registerNewUser,
  login,
  refresh,
  logout,
  logoutAll,
  self,
} = require("./auth.controller");
const { userAuth } = require("../../middleware/Auth");

const authRouter = express.Router();

authRouter.post("/auth/signup", registerNewUser);
authRouter.post("/auth/login", login);
authRouter.post("/auth/refresh", refresh);
authRouter.post("/auth/logout", logout);
authRouter.post("/auth/logout-all", logoutAll);
authRouter.get("/auth/me", userAuth, self);

module.exports = authRouter;
