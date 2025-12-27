import React from "react";
import { FaBars } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-800 px-6 py-3 flex justify-between items-center shadow-md">
      {/* Left Side */}
      <div className="flex items-center text-xl">
        <FaBars className="text-white me-4 cursor-pointer" />
        <span className="text-white font-semibold">Admin</span>
      </div>

      {/* Right Side Menu */}
      <ul className="flex gap-6">
        <li>
          <NavLink
            to="/admin/home"
            className={({ isActive }) =>
              `text-white hover:underline ${
                isActive ? "font-bold text-yellow-400 underline" : ""
              }`
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/sale"
            className={({ isActive }) =>
              `text-white hover:underline ${
                isActive ? "font-bold text-yellow-400 underline" : ""
              }`
            }
          >
            Sale
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/offers"
            className={({ isActive }) =>
              `text-white hover:underline ${
                isActive ? "font-bold text-yellow-400 underline" : ""
              }`
            }
          >
            Offers
          </NavLink>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="text-white hover:underline bg-transparent border-none cursor-pointer"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
