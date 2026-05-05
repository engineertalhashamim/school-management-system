"use client";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";

export default function AuthPage() {
  const [view, setView] = useState<"login" | "signup">("login");

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        {view === "login" ? (
          <LoginForm onSwitch={() => setView("signup")} />
        ) : (
          <SignupForm onSwitch={() => setView("login")} />
        )}
      </div>
    </div>
  );
}
