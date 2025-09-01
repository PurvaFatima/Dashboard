import React from 'react';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Card from './layout/Card';
import MainContent from './layout/MainContent';
import Chart from './layout/Chart';
import Footer from './layout/Footer';
import { useMetrics } from './hooks/useMetrics';
import { 
  useBarChartData, 
  useLineChartData, 
  usePieChartData, 
  useScatterChartData 
} from './hooks/useChartData';

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
    { label: 'Refresh', variant: 'secondary', onClick: () => window.location.reload() },
  ];

  // Fetch data using React Query hooks
  const { data: metricsData, isLoading: metricsLoading, isError: metricsError, error: metricsErrorMessage } = useMetrics();
  const { data: barChartData, isLoading: barChartLoading, isError: barChartError } = useBarChartData();
  const { data: lineChartData, isLoading: lineChartLoading, isError: lineChartError } = useLineChartData();
  const { data: pieChartData, isLoading: pieChartLoading, isError: pieChartError } = usePieChartData();
  const { data: scatterChartData, isLoading: scatterChartLoading, isError: scatterChartError } = useScatterChartData();

  // Loading state for metrics
  if (metricsLoading) {
    return (
      <div className="h-screen flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar navigationItems={navigationItems} />
          <div className="flex flex-col flex-1">
            <MainContent>
              <Header 
                title="Dashboard Overview" 
                subtitle="Loading dashboard data..." 
                actions={headerActions} 
              />
              <div className="flex justify-center items-center h-full">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-600">Loading dashboard data...</p>
                </div>
              </div>
            </MainContent>
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  // Error state for metrics
  if (metricsError) {
    return (
      <div className="h-screen flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar navigationItems={navigationItems} />
          <div className="flex flex-col flex-1">
            <MainContent>
              <Header 
                title="Dashboard Overview" 
                subtitle="Error loading dashboard data" 
                actions={headerActions} 
              />
              <div className="flex justify-center items-center h-full">
                <div className="text-center">
                  <div className="text-red-500 text-5xl mb-4">⚠️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h3>
                  <p className="text-gray-600 mb-4">{metricsErrorMessage?.message || 'Failed to load dashboard metrics. Please try again later.'}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </MainContent>
            <Footer />
          </div>
        </div>
      </div>
    );
  }

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
              {metricsData && metricsData.map((metric) => (
                <Card key={metric.id} className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900">{metric.title}</h3>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-3xl font-bold text-gray-900">
                      {metric.title === 'Total Revenue' ? `$${metric.value.toLocaleString()}` : 
                       metric.title === 'Conversion Rate' ? `${metric.value}%` : 
                       metric.value.toLocaleString()}
                    </p>
                    <p className={`ml-2 text-sm ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change >= 0 ? '+' : ''}{metric.change}%
                    </p>
                  </div>
                </Card>
              ))}
            </section>
            
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Revenue Overview" className="flex flex-col">
                {barChartLoading ? (
                  <div className="flex justify-center items-center h-80">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : barChartError ? (
                  <div className="flex justify-center items-center h-80">
                    <p className="text-red-500">Error loading chart data</p>
                  </div>
                ) : (
                  <Chart 
                    type="bar" 
                    data={barChartData || []} 
                    dataKeyX="name" 
                    dataKeyY="value" 
                    height={300}
                  />
                )}
              </Card>
              
              <Card title="User Activity" className="flex flex-col">
                {lineChartLoading ? (
                  <div className="flex justify-center items-center h-80">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : lineChartError ? (
                  <div className="flex justify-center items-center h-80">
                    <p className="text-red-500">Error loading chart data</p>
                  </div>
                ) : (
                  <Chart 
                    type="line" 
                    data={lineChartData || []} 
                    dataKeyX="name" 
                    dataKeyY="value" 
                    height={300}
                  />
                )}
              </Card>
              
              <Card title="Market Share" className="flex flex-col">
                {pieChartLoading ? (
                  <div className="flex justify-center items-center h-80">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : pieChartError ? (
                  <div className="flex justify-center items-center h-80">
                    <p className="text-red-500">Error loading chart data</p>
                  </div>
                ) : (
                  <Chart 
                    type="pie" 
                    data={pieChartData || []} 
                    dataKeyX="name" 
                    dataKeyY="value" 
                    height={300}
                  />
                )}
              </Card>
              
              <Card title="Performance Metrics" className="flex flex-col">
                {scatterChartLoading ? (
                  <div className="flex justify-center items-center h-80">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : scatterChartError ? (
                  <div className="flex justify-center items-center h-80">
                    <p className="text-red-500">Error loading chart data</p>
                  </div>
                ) : (
                  <Chart 
                    type="scatter" 
                    data={scatterChartData || []} 
                    dataKeyX="x" 
                    dataKeyY="y" 
                    height={300}
                  />
                )}
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
