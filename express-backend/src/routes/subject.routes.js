import express from "express";
import {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
} from "../controllers/subject.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(isLoggedIn);

router.get("/getallsubjects", getAllSubjects);
router.get("/getsubjectbyid/:id", getSubjectById);
router.post("/createsubject", createSubject);
router.put("/updatesubject/:id", updateSubject);
router.delete("/deletesubject/:id", deleteSubject);

export default router;