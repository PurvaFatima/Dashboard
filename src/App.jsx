import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/login-form"
import SignupPage from "./pages/SignupForm"
import Blog from "./pages/Blog"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./routes/PrivateRoute"
import DashboardLayout from "./layout/DashboardLayout"

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* 👇 Child routes inside the layout */}
        <Route index element={<Dashboard />} />
        <Route path="blog" element={<Blog />} />
      </Route>
    </Routes>
  )
}

export default App
