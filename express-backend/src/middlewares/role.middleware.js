import { ApiError } from "../utils/ApiError";

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    next(new ApiError(403, "Access denied — Admins only"));
  }
};

const isTeacher = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'teacher')) {
    next();
  } else {
    throw new ApiError(403, "Access denied. Teacher only.");
  }
};
export { isAdmin, isTeacher };
