import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Categories from "../Categories"; // this is your array file
import FoodItems from "./FoodItems";
import { useSelector } from "react-redux";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  const searchTerm = useSelector((state) => state.search.term.toLowerCase());


  useEffect(() => {
    const updateAvailability = () => {
      const hour = new Date().getHours();

      const updated = Categories.map((cat) => {
        if (cat.name === "breakfast")
          return { ...cat, available: hour >= 6 && hour < 10 };
         if(["main_course", "pasta", "pizza","soups"].includes(cat.name))
          return { ...cat, available: hour >= 11 && hour < 23};
       
        return cat;
      });

      setAvailableCategories(updated);
    };

    updateAvailability();
    const timer = setInterval(updateAvailability, 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <>
   
      <div className="flex flex-wrap justify-center items-center gap-6 w-full p-5">
        {availableCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => cat.available && setSelectedCategory(cat.name)}
            disabled={!cat.available}
            title={
              cat.name === "breakfast"
                ? "Available 6 AM - 11 AM"
                : cat.name === "main_course"
                ? "Available after 11"
              
                : "Available after 11"
            }
            className={`flex flex-col justify-center items-center shadow-md rounded-xl w-32 h-32 transition-transform duration-300 ${
              cat.available
                ? "bg-green-100 hover:scale-105 hover:shadow-lg cursor-pointer"
                : "bg-gray-300 opacity-70 cursor-not-allowed"
            }`}
          >
            <div className="text-4xl text-green-600 mb-2">{cat.image}</div>
            <h2 className="text-base font-semibold text-gray-800">
              {cat.name}
            </h2>
            <p
              className={`text-sm mt-1 ${
                cat.available ? "text-green-600" : "text-red-600"
              }`}
            >
             
            </p>
          </button>
        ))}
      </div>

    
      <FoodItems category={selectedCategory} />
    </>
  );
}

export default Home;
