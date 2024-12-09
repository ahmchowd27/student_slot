import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Ensure this matches the backend
});

export const fetchTimeSlots = () => api.get("/timeslots");
export const registerStudent = (studentData) =>
  api.post("/register", studentData);
export const fetchStudents = () => api.get("/students");
export const deleteStudent = (studentId) =>
  api.delete(`/students/${studentId}`);

export default api;
