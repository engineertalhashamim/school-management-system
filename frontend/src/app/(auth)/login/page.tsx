"use client";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <LoginForm onSwitch={() => router.push("/signup")} />
      </div>
    </div>
  );
}
