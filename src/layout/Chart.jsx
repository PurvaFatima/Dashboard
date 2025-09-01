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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

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
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKeyX} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKeyY} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        );
      
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKeyX} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={dataKeyY} 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        );
      
      case 'pie':
        return (
          <PieChart>
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
            <Tooltip />
            <Legend />
          </PieChart>
        );
      
      case 'scatter':
        return (
          <ScatterChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey={dataKeyX} name={dataKeyX} />
            <YAxis type="number" dataKey={dataKeyY} name={dataKeyY} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name={title} data={data} fill="#8884d8" />
          </ScatterChart>
        );
      
      default:
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKeyX} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKeyY} fill="#8884d8" />
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