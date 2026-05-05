import axios from "@/lib/axios";

export interface ClassItem {
  id: number;
  name: string;
  section: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getAllClasses = () => axios.get<{ data: ClassItem[] }>("/classes/getallclasses");
export const getClassById = (id: number) => axios.get<{ data: ClassItem }>(`/classes/getclassbyid/${id}`);
export const createClass = (payload: Omit<ClassItem, "id" | "createdAt" | "updatedAt">) =>
  axios.post("/classes/createclass", payload);
export const updateClass = (
  id: number,
  payload: Partial<Omit<ClassItem, "id" | "createdAt" | "updatedAt">>
) => axios.put(`/classes/updateclass/${id}`, payload);
export const deleteClass = (id: number) => axios.delete(`/classes/deleteclass/${id}`);
