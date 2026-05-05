"use client";
import { useState } from "react";

type SignupFormProps = {
  onSwitch: () => void;
};

export default function SignupForm({ onSwitch }: SignupFormProps) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">
        Create Account
      </h2>
      <p className="text-center text-gray-400 text-sm mb-6">Join us today!</p>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Password</label>
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Create a password"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition pr-10"
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
        <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Repeat your password"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"
          >
            {showConfirm ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <button
        className="w-full py-2.5 rounded-lg text-white font-semibold tracking-widest text-sm hover:opacity-90 active:scale-95 transition"
        style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
      >
        SIGN UP
      </button>

      <p className="text-center text-sm text-gray-400 mt-5">
        Already a member?{" "}
        <button onClick={onSwitch} className="font-semibold" style={{ color: "#667eea" }}>
          Login now
        </button>
      </p>
    </div>
  );
}
