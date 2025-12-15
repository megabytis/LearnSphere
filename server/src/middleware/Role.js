const authorize = (authorizedRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Authentication required!",
      });
    }

    const hasAccess = authorizedRole.includes(req.user.role);

    if (!hasAccess) {
      return res.status(403).json({
        error: "Insufficient permission!",
      });
    }
    next();
  };
};

module.exports = { authorize };
