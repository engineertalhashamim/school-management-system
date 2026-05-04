import express from "express";
import {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
} from "../controllers/class.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(isLoggedIn);

router.get("/getallclasses", getAllClasses);
router.get("/getclassbyid/:id", getClassById);
router.post("/createclass", createClass);
router.put("/updateclass/:id", updateClass);
router.delete("/deleteclass/:id", deleteClass);

export default router;