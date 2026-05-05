import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, sequelize } from './config/db.js';

import User from './models/user.model.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import classRoutes from './routes/class.routes.js';
import studentRoutes from './routes/student.routes.js';
import subjectRoutes from './routes/subject.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import attendanceRoutes from './routes/attendance.routes.js';
// import attendanceRoutes from './routes/attendance.routes.js';

import { errorHandler } from './middlewares/error.middleware.js';
import './models/associations.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://192.168.100.6:3000', 'http://localhost:3000'],
  credentials: true
}));

// app.use(cors());
app.use(express.json());

await connectDB();

await sequelize.sync({ alter: false });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/teachers", teacherRoutes);
app.use('/api/attendance', attendanceRoutes);
// app.use('/api/attendance', attendanceRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'School Management API is running!' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});