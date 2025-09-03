import { Routes, Route } from "react-router-dom";
import Login from "./pages/login-form";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/SignupForm";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/blog" element={<Blog />} />
      
      {/* fallback */}
      <Route path="*" element={<Login/>} />
    </Routes>
  );

}

export default App;