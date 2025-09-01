// API service for fetching dashboard data
// This file contains functions for fetching data from various APIs

// Fetch Bitcoin price data
export async function fetchSalesData() {
  const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
  if (!res.ok) {
    throw new Error("Failed to fetch Bitcoin price data");
  }
  return res.json();
}

// Fetch metrics data (in a real app, this would be a real API endpoint)
export async function fetchMetricsData() {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real application, this would fetch from an actual API endpoint
  // For now, we'll return mock data that simulates real API responses
  return [
    { id: 1, title: 'Total Revenue', value: 24580, change: 12.5, positive: true },
    { id: 2, title: 'Active Users', value: 1248, change: 8.2, positive: true },
    { id: 3, title: 'Pending Tasks', value: 24, change: -3.1, positive: false },
    { id: 4, title: 'Conversion Rate', value: 4.8, change: 1.2, positive: true },
  ];
}

// Fetch bar chart data (in a real app, this would be a real API endpoint)
export async function fetchBarChartData() {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real application, this would fetch from an actual API endpoint
  // For now, we'll return mock data that simulates real API responses
  return [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
  ];
}

// Fetch line chart data (in a real app, this would be a real API endpoint)
export async function fetchLineChartData() {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real application, this would fetch from an actual API endpoint
  // For now, we'll return mock data that simulates real API responses
  return [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 2000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
  ];
}

// Fetch pie chart data (in a real app, this would be a real API endpoint)
export async function fetchPieChartData() {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real application, this would fetch from an actual API endpoint
  // For now, we'll return mock data that simulates real API responses
  return [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
}

// Fetch scatter chart data (in a real app, this would be a real API endpoint)
export async function fetchScatterChartData() {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real application, this would fetch from an actual API endpoint
  // For now, we'll return mock data that simulates real API responses
  return [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];
}