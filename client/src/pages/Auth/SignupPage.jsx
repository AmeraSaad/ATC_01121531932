import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form.email, form.password, form.username);
      navigate("/verify-email"); 
    } catch {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl mb-4">Sign Up</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}

        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full mb-3 p-2 border rounded"
        />
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
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
          disabled={isLoading}
        >
          {isLoading ? "Signing up…" : "Sign Up"}
        </button>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
