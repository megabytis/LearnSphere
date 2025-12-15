const authorize = (...authorizedRoles) => {
  // Check if user has at least one of the required roles
  const userRoles = "admin";

  const hasAccess = authorizedRoles.some((role) => userRoles === role);

  if (!hasAccess) {
    throw new Error("Unauthorized");
  }

  console.log(hasAccess);
};

// All these work:
authorize("instructor");
authorize("admin");
authorize("admin", "instructor", "moderator");
