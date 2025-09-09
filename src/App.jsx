import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from "./pages/login-form";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/SignupForm";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
      <Routes>
       
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={
          <PrivateRoute>
          <Dashboard />
        </PrivateRoute>} />
        <Route path="/blog" element={
          <PrivateRoute>
          <Blog />
        </PrivateRoute>} />
      </Routes>

  );

}

export default App;
