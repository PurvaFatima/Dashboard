import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // assuming you have AuthContext

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  // If no user is logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists, render the protected content
  return children;
}
