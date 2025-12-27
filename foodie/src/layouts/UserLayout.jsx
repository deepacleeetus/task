// src/layouts/AdminLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";


const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <Outlet /> 
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
