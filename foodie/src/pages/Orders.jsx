import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
  const [order, setOrder] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes

  // ✅ Load order data safely from localStorage
  useEffect(() => {
    try {
      const storedOrder = JSON.parse(localStorage.getItem("order"));
      if (storedOrder) setOrder(storedOrder);
    } catch (error) {
      console.error("Error loading order:", error);
    }
  }, []);

  // ✅ Countdown Timer only runs if order exists
  useEffect(() => {
    if (!order) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [order]);

  // ✅ Auto-clear order when timer ends
  useEffect(() => {
    if (timeLeft === 0) {
      localStorage.removeItem("order");
      setOrder(null);
    }
  }, [timeLeft]);

  // ✅ Time formatting helper
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const user = JSON.parse(localStorage.getItem("user"));

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <p>No recent order found.</p>
        <Link
          to="/home"
          className="mt-3 text-green-600 font-semibold hover:underline"
        >
          Go Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg text-center">
        {/* ✅ Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full animate-bounce">
            <span className="text-5xl text-green-600">✅</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-green-600 mb-3">
          Hi {user?.username || "Guest"}, your order is confirmed!
        </h1>

        <p className="text-gray-700 mb-4">
          <strong>Order Time:</strong> {order.orderTime}
        </p>

        <p className="text-lg text-gray-800 font-semibold mb-6">
          🚴 Your order will arrive in{" "}
          <span className="text-green-600">{formatTime(timeLeft)}</span>
        </p>

        {/* ✅ Order Summary */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Order Summary
        </h2>

        {order.items?.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-2 text-gray-700"
          >
            <span>
              {item.food_name} × {item.food_quantity}
            </span>
            <span>₹{(item.price * item.food_quantity).toFixed(2)}</span>
          </div>
        ))}

        <div className="border-t mt-4 pt-3 text-gray-800">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>₹{order.subtotal?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery:</span>
            <span>₹{order.deliveryCharge?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>GST:</span>
            <span>₹{order.gst?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between font-bold text-green-700 mt-2">
            <span>Total:</span>
            <span>₹{order.total?.toFixed(2) || "0.00"}</span>
          </div>
        </div>

        <Link
          to="/home"
          className="block text-center bg-green-600 text-white mt-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Orders;
