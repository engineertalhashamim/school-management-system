import axios from "@/lib/axios";

export interface Student {
  id: number;
  name: string;
  email: string;
  roll: string;
  class: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getAllStudents = () =>
  axios.get("/students");

export const getStudentById = (id: number) =>
  axios.get(`/students/${id}`);

export const createStudent = (data: Omit<Student, 'id'>) =>
  axios.post("/students", data);

export const updateStudent = (id: number, data: Partial<Student>) =>
  axios.put(`/students/${id}`, data);

export const deleteStudent = (id: number) =>
  axios.delete(`/students/${id}`);