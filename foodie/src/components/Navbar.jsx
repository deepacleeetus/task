import React, { useState, useEffect } from "react";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";
import { PiBowlFoodBold } from "react-icons/pi";
import { BiSearchAlt2 } from "react-icons/bi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartPopup from "./Cartpopup";
import { setSearchTerm } from "../redux/search";

function Navbar() {
  const [username, setUsername] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartCount } = useSelector((state) => state.cart);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.username) setUsername(storedUser.username);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUsername("");
    navigate("/signin");
  };

  return (
    <>
      <nav className="w-full bg-green-400 shadow-md">
        <div className="flex justify-between items-center px-4 md:px-8 h-16">
         
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-[45px] h-[45px] bg-white flex justify-center items-center rounded-full shadow-sm">
              <PiBowlFoodBold className="text-2xl text-amber-600" />
            </div>
            <h1 className="text-lg md:text-xl font-semibold text-gray-700">
              FoodieHub
            </h1>
          </div>

         
          <form
            className="hidden md:flex items-center bg-white rounded-full px-3 py-1 w-[300px] lg:w-[400px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <BiSearchAlt2 className="text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search items..."
              className="ml-2 w-full outline-none text-gray-700 text-sm"
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </form>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/home"
              className="flex items-center gap-1 text-gray-700 hover:text-amber-600 transition"
            >
              <FaHome className="text-xl" />
              <span className="font-medium">Home</span>
            </Link>

            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 hover:text-amber-600 transition"
            >
              <HiOutlineShoppingCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </button>

            {username ? (
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold text-sm">
                  Hi, {username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="text-white font-medium hover:underline"
              >
                Sign In
              </Link>
            )}
          </div>

          
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        
        {menuOpen && (
          <div className="md:hidden bg-green-300 flex flex-col items-center gap-4 py-4">
            <form
              className="flex items-center bg-white rounded-full px-3 py-1 w-[90%]"
              onSubmit={(e) => e.preventDefault()}
            >
              <BiSearchAlt2 className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 w-full outline-none text-gray-700 text-sm"
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              />
            </form>

            <Link
              to="/home"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 font-medium hover:text-amber-600"
            >
              Home
            </Link>

            <button
              onClick={() => {
                setIsCartOpen(true);
                setMenuOpen(false);
              }}
              className="flex items-center gap-1 text-gray-700 hover:text-amber-600"
            >
              <HiOutlineShoppingCart className="text-xl" />
              Cart ({cartCount})
            </button>

            {username ? (
              <>
                <span className="text-white font-semibold">Hi, {username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="text-white font-medium hover:underline"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </nav>

      {isCartOpen && <CartPopup onClose={() => setIsCartOpen(false)} />}
    </>
  );
}

export default Navbar;
