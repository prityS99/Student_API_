// service.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/app/v1",
});

// --- AUTH INTERCEPTOR ---
// This automatically grabs the token from localStorage and adds it to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getStudents = async () => {
  const response = await fetch("http://localhost:3002/api/students", {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const result = await response.json();
  return result.data; 
};
// POST: Handles Multipart/Form-Data for Cloudinary images
export const createStudent = async (formData: FormData) => {
  const response = await API.post("/create/student", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// GET SINGLE: For the edit form
export const getEditStudent = async (id: String) => {
  const response = await API.get(`/edit/${id}`);
  return response.data.data;
};

// PUT: Updates student (can include new image)
export const updateStudent = async (id: String , formData: FormData) => {
  const response = await API.put(`/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// DELETE
export const deleteStudent = async (id: String) => {
  const response = await API.delete(`/delete/${id}`);
  return response.data;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Get token stored during login
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

