export default function StatsCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: string;
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: color + "20", color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-gray-800 text-2xl font-semibold mt-0.5">{value}</p>
        <p className="text-gray-400 text-xs mt-1">{sub}</p>
      </div>
    </div>
  );
}