import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  // Check if user is authenticated and is an admin
  if (!isAuthenticated || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute; 