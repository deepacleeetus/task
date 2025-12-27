// Logout.jsx or inside Navbar.jsx
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("user");
    localStorage.removeItem("token");


    navigate("/signin");
  };

  return (
    <button 
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
