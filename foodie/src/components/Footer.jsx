import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-green-400 text-white py-8 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
     
        <div>
          <h2 className="text-2xl font-semibold mb-3">🍽️ FoodieHub</h2>
          <p className="text-sm text-gray-100">
            Your favorite place for fresh, tasty, and healthy meals — anytime, anywhere.
          </p>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/home" className="hover:underline">Home</Link></li>
            <li><Link to="/offers" className="hover:underline">Offers</Link></li>
            <li><Link to="/orders" className="hover:underline">Orders</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
          </ul>
        </div>

     
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <div className="flex items-center gap-2 text-sm mb-2">
            <MdOutlineEmail /> support@foodiehub.com
          </div>
          <div className="flex items-center gap-2 text-sm mb-4">
            <FaPhoneAlt /> +91 98765 43210
          </div>

          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gray-200">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gray-200">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gray-200">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-100 mt-8 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} FoodieHub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
