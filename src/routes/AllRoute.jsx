import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AddQuestion from "../pages/AddQuestion";
import AddExam from "../pages/AddExam";
import Exam from "../pages/Exam";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
const AllRoute = () => {
  // const { userRole } = useSelector((state) => state.auth); // Access the user role from Redux store
  const userRole = Cookies.get("userRole");
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/exam/:id" element={<Exam />} />

      {/* Admin Only Routes */}
      {userRole === "ADMIN" && (
        <>
          <Route path="/admin/add-question" element={<AddQuestion />} />
          <Route path="/admin/add-exam" element={<AddExam />} />
        </>
      )}

      {/* Redirect to Home or Login if not authenticated (optional) */}
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};

export default AllRoute;
