import StatsCard from "./StatsCard";

const stats = [
  {
    icon: "👨‍🎓",
    label: "Total Students",
    value: "2,480",
    sub: "+12 this month",
    color: "#667eea",
  },
  {
    icon: "👨‍🏫",
    label: "Total Teachers",
    value: "186",
    sub: "3 new this semester",
    color: "#764ba2",
  },
  {
    icon: "📚",
    label: "Total Classes",
    value: "48",
    sub: "Across 12 grades",
    color: "#f59e0b",
  },
  {
    icon: "✅",
    label: "Attendance Today",
    value: "94%",
    sub: "147 absents today",
    color: "#10b981",
  },
  {
    icon: "💰",
    label: "Fees Collected",
    value: "$84,200",
    sub: "This month",
    color: "#3b82f6",
  },
  {
    icon: "⚠️",
    label: "Pending Fees",
    value: "320",
    sub: "Students with dues",
    color: "#ef4444",
  },
  {
    icon: "📝",
    label: "Exams Scheduled",
    value: "8",
    sub: "Next: May 10",
    color: "#8b5cf6",
  },
  {
    icon: "🎓",
    label: "Pass Rate",
    value: "98%",
    sub: "Last semester",
    color: "#ec4899",
  },
];

export default function DashboardHome() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-base font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Add Student", icon: "➕", color: "#667eea" },
            { label: "Add Teacher", icon: "➕", color: "#764ba2" },
            { label: "Mark Attendance", icon: "✅", color: "#10b981" },
            { label: "Collect Fee", icon: "💰", color: "#f59e0b" },
          ].map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 active:scale-95 transition"
              style={{ background: action.color }}
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-700">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { text: "New student Ali Hassan enrolled in Grade 9", time: "2 min ago", icon: "👨‍🎓" },
            { text: "Teacher Sara Khan updated attendance for Class 8A", time: "15 min ago", icon: "✅" },
            { text: "Fee payment received from Ahmed Raza — $450", time: "1 hr ago", icon: "💰" },
            { text: "New teacher Usman Malik added to Science dept", time: "3 hrs ago", icon: "👨‍🏫" },
            { text: "Grade 10 exam scheduled for May 10, 2025", time: "Yesterday", icon: "📝" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 px-6 py-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">{item.text}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}