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

authRouter.post("/signup", registerNewUser);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", logout);
authRouter.post("/logout-all", logoutAll);
authRouter.get("/me", userAuth, self);

module.exports = authRouter;
