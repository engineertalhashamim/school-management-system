import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Class from '../models/class.model.js';
import Student from '../models/student.model.js';

// Get all classes
const getAllClasses = asyncHandler(async (req, res) => {
  const classes = await Class.findAll({
    order: [['name', 'ASC'], ['section', 'ASC']]
  });

  return res.status(200).json(
    new ApiResponse(200, classes, "Classes fetched successfully")
  );
});

// Get single class with students
const getClassById = asyncHandler(async (req, res) => {
  const classId = req.params.id;

  const classItem = await Class.findByPk(classId, {
    include: [{ model: Student, attributes: ['id', 'name', 'email', 'roll_number'] }]
  });

  if (!classItem) {
    throw new ApiError(404, `Class with ID ${classId} not found`);
  }

  return res.status(200).json(
    new ApiResponse(200, classItem, "Class fetched successfully")
  );
});

// Create new class
const createClass = asyncHandler(async (req, res) => {
  const { name, section } = req.body;

  if (!name) {
    throw new ApiError(400, "Class name is required");
  }

  const newClass = await Class.create({ name, section });

  return res.status(201).json(
    new ApiResponse(201, newClass, "Class created successfully")
  );
});

// Update class
const updateClass = asyncHandler(async (req, res) => {
  const classId = req.params.id;
  const { name, section } = req.body;

  const classItem = await Class.findByPk(classId);

  if (!classItem) {
    throw new ApiError(404, `Class with ID ${classId} not found`);
  }

  await classItem.update({ name, section });

  return res.status(200).json(
    new ApiResponse(200, classItem, "Class updated successfully")
  );
});

// Delete class
const deleteClass = asyncHandler(async (req, res) => {
  const classId = req.params.id;

  const classItem = await Class.findByPk(classId);

  if (!classItem) {
    throw new ApiError(404, `Class with ID ${classId} not found`);
  }

  // Checking if class has students
  const studentCount = await Student.count({ where: { class_id: classId } });

  if (studentCount > 0) {
    throw new ApiError(400, `Cannot delete class. ${studentCount} student(s) are enrolled in this class.`);
  }

  await classItem.destroy();

  return res.status(200).json(
    new ApiResponse(200, null, "Class deleted successfully")
  );
});

export {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
};