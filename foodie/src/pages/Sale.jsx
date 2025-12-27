import React, { useEffect, useState } from "react";

const Sale = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const storedSales = JSON.parse(localStorage.getItem("sales")) || [];

    // ✅ Sort by newest first
    const sortedSales = storedSales.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setSales(sortedSales);
  }, []);

  // ✅ Calculate total revenue
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Sales Report</h1>

      {/* ✅ Show Total Revenue */}
      <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-md w-fit">
        <p className="text-lg font-semibold text-green-700">
          💰 Total Revenue: ₹{totalRevenue.toFixed(2)}
        </p>
      </div>

      {/* ✅ Sales Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Customer</th>
              <th className="border border-gray-300 px-4 py-2">Items</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 ? (
              sales.map((sale, index) => (
                <tr
                  key={index}
                  className="border-t even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {sale.customer}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {sale.items && sale.items.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {sale.items.map((item, i) => (
                          <li key={i}>
                            {item.food_name} × {item.food_quantity}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No items"
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    ₹{sale.total.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {sale.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-6 font-medium"
                >
                  No sales records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sale;
