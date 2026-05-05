"use client";
import { useRouter } from "next/navigation";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <SignupForm onSwitch={() => router.push("/login")} />
      </div>
    </div>
  );
}