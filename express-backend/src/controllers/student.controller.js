import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Student from '../models/student.model.js';
import Class from '../models/class.model.js';

// Get all students
const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.findAll({
    include: [{ model: Class, attributes: ['name', 'section'] }],
    order: [['id', 'DESC']]
  });

  return res.status(200).json(
    new ApiResponse(200, students, "Students fetched successfully")
  );
});

// Get student by ID
const getStudentById = asyncHandler(async (req, res) => {
  const studentId = req.params.id;

  const student = await Student.findByPk(studentId, {
    include: [{ model: Class, attributes: ['name', 'section'] }]
  });

  if (!student) {
    throw new ApiError(404, `Student with ID ${studentId} not found`);
  }

  return res.status(200).json(
    new ApiResponse(200, student, "Student fetched successfully")
  );
});

// Create student
const createStudent = asyncHandler(async (req, res) => {
  const { name, email, roll_number, class_id } = req.body;

  if (!name) throw new ApiError(400, "Name is required");
  if (!email) throw new ApiError(400, "Email is required");
  if (!roll_number) throw new ApiError(400, "Roll number is required");
  if (!class_id) throw new ApiError(400, "Class ID is required");

  // Check if class exists
  const classExists = await Class.findByPk(class_id);
  if (!classExists) {
    throw new ApiError(404, "Class not found");
  }

  // Check if email already exists
  const existingEmail = await Student.findOne({ where: { email } });
  if (existingEmail) {
    throw new ApiError(409, "Student with this email already exists");
  }

  // Check if roll_number already exists
  const existingRoll = await Student.findOne({ where: { roll_number } });
  if (existingRoll) {
    throw new ApiError(409, "Student with this roll number already exists");
  }

  const student = await Student.create({ name, email, roll_number, class_id });

  return res.status(201).json(
    new ApiResponse(201, student, "Student created successfully")
  );
});

// Update student
const updateStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;

  const student = await Student.findByPk(studentId);

  if (!student) {
    throw new ApiError(404, `Student with ID ${studentId} not found`);
  }

  const { name, email, roll_number, class_id } = req.body;

  await student.update({ name, email, roll_number, class_id });

  return res.status(200).json(
    new ApiResponse(200, student, "Student updated successfully")
  );
});

// Delete student
const deleteStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;

  const student = await Student.findByPk(studentId);

  if (!student) {
    throw new ApiError(404, `Student with ID ${studentId} not found`);
  }

  await student.destroy();

  return res.status(200).json(
    new ApiResponse(200, null, "Student deleted successfully")
  );
});

export {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};