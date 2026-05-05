import axios from "@/lib/axios";

export const login = (data: any) =>
  axios.post("/auth/login", data);

export const signup = (data: any) =>
  axios.post("/auth/signup", data);

export const getMe = () => axios.get("/auth/me");