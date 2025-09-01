import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const Chart = ({ 
  type = 'bar', 
  data = [], 
  dataKeyX = 'name', 
  dataKeyY = 'value', 
  title,
  height = 300,
  className = ''
}) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey={dataKeyX} 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280' }} 
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280' }} 
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              itemStyle={{ color: '#1f2937' }}
              labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
            />
            <Legend 
              wrapperStyle={{ color: '#374151' }}
            />
            <Bar 
              dataKey={dataKeyY} 
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        );
      
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey={dataKeyX} 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280' }} 
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280' }} 
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              itemStyle={{ color: '#1f2937' }}
              labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
            />
            <Legend 
              wrapperStyle={{ color: '#374151' }}
            />
            <Line 
              type="monotone" 
              dataKey={dataKeyY} 
              stroke="#3b82f6" 
              activeDot={{ r: 8, fill: '#3b82f6' }} 
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4, fill: '#3b82f6' }}
            />
          </LineChart>
        );
      
      case 'pie':
        return (
          <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKeyY}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
            <Legend 
              wrapperStyle={{ color: '#374151' }}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        );
      
      case 'scatter':
        return (
          <ScatterChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              type="number" 
              dataKey={dataKeyX} 
              name={dataKeyX} 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280' }} 
              tickLine={false}
            />
            <YAxis 
              type="number" 
              dataKey={dataKeyY} 
              name={dataKeyY} 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280' }} 
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              itemStyle={{ color: '#1f2937' }}
              labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
            />
            <Legend 
              wrapperStyle={{ color: '#374151' }}
            />
            <Scatter 
              name={title} 
              data={data} 
              fill="#3b82f6"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Scatter>
          </ScatterChart>
        );
      
      default:
        return (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey={dataKeyX} 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280' }} 
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280' }} 
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              itemStyle={{ color: '#1f2937' }}
              labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
            />
            <Legend 
              wrapperStyle={{ color: '#374151' }}
            />
            <Bar dataKey={dataKeyY} fill="#3b82f6" />
          </BarChart>
        );
    }
  };

  return (
    <div className={`chart-container ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>}
      <div className="chart-wrapper" style={{ height: height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

Chart.propTypes = {
  type: PropTypes.oneOf(['bar', 'line', 'pie', 'scatter']),
  data: PropTypes.array.isRequired,
  dataKeyX: PropTypes.string,
  dataKeyY: PropTypes.string,
  title: PropTypes.string,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default Chart;