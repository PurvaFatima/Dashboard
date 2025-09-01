// Mock API service for demonstration purposes
// In a real application, this would be replaced with actual API calls

// Mock data for metrics
const mockMetrics = [
  { id: 1, title: 'Total Revenue', value: 24580, change: 12.5, positive: true },
  { id: 2, title: 'Active Users', value: 1248, change: 8.2, positive: true },
  { id: 3, title: 'Pending Tasks', value: 24, change: -3.1, positive: false },
  { id: 4, title: 'Conversion Rate', value: 4.8, change: 1.2, positive: true },
];

// Mock data for charts
const mockBarChartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

const mockLineChartData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 2000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

const mockPieChartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const mockScatterChartData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const fetchMetrics = async () => {
  // Simulate network delay
  await delay(800);
  
  // Randomly update values to simulate real-time changes
  const updatedMetrics = mockMetrics.map(metric => {
    // Generate small random changes to simulate real-time updates
    const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
    const newValue = Math.max(0, metric.value + change * 100); // Ensure non-negative values
    const newChange = metric.change + change; // Update change percentage
    
    return {
      ...metric,
      value: Math.round(newValue),
      change: parseFloat(newChange.toFixed(1))
    };
  });
  
  return updatedMetrics;
};

export const fetchBarChartData = async () => {
  await delay(500);
  
  // Randomly update values to simulate real-time changes
  const updatedData = mockBarChartData.map(item => ({
    ...item,
    value: Math.max(0, item.value + Math.floor((Math.random() - 0.5) * 500))
  }));
  
  return updatedData;
};

export const fetchLineChartData = async () => {
  await delay(500);
  
  // Add a new data point and remove the oldest one to simulate real-time updates
  const newData = [...mockLineChartData];
  newData.shift(); // Remove first item
  
  // Add new item with current day
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const nextDay = days[(days.indexOf(newData[newData.length - 1].name) + 1) % 7];
  newData.push({
    name: nextDay,
    value: Math.max(0, 3000 + Math.floor((Math.random() - 0.5) * 2000))
  });
  
  return newData;
};

export const fetchPieChartData = async () => {
  await delay(500);
  
  // Randomly update values to simulate real-time changes
  const updatedData = mockPieChartData.map(item => ({
    ...item,
    value: Math.max(0, item.value + Math.floor((Math.random() - 0.5) * 100))
  }));
  
  return updatedData;
};

export const fetchScatterChartData = async () => {
  await delay(500);
  
  // Randomly update values to simulate real-time changes
  const updatedData = mockScatterChartData.map(item => ({
    ...item,
    x: Math.max(0, item.x + Math.floor((Math.random() - 0.5) * 50)),
    y: Math.max(0, item.y + Math.floor((Math.random() - 0.5) * 50))
  }));
  
  return updatedData;
};

// Error simulation function (for testing error handling)
export const fetchMetricsWithError = async () => {
  await delay(800);
  
  // Simulate an error 20% of the time
  if (Math.random() < 0.2) {
    throw new Error('Failed to fetch metrics data. Please try again later.');
  }
  
  return fetchMetrics();
};