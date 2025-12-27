import React from 'react';
import { IoTrashBin } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '../redux/cart';

const Addtocartcard = ({ item }) => {
  const dispatch = useDispatch();
    

  return (
    <div className="w-full h-[120px] p-2 bg-white rounded-xl shadow-md flex justify-between items-center mb-3">
      
      {/* Left Section - Image + Info */}
      <div className="flex items-center gap-4">
        <div className="w-[100px] h-[100px] rounded-lg overflow-hidden">
          <img
            src={item.food_image}
            alt={item.food_name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2">
          <div className="text-lg text-gray-700 font-semibold">
            {item.food_name}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center bg-gray-100 rounded-lg shadow-sm text-lg">
            <button
              onClick={() => dispatch(decreaseQuantity(item.id))}
              className="w-[30px] h-[30px] bg-white flex justify-center items-center text-green-600 hover:bg-gray-200 rounded-l"
            >
              -
            </button>

            <span className="w-[2.5] text-center text-green-600 font-semibold">
              {item.food_quantity}
            </span>

            <button
              onClick={() => dispatch(increaseQuantity(item.id))}
              className="w-[30px] h-[30px] bg-white flex justify-center items-center text-green-600 hover:bg-gray-200 rounded-r"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Price + Delete */}
      <div className="flex flex-col items-end justify-between h-full">
        <span className="text-lg text-green-600 font-semibold">
          ₹{(item.price || 0) * item.food_quantity}
        </span>
        <IoTrashBin
          onClick={() => dispatch(removeItem(item.id))}
          className="text-red-500 text-2xl cursor-pointer hover:text-red-700"
        />
      </div>
      
    </div>
  );
};

export default Addtocartcard;
