"use client";
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHome from "@/components/dashboard/DashboardHome";
import StudentsPage from "@/components/dashboard/StudentsPage";
import TeachersPage from "@/components/dashboard/TeachersPage";
import ClassesPage from "@/components/dashboard/ClassesPage";
import AttendancePage from "@/components/dashboard/AttendancePage";

export default function DashboardPage() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar active={active} onSelect={setActive} />
      <main className="flex-1 ml-64 p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 w-72">
            <span className="text-gray-400 text-sm">🔍</span>
            <input type="text" placeholder="Search..."
              className="outline-none text-sm text-gray-600 bg-transparent w-full placeholder-gray-400" />
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-50 transition relative">
              🔔
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold text-sm"
              style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>A</div>
          </div>
        </div>

        {/* Pages */}
        {active === "dashboard"  && <DashboardHome />}
        {active === "students"   && <StudentsPage />}
        {active === "teachers"   && <TeachersPage />}
        {active === "classes"    && <ClassesPage />}
        {active === "attendance" && <AttendancePage />}
        {!["dashboard","students","teachers","classes","attendance"].includes(active) && (
          <div className="flex flex-col items-center justify-center h-96 text-gray-300">
            <p className="text-5xl mb-4">🚧</p>
            <p className="text-lg font-medium text-gray-400">Coming Soon</p>
          </div>
        )}
      </main>
    </div>
  );
}
