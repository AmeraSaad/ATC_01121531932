// src/pages/Home.jsx
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Welcome, {user.username}!</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Log Out
      </button>
    </div>
  );
}
