import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = (i, value) => {
    const newCode = [...code];
    if (value.length > 1) {
      // handle paste
      const chars = value.slice(0, 6).split("");
      for (let j = 0; j < 6; j++) newCode[j] = chars[j] || "";
      setCode(newCode);
      const nextIdx = newCode.findIndex((c) => c === "") || 5;
      inputRefs.current[nextIdx]?.focus();
    } else {
      newCode[i] = value;
      setCode(newCode);
      if (value && i < 5) inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      toast.success("Email verified successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Verification failed");
    }
  };


  // auto-submit once all digits are entered
  useEffect(() => {
    if (code.every((d) => d !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-12 text-center text-xl font-semibold bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || code.some((d) => !d)}
            className={`
              w-full py-2 rounded
              text-white font-semibold
              ${
                isLoading || code.some((d) => !d)
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }
            `}
          >
            {isLoading ? "Verifying…" : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationPage;