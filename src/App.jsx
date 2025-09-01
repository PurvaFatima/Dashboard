import React from 'react';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Card from './layout/Card';
import MainContent from './layout/MainContent';
import Chart from './layout/Chart';

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
    <div className="h-screen flex">
      <Sidebar navigationItems={navigationItems} />
      <MainContent>
        <Header 
          title="Dashboard Overview" 
          subtitle="Welcome to your dashboard" 
          actions={headerActions} 
        />
        
        {/* Charts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
          <Card title="Revenue Overview">
            <Chart 
              type="bar" 
              data={barChartData} 
              dataKeyX="name" 
              dataKeyY="value" 
              height={300}
            />
          </Card>
          
          <Card title="User Activity">
            <Chart 
              type="line" 
              data={lineChartData} 
              dataKeyX="name" 
              dataKeyY="value" 
              height={300}
            />
          </Card>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Card title="Market Share">
            <Chart 
              type="pie" 
              data={pieChartData} 
              dataKeyX="name" 
              dataKeyY="value" 
              height={300}
            />
          </Card>
          
          <Card title="Performance Metrics">
            <Chart 
              type="scatter" 
              data={scatterChartData} 
              dataKeyX="x" 
              dataKeyY="y" 
              height={300}
            />
          </Card>
        </section>
      </MainContent>
    </div>
  );
}

export default App;
