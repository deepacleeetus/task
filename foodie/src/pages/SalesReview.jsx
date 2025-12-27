import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesReview = () => {
  const [sales, setSales] = useState([]);
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    const storedSales = JSON.parse(localStorage.getItem("sales")) || [];
    const sortedSales = storedSales.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setSales(sortedSales);

    // ✅ Group sales by date
    const dailyTotals = {};
    sortedSales.forEach((sale) => {
      const date = sale.date.split(",")[0]; // remove time part
      dailyTotals[date] = (dailyTotals[date] || 0) + sale.total;
    });

    // ✅ Convert to array for chart
    const trendArray = Object.entries(dailyTotals).map(([date, total]) => ({
      date,
      total,
    }));

    setTrendData(trendArray);
  }, []);

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Sales Overview</h1>

      {/* ✅ Total Revenue */}
      <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-md w-fit">
        <p className="text-lg font-semibold text-green-700">
          💰 Total Revenue: ₹{totalRevenue.toFixed(2)}
        </p>
      </div>

      {/* ✅ Sales Trend Chart */}
      {trendData.length > 0 ? (
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            📈 Daily Sales Trend
          </h2>
          <div className="bg-white p-4 rounded-lg shadow border">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mb-10 text-center">
          No sales data available to show trend.
        </p>
      )}

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

export default SalesReview;
