"use client";
import { useState } from "react";

const navItems = [
  { icon: "⊞", label: "Dashboard", id: "dashboard" },
  { icon: "👨‍🎓", label: "Students", id: "students" },
  { icon: "👨‍🏫", label: "Teachers", id: "teachers" },
  { icon: "📚", label: "Classes", id: "classes" },
  { icon: "📝", label: "Attendance", id: "attendance" },
//   { icon: "💰", label: "Fees", id: "fees" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

export default function Sidebar({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <aside
      className="h-screen w-64 flex flex-col fixed left-0 top-0"
      style={{ background: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/20">
        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white text-lg">
          🏫
        </div>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">Westbrook</p>
          <p className="text-white/60 text-xs">Academy</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-5 flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition text-left ${
              active === item.id
                ? "bg-white text-purple-600 font-semibold shadow"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Admin profile */}
      <div className="px-4 py-4 border-t border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
          <div>
            <p className="text-white text-sm font-medium">Admin User</p>
            <p className="text-white/50 text-xs">admin@school.edu</p>
          </div>
        </div>
      </div>
    </aside>
  );
}