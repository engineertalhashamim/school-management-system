import { ApiError } from "../utils/ApiError";

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    next(new ApiError(403, "Access denied — Admins only"));
  }
};
export { isAdmin };
