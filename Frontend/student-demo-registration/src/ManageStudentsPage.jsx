import React, { useState, useEffect } from "react";
import { fetchStudents, deleteStudent } from "./api";

const ManageStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const fetchStudentsData = async () => {
    try {
      const response = await fetchStudents();
      setStudents(response.data);
    } catch (error) {
      setMessage("Failed to fetch students.");
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await deleteStudent(studentId);
      setMessage(`Student ${studentId} removed successfully.`);
      fetchStudentsData(); // Refresh student list
    } catch (error) {
      setMessage("Failed to remove student.");
    }
  };

  return (
    <div>
      <h1>Registered Students</h1>
      {message && <p>{message}</p>}
      <ul>
        {students.map((student) => (
          <li key={student.studentId}>
            {`${student.firstName} ${student.lastName} - ${student.projectTitle}`}
            <button onClick={() => handleDelete(student.studentId)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStudentsPage;
