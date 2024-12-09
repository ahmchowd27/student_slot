import React, { useState, useEffect } from "react";
import { fetchTimeSlots, registerStudent } from "./api";

const Register = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    projectTitle: "",
    email: "",
    phoneNumber: "",
    timeSlot: "",
  });
  const [timeSlots, setTimeSlots] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // To hold the error message
  const [showError, setShowError] = useState(false); // To manage modal visibility

  useEffect(() => {
    fetchTimeSlotsData();
  }, []);

  const fetchTimeSlotsData = async () => {
    try {
      const response = await fetchTimeSlots();
      setTimeSlots(response.data);
    } catch (error) {
      console.error("Error fetching time slots:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 3 && value.length <= 6) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
    }
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        slotNumber: parseInt(formData.timeSlot, 10),
      };
      await registerStudent(payload);
      alert("Student registered successfully!"); // Temporary success alert
      fetchTimeSlotsData(); // Refresh time slots
      setFormData({
        studentId: "",
        firstName: "",
        lastName: "",
        projectTitle: "",
        email: "",
        phoneNumber: "",
        timeSlot: "",
      });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "Failed to register student."
      );
      setShowError(true); // Show the error modal
    }
  };

  const closeErrorModal = () => {
    setShowError(false); // Hide the modal
    setErrorMessage(""); // Clear the error message
  };

  return (
    <div>
      <h1>Register Student</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="studentId"
          placeholder="Student ID (8 digits)"
          value={formData.studentId}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
            setFormData({ ...formData, studentId: value });
          }}
          maxLength={8}
          required
        />
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          name="projectTitle"
          placeholder="Project Title"
          value={formData.projectTitle}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phoneNumber"
          placeholder="Phone Number (999-999-9999)"
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
          required
        />
        <select
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          required
        >
          <option value="">Select Time Slot</option>
          {timeSlots.map((slot) => (
            <option key={slot.slotNumber} value={slot.slotNumber}>
              {`${slot.date}, ${slot.time} (${slot.remainingSeats} seats remaining)`}
            </option>
          ))}
        </select>
        <button type="submit">Register</button>
      </form>

      {/* Error Modal */}
      {showError && (
        <div className="modal">
          <div className="modal-content">
            <p>{errorMessage}</p>
            <button onClick={closeErrorModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
