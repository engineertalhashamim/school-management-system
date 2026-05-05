import express from "express";
import {
  markAttendance,
  getAttendanceByDate,
  getStudentAttendance,
  getClassAttendanceReport
} from "../controllers/attendance.controller.js";
// import { isLoggedIn } from "../middlewares/auth.middleware.js";
// import { isTeacher } from "../middlewares/role.middleware.js";

const router = express.Router();

// router.use(isLoggedIn);

// Teacher & Admin can mark and view attendance
// router.post("/mark", isTeacher, markAttendance);
// router.get("/by-date", isTeacher, getAttendanceByDate);
// router.get("/student", isTeacher, getStudentAttendance);
// router.get("/class-report", isTeacher, getClassAttendanceReport);
router.post("/mark", markAttendance);
router.get("/by-date", getAttendanceByDate);
router.get("/student", getStudentAttendance);
router.get("/class-report", getClassAttendanceReport);

export default router;