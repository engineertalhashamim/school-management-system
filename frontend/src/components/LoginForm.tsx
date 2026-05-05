"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";

type LoginFormProps = {
  onSwitch: () => void;
};

export default function LoginForm({ onSwitch }: LoginFormProps) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login({ email, password });

      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Navigate to dashboard
        router.push("/dashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">
        Login Form
      </h2>
      <p className="text-center text-gray-400 text-sm mb-6">Welcome back!</p>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Email or Phone</label>
        <input
          type="email"
          placeholder="Enter email or phone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm text-gray-600 mb-1">Password</label>
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
          >
            {showPass ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="mb-5">
        <button className="text-sm font-medium" style={{ color: "#667eea" }}>
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-lg text-white font-semibold tracking-widest text-sm hover:opacity-90 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
      >
        {loading ? "LOGGING IN..." : "LOGIN"}
      </button>

      <p className="text-center text-sm text-gray-400 mt-5">
        Not a member?{" "}
        <button onClick={onSwitch} className="font-semibold" style={{ color: "#667eea" }}>
          Signup now
        </button>
      </p>
    </form>
  );
}
