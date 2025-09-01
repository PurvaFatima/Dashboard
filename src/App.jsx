import React from 'react';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Card from './layout/Card';
import MainContent from './layout/MainContent';
import Chart from './layout/Chart';
import Footer from './layout/Footer';

function App() {
  const navigationItems = [
    { label: 'Home', href: '#' },
    { label: 'Analytics', href: '#' },
    { label: 'Settings', href: '#' },
    { label: 'Profile', href: '#' },
    { label: 'Messages', href: '#' },
  ];

  const headerActions = [
    { label: 'New Item', variant: 'primary', onClick: () => console.log('New item clicked') },
    { label: 'Refresh', variant: 'secondary', onClick: () => console.log('Refresh clicked') },
  ];

  // Sample data for metrics
  const metricsData = [
    { title: 'Total Revenue', value: '$24,580', change: '+12.5%', positive: true },
    { title: 'Active Users', value: '1,248', change: '+8.2%', positive: true },
    { title: 'Pending Tasks', value: '24', change: '-3.1%', positive: false },
    { title: 'Conversion Rate', value: '4.8%', change: '+1.2%', positive: true },
  ];

  // Sample data for charts
  const barChartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
  ];

  const lineChartData = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 2000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
  ];

  const pieChartData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const scatterChartData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar navigationItems={navigationItems} />
        <div className="flex flex-col flex-1">
          <MainContent>
            <Header 
              title="Dashboard Overview" 
              subtitle="Welcome to your dashboard" 
              actions={headerActions} 
            />
            
            {/* Metrics Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {metricsData.map((metric, index) => (
                <Card key={index} className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900">{metric.title}</h3>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                    <p className={`ml-2 text-sm ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </p>
                  </div>
                </Card>
              ))}
            </section>
            
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Revenue Overview" className="flex flex-col">
                <Chart 
                  type="bar" 
                  data={barChartData} 
                  dataKeyX="name" 
                  dataKeyY="value" 
                  height={300}
                />
              </Card>
              
              <Card title="User Activity" className="flex flex-col">
                <Chart 
                  type="line" 
                  data={lineChartData} 
                  dataKeyX="name" 
                  dataKeyY="value" 
                  height={300}
                />
              </Card>
              
              <Card title="Market Share" className="flex flex-col">
                <Chart 
                  type="pie" 
                  data={pieChartData} 
                  dataKeyX="name" 
                  dataKeyY="value" 
                  height={300}
                />
              </Card>
              
              <Card title="Performance Metrics" className="flex flex-col">
                <Chart 
                  type="scatter" 
                  data={scatterChartData} 
                  dataKeyX="x" 
                  dataKeyY="y" 
                  height={300}
                />
              </Card>
            </div>
          </MainContent>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
