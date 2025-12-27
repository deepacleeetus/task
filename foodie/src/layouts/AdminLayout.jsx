// src/layouts/AdminLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
