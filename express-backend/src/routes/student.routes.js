import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controllers/student.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(isLoggedIn);

router.get("/getallstudents", getAllStudents);
router.get("/getstudentbyid/:id", getStudentById);
router.post("/createstudent", createStudent);
router.put("/updatestudent/:id", updateStudent);
router.delete("/deletestudent/:id", deleteStudent);

export default router;