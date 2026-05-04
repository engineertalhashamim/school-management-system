import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized — Please log in");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

export { isLoggedIn };