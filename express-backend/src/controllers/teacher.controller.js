import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Teacher from '../models/teacher.model.js';
import Class from '../models/class.model.js';
import Subject from '../models/subject.model.js';

// Get all teachers with their classes and subjects
const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.findAll({
    include: [
      { model: Class, attributes: ['id', 'name', 'section'], through: { attributes: [] } },
      { model: Subject, attributes: ['id', 'name', 'code'], through: { attributes: [] } }
    ],
    order: [['id', 'DESC']]
  });

  return res.status(200).json(
    new ApiResponse(200, teachers, "Teachers fetched successfully")
  );
});

// Get teacher by ID with classes and subjects
const getTeacherById = asyncHandler(async (req, res) => {
  const teacherId = req.params.id;

  const teacher = await Teacher.findByPk(teacherId, {
    include: [
      { model: Class, attributes: ['id', 'name', 'section'], through: { attributes: [] } },
      { model: Subject, attributes: ['id', 'name', 'code'], through: { attributes: [] } }
    ]
  });

  if (!teacher) {
    throw new ApiError(404, `Teacher with ID ${teacherId} not found`);
  }

  return res.status(200).json(
    new ApiResponse(200, teacher, "Teacher fetched successfully")
  );
});

// Create teacher with classes and subjects
const createTeacher = asyncHandler(async (req, res) => {
  const { name, email, qualification, phone, address, class_ids, subject_ids } = req.body;

  if (!name) throw new ApiError(400, "Name is required");
  if (!email) throw new ApiError(400, "Email is required");

  // Check if teacher already exists
  const existingTeacher = await Teacher.findOne({ where: { email } });
  if (existingTeacher) {
    throw new ApiError(409, "Teacher with this email already exists");
  }

  // Create teacher
  const teacher = await Teacher.create({
    name,
    email,
    qualification,
    phone,
    address
  });

  // Assign classes if provided
  if (class_ids && Array.isArray(class_ids) && class_ids.length > 0) {
    await teacher.addClasses(class_ids);
  }

  // Assign subjects if provided
  if (subject_ids && Array.isArray(subject_ids) && subject_ids.length > 0) {
    await teacher.addSubjects(subject_ids);
  }

  // Fetch teacher with relations
  const teacherWithRelations = await Teacher.findByPk(teacher.id, {
    include: [
      { model: Class, attributes: ['id', 'name', 'section'], through: { attributes: [] } },
      { model: Subject, attributes: ['id', 'name', 'code'], through: { attributes: [] } }
    ]
  });

  return res.status(201).json(
    new ApiResponse(201, teacherWithRelations, "Teacher created successfully")
  );
});

// Update teacher
const updateTeacher = asyncHandler(async (req, res) => {
  const teacherId = req.params.id;

  const teacher = await Teacher.findByPk(teacherId);

  if (!teacher) {
    throw new ApiError(404, `Teacher with ID ${teacherId} not found`);
  }

  const { name, email, qualification, phone, address, class_ids, subject_ids } = req.body;

  // Update teacher details
  await teacher.update({
    name,
    email,
    qualification,
    phone,
    address
  });

  // Update class assignments if provided
  if (class_ids && Array.isArray(class_ids)) {
    await teacher.setClasses(class_ids);
  }

  // Update subject assignments if provided
  if (subject_ids && Array.isArray(subject_ids)) {
    await teacher.setSubjects(subject_ids);
  }

  // Fetch teacher with relations
  const teacherWithRelations = await Teacher.findByPk(teacherId, {
    include: [
      { model: Class, attributes: ['id', 'name', 'section'], through: { attributes: [] } },
      { model: Subject, attributes: ['id', 'name', 'code'], through: { attributes: [] } }
    ]
  });

  return res.status(200).json(
    new ApiResponse(200, teacherWithRelations, "Teacher updated successfully")
  );
});

// Delete teacher
const deleteTeacher = asyncHandler(async (req, res) => {
  const teacherId = req.params.id;

  const teacher = await Teacher.findByPk(teacherId);

  if (!teacher) {
    throw new ApiError(404, `Teacher with ID ${teacherId} not found`);
  }

  await teacher.destroy();

  return res.status(200).json(
    new ApiResponse(200, null, "Teacher deleted successfully")
  );
});

export {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
};