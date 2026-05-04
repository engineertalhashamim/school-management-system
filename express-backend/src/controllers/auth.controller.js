import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Register
const register = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const existingUser = await User.findOne({ where: { email } });
  
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({ email, password, role });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );

  return res.status(201).json(
    new ApiResponse(201, {
      user: { id: user.id, email: user.email, role: user.role },
      token
    }, "User registered successfully")
  );
});

// Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isValid = await user.isPasswordCorrect(password);

  if (!isValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );

  return res.status(200).json(
    new ApiResponse(200, {
      user: { id: user.id, email: user.email, role: user.role },
      token
    }, "Login successful")
  );
});

// Logout
const logout = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, null, "Logout successful")
  );
});

export { register, login, logout };