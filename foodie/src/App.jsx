import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FoodItems from "./pages/FoodItems";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Orders from "./pages/Orders";
import AdminHome from "./pages/AdminHome";
import Offers from "./pages/Offers";
import AdminLayout from "./layouts/AdminLayout";
import Sale from "./pages/Sale";
import About from "./pages/About";
import UserLayout from "./layouts/UserLayout";

const App = () => {
  return (
    <Routes>
      {/* Default route should be Home */}
      <Route path="/" element={<Home />} />

      {/* Auth Routes */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      {/* User Routes */}
       <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} /> {/* Default: Home */}
        <Route path="home" element={<Home />} />
        <Route path="offers" element={<Offers />} />
        <Route path="orders" element={<Orders />} />
        <Route path="about" element={<About />} />
        <Route path="fooditems/:category" element={<FoodItems />} />
      </Route>

      {/* ✅ Admin Routes (nested inside AdminLayout) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="home" element={<AdminHome />} />
        <Route path="offers" element={<Offers />} />
        <Route path="sale" element={<Sale />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Signin />} />
    </Routes>
  );
};

export default App;
