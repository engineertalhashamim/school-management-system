let students = [
  {
    id: 1,
    name: "Ali Ahmed",
    email: "ali@gmail.com",
    roll: "SMS-001",
    class: "10A",
  },
  {
    id: 2,
    name: "Sara Khan",
    email: "sara@gmail.com",
    roll: "SMS-002",
    class: "10B",
  },
  {
    id: 3,
    name: "Usman Malik",
    email: "usman@gmail.com",
    roll: "SMS-003",
    class: "9A",
  },
];

const getAllStudents = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Students fetched successfully",
    data: students,
  });
};

const getStudentById = async (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Student fetched successfully",
    data: student,
  });
};

const createStudent = async (req, res) => {
  const { name, email, roll, class: className } = req.body;

  if (!name || !email || !roll || !className) {
    return res.status(400).json({
      success: false,
      message: "Sab fields bharni zaroori hain",
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    email,
    roll,
    class: className,
  };

  students.push(newStudent);

  return res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent,
  });
};

const updateStudent = async (req, res) => {
  const index = students.findIndex((s) => s.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  students[index] = { ...students[index], ...req.body };

  return res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: students[index],
  });
};

const deleteStudent = async (req, res) => {
  const index = students.findIndex((s) => s.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  students.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: {},
  });
};

export {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
