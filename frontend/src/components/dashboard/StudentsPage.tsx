"use client";
import { useState, useEffect } from "react";
import { getAllStudents, createStudent, updateStudent, deleteStudent, type Student } from "@/services/studentService";

const classes = ["9A", "10A", "10B"];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");

  // Add modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    roll: "",
    class: "9A"
  });
  const [addLoading, setAddLoading] = useState(false);

  // Edit modal
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [editForm, setEditForm] = useState<Student | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  // Delete confirm
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllStudents();
      setStudents(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ── helpers ── */
  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                       s.email.toLowerCase().includes(search.toLowerCase()) ||
                       s.roll.toLowerCase().includes(search.toLowerCase());
    const matchClass = classFilter === "All" || s.class === classFilter;
    return matchSearch && matchClass;
  });

  const openEdit = (s: Student) => {
    setEditStudent(s);
    setEditForm({ ...s });
  };

  const saveEdit = async () => {
    if (!editForm) return;

    try {
      setEditLoading(true);
      await updateStudent(editForm.id, editForm);
      setEditStudent(null);
      setEditForm(null);
      fetchStudents(); // Refresh the list
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update student");
    } finally {
      setEditLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);
      await deleteStudent(deleteId);
      setDeleteId(null);
      fetchStudents(); // Refresh the list
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete student");
    } finally {
      setDeleteLoading(false);
    }
  };

  const addStudent = async () => {
    try {
      setAddLoading(true);
      await createStudent(addForm);
      setShowAddModal(false);
      setAddForm({ name: "", email: "", roll: "", class: "9A" });
      fetchStudents(); // Refresh the list
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add student");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Students</h1>
          <p className="text-gray-400 text-sm mt-1">Manage all enrolled students</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
        >
          ➕ Add Student
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-red-500">⚠️</span>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <p className="text-gray-500">Loading students...</p>
          </div>
        </div>
      ) : (
        <>
      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Students", value: students.length.toLocaleString(), icon: "👨‍🎓", color: "#667eea" },
          { label: "Class 9A", value: students.filter(s => s.class === "9A").length.toString(), icon: "📚", color: "#10b981" },
          { label: "Class 10A", value: students.filter(s => s.class === "10A").length.toString(), icon: "📖", color: "#f59e0b" },
          { label: "Class 10B", value: students.filter(s => s.class === "10B").length.toString(), icon: "🎓", color: "#ef4444" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: s.color + "20", color: s.color }}>{s.icon}</div>
            <div>
              <p className="text-gray-400 text-xs">{s.label}</p>
              <p className="text-gray-800 text-lg font-semibold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-48">
            <span className="text-gray-400 text-sm">🔍</span>
            <input type="text" placeholder="Search by name, email, or roll..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm text-gray-600 bg-transparent w-full placeholder-gray-400" />
          </div>
          <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 outline-none bg-gray-50">
            <option value="All">All Classes</option>
            {classes.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                {["Name","Email","Roll","Class","ID","Action"].map((h) => (
                  <th key={h} className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
                        {s.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{s.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{s.roll}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{s.class}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{s.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(s)}
                        className="text-xs text-blue-500 hover:text-blue-700 font-medium transition">Edit</button>
                      <span className="text-gray-200">|</span>
                      <button onClick={() => setDeleteId(s.id)}
                        className="text-xs text-red-400 hover:text-red-600 font-medium transition">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-2">🔍</p>
              <p className="text-gray-400 text-sm">No students found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-400">Showing {filtered.length} of {students.length} students</p>
          <div className="flex gap-2">
            {[1,2,3].map((p) => (
              <button key={p}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition ${p===1 ? "text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                style={p===1 ? { background: "linear-gradient(135deg, #667eea, #764ba2)" } : {}}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          EDIT MODAL
      ══════════════════════════════════════════ */}
      {editStudent && editForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in">

            {/* Modal header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
                  {editStudent.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-800">Edit Student</h2>
                  <p className="text-xs text-gray-400">{editStudent.id}</p>
                </div>
              </div>
              <button onClick={() => { setEditStudent(null); setEditForm(null); }}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition text-sm">
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                <input type="text" value={editForm.name}
                  onChange={(e) => setEditForm(editForm ? { ...editForm, name: e.target.value } : null)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                <input type="email" value={editForm.email}
                  onChange={(e) => setEditForm(editForm ? { ...editForm, email: e.target.value } : null)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition" />
              </div>

              {/* Roll */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Roll Number</label>
                <input type="text" value={editForm.roll}
                  onChange={(e) => setEditForm(editForm ? { ...editForm, roll: e.target.value } : null)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition" />
              </div>

              {/* Class */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Class</label>
                <select value={editForm.class}
                  onChange={(e) => setEditForm(editForm ? { ...editForm, class: e.target.value } : null)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 bg-white transition">
                  {classes.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-2">
                <button onClick={() => { setEditStudent(null); setEditForm(null); }}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button onClick={saveEdit}
                  disabled={editLoading}
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          DELETE CONFIRM MODAL
      ══════════════════════════════════════════ */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">🗑️</div>
            <h2 className="text-base font-semibold text-gray-800 mb-1">Delete Student?</h2>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-600">
                {students.find((s) => s.id === deleteId)?.name}
              </span>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition">
                Cancel
              </button>
              <button onClick={confirmDelete}
                disabled={deleteLoading}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          ADD STUDENT MODAL
      ══════════════════════════════════════════ */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-800">Add New Student</h2>
              <button onClick={() => setShowAddModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition text-sm">✕</button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                <input type="text" placeholder="Enter full name" value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                <input type="email" placeholder="Enter email" value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Roll Number</label>
                <input type="text" placeholder="Enter roll number" value={addForm.roll}
                  onChange={(e) => setAddForm({ ...addForm, roll: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Class</label>
                <select value={addForm.class} onChange={(e) => setAddForm({ ...addForm, class: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 bg-white">
                  {classes.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition">Cancel</button>
                <button onClick={addStudent}
                  disabled={addLoading}
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
                  {addLoading ? "Adding..." : "Add Student"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
}