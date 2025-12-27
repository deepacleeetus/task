import React from "react";
import { useNavigate } from "react-router-dom";
import Adminsidebar from "../components/Adminsidebar";
import SalesReview from "./SalesReview";

function AdminHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/signin");
  };

  return (
    <>
     

      <div className="flex">
       
        <div className="flex-1 p-6">
          
        <SalesReview/>

          <div className="mt-6">
           
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
