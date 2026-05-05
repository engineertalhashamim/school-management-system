import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Attendance from '../models/attendance.model.js';
import Student from '../models/student.model.js';
import Class from '../models/class.model.js';

// 1. Mark attendance (Multiple students ek saath)
const markAttendance = asyncHandler(async (req, res) => {
  const { date, records } = req.body;

  if (!date) throw new ApiError(400, "Date is required (YYYY-MM-DD)");
  if (!records || !Array.isArray(records) || records.length === 0) {
    throw new ApiError(400, "Attendance records array is required");
  }

  // Validate each record
  for (const record of records) {
    if (!record.student_id) throw new ApiError(400, "student_id is required in each record");
    if (!record.status) throw new ApiError(400, "status is required in each record");
    if (!['present', 'absent', 'leave'].includes(record.status)) {
      throw new ApiError(400, "Status must be 'present', 'absent', or 'leave'");
    }
  }

  // Upsert (update if exists, insert if not)
  const results = [];
  for (const record of records) {
    const [attendance, created] = await Attendance.upsert({
      student_id: record.student_id,
      date: date,
      status: record.status
    });
    results.push({ student_id: record.student_id, status: record.status, created });
  }

  return res.status(200).json(
    new ApiResponse(200, results, "Attendance marked successfully")
  );
});

// 2. Get attendance by date (with optional class filter)
const getAttendanceByDate = asyncHandler(async (req, res) => {
  const { date, class_id } = req.query;

  if (!date) throw new ApiError(400, "Date is required (YYYY-MM-DD)");

  // Build where condition for students
  const studentWhere = {};
  if (class_id) studentWhere.class_id = class_id;

  // Get all students (filtered by class if provided)
  const students = await Student.findAll({
    where: studentWhere,
    include: [{ model: Class, attributes: ['name', 'section'] }],
    order: [['name', 'ASC']]
  });

  // Get attendance for the date
  const attendanceRecords = await Attendance.findAll({ where: { date } });

  // Merge student data with attendance status
  const result = students.map(student => {
    const attendance = attendanceRecords.find(a => a.student_id === student.id);
    return {
      id: student.id,
      name: student.name,
      roll_number: student.roll_number,
      email: student.email,
      class: student.Class ? `${student.Class.name}${student.Class.section ? `-${student.Class.section}` : ''}` : null,
      status: attendance ? attendance.status : 'not_marked'
    };
  });

  const summary = {
    total: result.length,
    present: result.filter(s => s.status === 'present').length,
    absent: result.filter(s => s.status === 'absent').length,
    leave: result.filter(s => s.status === 'leave').length,
    not_marked: result.filter(s => s.status === 'not_marked').length
  };

  return res.status(200).json(
    new ApiResponse(200, { date, records: result, summary }, "Attendance fetched successfully")
  );
});

// 3. Get student's attendance history
const getStudentAttendance = asyncHandler(async (req, res) => {
  const { student_id, start_date, end_date } = req.query;

  if (!student_id) throw new ApiError(400, "student_id is required");

  const where = { student_id };
  if (start_date) where.date = { [Op.gte]: start_date };
  if (end_date) where.date = { [Op.lte]: end_date };

  const attendance = await Attendance.findAll({
    where,
    order: [['date', 'DESC']]
  });

  const summary = {
    present: attendance.filter(a => a.status === 'present').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    leave: attendance.filter(a => a.status === 'leave').length,
    total: attendance.length
  };

  return res.status(200).json(
    new ApiResponse(200, { records: attendance, summary }, "Student attendance fetched")
  );
});

// 4. Get attendance report for a class (date range)
const getClassAttendanceReport = asyncHandler(async (req, res) => {
  const { class_id, start_date, end_date } = req.query;

  if (!class_id) throw new ApiError(400, "class_id is required");
  if (!start_date || !end_date) throw new ApiError(400, "start_date and end_date are required");

  const students = await Student.findAll({
    where: { class_id }
  });

  const attendance = await Attendance.findAll({
    where: {
      date: { [Op.between]: [start_date, end_date] }
    }
  });

  const report = students.map(student => {
    const studentAttendance = attendance.filter(a => a.student_id === student.id);
    return {
      student_id: student.id,
      name: student.name,
      roll_number: student.roll_number,
      present: studentAttendance.filter(a => a.status === 'present').length,
      absent: studentAttendance.filter(a => a.status === 'absent').length,
      leave: studentAttendance.filter(a => a.status === 'leave').length,
      total_days: studentAttendance.length
    };
  });

  return res.status(200).json(
    new ApiResponse(200, { start_date, end_date, report }, "Class attendance report fetched")
  );
});

export {
  markAttendance,
  getAttendanceByDate,
  getStudentAttendance,
  getClassAttendanceReport
};