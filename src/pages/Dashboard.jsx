// pages/Dashboard.jsx
import Header from "../layout/Header";
import Card from "../layout/Card";
import MainContent from "../layout/MainContent";
import Chart from "../layout/Chart";
import SalesChart from "../layout/SalesChart";
import Footer from "../layout/Footer";
import { SidebarTrigger } from "../components/ui/sidebar";

// Custom hooks for fetching data
import { useMetricsData } from "../hooks/useMetricsData";
import {
  useBarChartData,
  useLineChartData,
  usePieChartData,
  useScatterChartData,
} from "../hooks/useChartData";

export default function Dashboard() {
  const headerActions = [
    {
      label: "Refresh",
      onClick: () => window.location.reload(),
    },
  ];

  const {
    data: metricsData,
    loading: metricsLoading,
    error: metricsError,
  } = useMetricsData();
  const {
    data: barChartData,
    loading: barChartLoading,
    error: barChartError,
  } = useBarChartData();
  const {
    data: lineChartData,
    loading: lineChartLoading,
    error: lineChartError,
  } = useLineChartData();
  const {
    data: pieChartData,
    loading: pieChartLoading,
    error: pieChartError,
  } = usePieChartData();
  const {
    data: scatterChartData,
    loading: scatterChartLoading,
    error: scatterChartError,
  } = useScatterChartData();

  // Loading State
  if (metricsLoading) {
    return (
      <MainContent className="w-full mx-0 bg-amber-50 dark:bg-gray-900 dark:!text-blue-300"> 
        <SidebarTrigger />
        <Header
          title="Dashboard Overview"
          subtitle="Loading dashboard data..."
          actions={headerActions}
        />
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">
              {/* CHANGED: dark mode text */}
              Loading dashboard data...
            </p>
          </div>
        </div>
        <Footer />
      </MainContent>
    );
  }

  // Error State
  if (metricsError) {
    return (
      <MainContent className="w-full mx-0 dark:text-white">
        {/* CHANGED: dark mode white text */}
        <SidebarTrigger />
        <Header
          title="Dashboard Overview"
          subtitle="Error loading dashboard data"
          actions={headerActions}
        />
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold dark:text-white mb-2">
              {/* CHANGED: dark mode text */}
              Error Loading Data
            </h3>
            <p className=" mb-4">
              {/* CHANGED: dark mode text */}
              {metricsError}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </MainContent>
    );
  }

  // Success State
  return (
    <MainContent className="w-full mx-0 bg-white/70 dark:bg-gray-900/0 dark:!text-white">
      {/* CHANGED: dark mode global gradient + white text */}
      <SidebarTrigger />
      <Header
        title="Dashboard Overview"
        subtitle="Welcome to your dashboard"
        actions={headerActions}
        className="text-gray-900 dark:!text-blue-300"
      />

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 w-full mx-0">
        {metricsData &&
          metricsData.map((metric) => (
            <Card
              key={metric.id}
              className="flex flex-col bg-white dark:bg-[#25314d] rounded-lg shadow-md p-4"
            >
              {/* CHANGED: added dark card background */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {/* CHANGED: dark text */}
                {metric.title}
              </h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {/* CHANGED: dark text */}
                  {metric.title === "Total Revenue"
                    ? `$${metric.value.toLocaleString()}`
                    : metric.title === "Conversion Rate"
                    ? `${metric.value}%`
                    : metric.value.toLocaleString()}
                </p>
                <p
                  className={`ml-2 text-sm ${
                    metric.change >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {/* CHANGED: lighter green/red in dark mode */}
                  {metric.change >= 0 ? "+" : ""}
                  {metric.change}%
                </p>
              </div>
            </Card>
          ))}
      </section>

      {/* Charts Grid */}
      <div className="flex flex-col gap-6 mb-6 w-full mx-0">
        {/* First row: Bar & Line charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card
            title="Revenue Overview"
            className="flex flex-col bg-white dark:bg-[#25314d] rounded-lg shadow-md p-4"
          >
            {/* CHANGED: added dark card background */}
            {barChartLoading ? (
              <div className="flex justify-center items-center h-80">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : barChartError ? (
              <div className="flex justify-center items-center h-80">
                <p className="text-red-500 dark:text-red-400">
                  {/* CHANGED: dark text */}
                  Error loading chart data: {barChartError}
                </p>
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

          <Card
            title="Sales Trend"
            className="flex flex-col bg-white dark:bg-[#25314d] rounded-lg shadow-md p-4"
          >
            {/* CHANGED: added dark card background */}
            {lineChartLoading ? (
              <div className="flex justify-center items-center h-80">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : lineChartError ? (
              <div className="flex justify-center items-center h-80">
                <p className="text-red-500 dark:text-red-400">
                  {/* CHANGED: dark text */}
                  Error loading chart data: {lineChartError}
                </p>
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
        </div>

        {/* Second row: Pie & Scatter charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card
            title="Market Share"
            className="flex flex-col bg-white dark:bg-[#25314d] rounded-lg shadow-md p-4"
          >
            {/* CHANGED: added dark card background */}
            {pieChartLoading ? (
              <div className="flex justify-center items-center h-80">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : pieChartError ? (
              <div className="flex justify-center items-center h-80">
                <p className="text-red-500 dark:text-red-400">
                  {/* CHANGED: dark text */}
                  Error loading chart data: {pieChartError}
                </p>
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

          <Card
            title="Performance Distribution"
            className="flex flex-col bg-white dark:bg-[#25314d] rounded-lg shadow-md p-4"
          >
            {/* CHANGED: added dark card background */}
            {scatterChartLoading ? (
              <div className="flex justify-center items-center h-80">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : scatterChartError ? (
              <div className="flex justify-center items-center h-80">
                <p className="text-red-500 dark:text-red-400">
                  {/* CHANGED: dark text */}
                  Error loading chart data: {scatterChartError}
                </p>
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
      </div>

      {/* Sales Chart */}
      <div className="mb-6">
        <SalesChart />
      </div>

      <Footer className="w-full mx-auto" />
    </MainContent>
  );
}
