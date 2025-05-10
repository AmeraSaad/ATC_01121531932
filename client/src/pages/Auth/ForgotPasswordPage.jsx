import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft, MdEmail } from "react-icons/md";
import { useAuthStore } from "../../store/authStore";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, forgotPassword, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <main className="flex-grow flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-green-600">
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <>
            <p className="text-center text-gray-600 text-sm">
              Enter your email address and we’ll send you a link to reset your
              password.
            </p>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 rounded text-white font-semibold ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isLoading ? "Sending…" : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <MdEmail className="text-6xl text-green-500" />
            </div>
            <p className="text-gray-700 text-sm">
              If an account exists for{" "}
              <span className="font-medium">{email}</span>, you will receive a
              password reset link shortly.
            </p>
          </div>
        )}

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-green-600 hover:underline text-sm flex items-center justify-center"
          >
            <MdKeyboardArrowLeft className="text-lg mr-1" />
            Back to Login
          </button>
        </div>
      </div>
    </main>
  );
}
