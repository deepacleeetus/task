import React from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import Addtocartcard from "./Addtocartcard";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cart";

const CartPopup = ({ onClose }) => {
  const { cartList } = useSelector((state) => state.cart);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const handleClearCart = () => {
 
    dispatch(clearCart());
    
  
};


  const subtotal = cartList.reduce(
    (acc, item) => acc + item.price * item.food_quantity,
    0
  );
  const deliveryCharge = subtotal > 0 ? 40 : 0;
  const gst = subtotal * 0.05;
  const total = subtotal + gst + deliveryCharge;

  
 const handleCheckout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "Guest";

  const orderTime = new Date().toLocaleString();
  const orderData = {
    items: cartList,
    subtotal,
    deliveryCharge,
    gst,
    total,
    orderTime,
  };

  
  const newSale = {
    customer: username,
    items: cartList,
    total,
    date: orderTime,
  };

  const existingSales = JSON.parse(localStorage.getItem("sales")) || [];
  const updatedSales = [...existingSales, newSale];

  localStorage.setItem("sales", JSON.stringify(updatedSales)); 
  localStorage.setItem("order", JSON.stringify(orderData)); 
  localStorage.removeItem("cart");

  alert("Order placed successfully!");
  handleClearCart();
  navigate("/orders"); 
};

  return (
    <div
      className="fixed inset-0 flex justify-end z-50 bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-[400px] h-full bg-white shadow-xl p-5 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
       
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold text-gray-700">Your Cart</h2>
          <button onClick={onClose}>
            <IoClose className="text-2xl text-gray-600 hover:text-red-500" />
          </button>
        </div>

       
        <div className="flex-1 overflow-y-auto">
          {cartList.length > 0 ? (
            <div className="flex flex-col gap-4">
              {cartList.map((item) => (
                <Addtocartcard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              🛒 Your cart is empty.
            </p>
          )}
        </div>

       
        {cartList.length > 0 && (
          <div className="mt-6 bg-gray-50 border-t pt-4 rounded-t-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Bill Summary
            </h2>
            <div className="flex justify-between py-1 text-gray-700 text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 text-gray-700 text-sm">
              <span>Delivery Charges</span>
              <span>₹{deliveryCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 text-gray-700 text-sm">
              <span>GST (5%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-base font-bold text-green-700">
              <span>Total Payable</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button
                   onClick={handleClearCart}
                  className="w-full mt-2 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
                    >
                   Clear Cart
                  </button>
            <button
              onClick={handleCheckout} 
              className="w-full mt-4 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPopup;
