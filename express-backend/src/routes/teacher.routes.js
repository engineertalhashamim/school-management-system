import express from "express";
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
} from "../controllers/teacher.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(isLoggedIn);

router.get("/getallteachers", getAllTeachers);
router.get("/getteacherbyid/:id", getTeacherById);
router.post("/createteacher", createTeacher);
router.put("/updateteacher/:id", updateTeacher);
router.delete("/deleteteacher/:id", deleteTeacher);

export default router;