import axios from "axios";

const api = axios.create({
  baseURL: "https://student-slot-1.onrender.com/api", // Ensure this matches the backend
});

export const fetchTimeSlots = () => api.get("/timeslots");
export const registerStudent = (studentData) =>
  api.post("/register", studentData);
export const fetchStudents = () => api.get("/students");
export const deleteStudent = (studentId) =>
  api.delete(`/students/${studentId}`);

export default api;
