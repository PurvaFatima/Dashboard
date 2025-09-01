import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useSalesData } from "../hooks/useSalesData";

// Custom tooltip component for better styling
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-sm text-blue-600">
          Price: ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }

  return null;
};

export default function SalesChart() {
  const { data, error } = useSalesData();

  if (error) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold mb-4 text-gray-900">Bitcoin Price (USD)</h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="text-red-500 text-3xl mb-2">⚠️</div>
            <p className="text-red-500">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold mb-4 text-gray-900">Bitcoin Price (USD)</h2>
      {data && data.length > 0 ? (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280"
                tick={{ fill: '#6b7280' }}
                tickLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{ fill: '#6b7280' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ strokeWidth: 2, r: 4, fill: '#3b82f6' }}
                activeDot={{ r: 6, fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-gray-600">Loading Bitcoin price data...</p>
          </div>
        </div>
      )}
    </div>
  );
}