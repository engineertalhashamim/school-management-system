import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Subject from '../models/subject.model.js';
import Class from '../models/class.model.js';

// Get all subjects
const getAllSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.findAll({
    include: [{ model: Class, attributes: ['id', 'name', 'section'], through: { attributes: [] } }],
    order: [['name', 'ASC']]
  });

  return res.status(200).json(
    new ApiResponse(200, subjects, "Subjects fetched successfully")
  );
});

// Get subject by ID
const getSubjectById = asyncHandler(async (req, res) => {
  const subjectId = req.params.id;

  const subject = await Subject.findByPk(subjectId, {
    include: [{ model: Class, attributes: ['id', 'name', 'section'], through: { attributes: [] } }]
  });

  if (!subject) {
    throw new ApiError(404, `Subject with ID ${subjectId} not found`);
  }

  return res.status(200).json(
    new ApiResponse(200, subject, "Subject fetched successfully")
  );
});

// Create subject
const createSubject = asyncHandler(async (req, res) => {
  const { name, code, description, class_ids } = req.body;

  if (!name) throw new ApiError(400, "Subject name is required");
  if (!code) throw new ApiError(400, "Subject code is required");

  // Check if subject already exists
  const existingSubject = await Subject.findOne({ where: { code } });
  if (existingSubject) {
    throw new ApiError(409, "Subject with this code already exists");
  }

  // Create subject
  const subject = await Subject.create({ name, code, description });

  // Assign classes if provided
  if (class_ids && Array.isArray(class_ids) && class_ids.length > 0) {
    await subject.addClasses(class_ids);
  }

  // Fetch subject with classes
  const subjectWithClasses = await Subject.findByPk(subject.id, {
    include: [{ model: Class, attributes: ['id', 'name', 'section'], through: { attributes: [] } }]
  });

  return res.status(201).json(
    new ApiResponse(201, subjectWithClasses, "Subject created successfully")
  );
});

// Update subject
const updateSubject = asyncHandler(async (req, res) => {
  const subjectId = req.params.id;

  const subject = await Subject.findByPk(subjectId);

  if (!subject) {
    throw new ApiError(404, `Subject with ID ${subjectId} not found`);
  }

  const { name, code, description, class_ids } = req.body;

  await subject.update({ name, code, description });

  // Update class assignments if provided
  if (class_ids && Array.isArray(class_ids)) {
    await subject.setClasses(class_ids);
  }

  // Fetch subject with classes
  const subjectWithClasses = await Subject.findByPk(subjectId, {
    include: [{ model: Class, attributes: ['id', 'name', 'section'], through: { attributes: [] } }]
  });

  return res.status(200).json(
    new ApiResponse(200, subjectWithClasses, "Subject updated successfully")
  );
});

// Delete subject
const deleteSubject = asyncHandler(async (req, res) => {
  const subjectId = req.params.id;

  const subject = await Subject.findByPk(subjectId);

  if (!subject) {
    throw new ApiError(404, `Subject with ID ${subjectId} not found`);
  }

  await subject.destroy();

  return res.status(200).json(
    new ApiResponse(200, null, "Subject deleted successfully")
  );
});

export {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
};