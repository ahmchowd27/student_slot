import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import RegisterPage from "./Register";
import ManageStudentsPage from "./ManageStudentsPage";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/students" element={<ManageStudentsPage />} />
    </Routes>
  </Router>
);

export default App;
