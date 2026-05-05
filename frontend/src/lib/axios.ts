import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Token attach karne ke liye
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;