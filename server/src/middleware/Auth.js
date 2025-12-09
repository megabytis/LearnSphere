const jwt = require("jsonwebtoken");
const { userModel } = require("../modules/users/user.model");

const userAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies?.refreshToken) {
      token = req.cookies.refreshToken;
    }

    if (!token) {
      const err = new Error("PLease Authenticate");
      err.statusCode = 401;
      throw err;
    }

    const foundUserObject = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const foundUser = await userModel.findById(foundUserObject._id);

    if (!foundUser) {
      const err = new Error("User not found!");
      err.statusCode = 401;
      throw err;
    }

    req.user = foundUser;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      err.statusCode = 401;
      err.message = "Token Expird";
    } else if (err.name === "JsonWebTokenError") {
      err.statusCode = 401;
      err.message = "Invalid Token";
    }
    next(err);
  }
};

module.exports = {
  userAuth,
};
