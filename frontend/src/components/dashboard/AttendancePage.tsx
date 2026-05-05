"use client";
import { useState } from "react";

const classes = ["Grade 7A", "Grade 8A", "Grade 9A", "Grade 10A", "Grade 11A", "Grade 12A"];

const students = [
  { id: "STU-001", name: "Ali Hassan" },
  { id: "STU-002", name: "Sara Khan" },
  { id: "STU-003", name: "Ahmed Raza" },
  { id: "STU-004", name: "Fatima Malik" },
  { id: "STU-005", name: "Usman Ali" },
  { id: "STU-006", name: "Ayesha Noor" },
  { id: "STU-007", name: "Bilal Ahmed" },
  { id: "STU-008", name: "Zara Sheikh" },
];

type Status = "Present" | "Absent" | "Late";

export default function AttendancePage() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [selectedClass, setSelectedClass] = useState("Grade 9A");
  const [attendance, setAttendance] = useState<Record<string, Status>>(
    Object.fromEntries(students.map((s) => [s.id, "Present"]))
  );
  const [saved, setSaved] = useState(false);

  const setStatus = (id: string, status: Status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
    setSaved(false);
  };

  const markAll = (status: Status) => {
    setAttendance(Object.fromEntries(students.map((s) => [s.id, status])));
    setSaved(false);
  };

  const counts = {
    Present: Object.values(attendance).filter((v) => v === "Present").length,
    Absent: Object.values(attendance).filter((v) => v === "Absent").length,
    Late: Object.values(attendance).filter((v) => v === "Late").length,
  };

  const statusStyle: Record<Status, { bg: string; text: string; activeBg: string }> = {
    Present: { bg: "bg-gray-100", text: "text-gray-500", activeBg: "bg-green-500" },
    Late: { bg: "bg-gray-100", text: "text-gray-500", activeBg: "bg-yellow-400" },
    Absent: { bg: "bg-gray-100", text: "text-gray-500", activeBg: "bg-red-500" },
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Attendance</h1>
          <p className="text-gray-400 text-sm mt-1">Mark and track daily attendance</p>
        </div>
        <button
          onClick={() => setSaved(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
        >
          {saved ? "✅ Saved!" : "💾 Save Attendance"}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Present", value: counts.Present, icon: "✅", color: "#10b981" },
          { label: "Absent", value: counts.Absent, icon: "❌", color: "#ef4444" },
          { label: "Late", value: counts.Late, icon: "⏰", color: "#f59e0b" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: s.color + "20", color: s.color }}>
              {s.icon}
            </div>
            <div>
              <p className="text-gray-400 text-xs">{s.label}</p>
              <p className="text-gray-800 text-xl font-semibold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">📅</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 outline-none focus:border-purple-400 bg-gray-50"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 outline-none bg-gray-50"
          >
            {classes.map((c) => <option key={c}>{c}</option>)}
          </select>

          {/* Mark all buttons */}
          <div className="ml-auto flex gap-2">
            {(["Present", "Absent", "Late"] as Status[]).map((s) => (
              <button key={s} onClick={() => markAll(s)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition hover:opacity-80"
                style={{
                  borderColor: s === "Present" ? "#10b981" : s === "Absent" ? "#ef4444" : "#f59e0b",
                  color: s === "Present" ? "#10b981" : s === "Absent" ? "#ef4444" : "#f59e0b",
                  background: (s === "Present" ? "#10b981" : s === "Absent" ? "#ef4444" : "#f59e0b") + "10",
                }}>
                Mark All {s}
              </button>
            ))}
          </div>
        </div>

        {/* Attendance list */}
        <div className="divide-y divide-gray-50">
          {students.map((student, i) => {
            const current = attendance[student.id];
            return (
              <div key={student.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex items-center gap-4">
                  <span className="text-gray-300 text-sm w-5">{i + 1}</span>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{student.name}</p>
                    <p className="text-xs text-gray-400">{student.id}</p>
                  </div>
                </div>

                {/* Status toggle */}
                <div className="flex gap-2">
                  {(["Present", "Late", "Absent"] as Status[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(student.id, s)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                        current === s
                          ? s === "Present"
                            ? "bg-green-500 text-white shadow-sm"
                            : s === "Late"
                            ? "bg-yellow-400 text-white shadow-sm"
                            : "bg-red-500 text-white shadow-sm"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Attendance Rate</span>
            <span>{Math.round((counts.Present / students.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${(counts.Present / students.length) * 100}%`,
                background: "linear-gradient(135deg, #667eea, #764ba2)"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}