import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl mb-4">Log In</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full mb-2 p-2 border rounded"
        />

          {/* Forgot Password */}
          <Link
            to={"/forgot-password"}
            className="text-sm text-gray-600 hover:underline cursor-pointer"
          >
            Forgot Password?
          </Link>
          
          <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 mt-2 rounded hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? "Logging in…" : "Log In"}
        </button>

        <p className="mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline ">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
