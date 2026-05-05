"use client";
import { useState } from "react";

type Teacher = {
  id: string;
  name: string;
  subject: string;
  classes: number;
  students: number;
  experience: string;
  status: "Active" | "On Leave";
};

const initialTeachers: Teacher[] = [
  { id: "TCH-001", name: "Dr. Kamran Malik", subject: "Mathematics", classes: 5, students: 180, experience: "8 yrs", status: "Active" },
  { id: "TCH-002", name: "Ms. Sana Mirza", subject: "English", classes: 4, students: 145, experience: "5 yrs", status: "Active" },
  { id: "TCH-003", name: "Mr. Tariq Hussain", subject: "Science", classes: 6, students: 210, experience: "12 yrs", status: "Active" },
  { id: "TCH-004", name: "Mrs. Rabia Noor", subject: "History", classes: 3, students: 98, experience: "3 yrs", status: "On Leave" },
];

const subjects = ["Mathematics","English","Science","History","Computer Science"];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    subject: "Mathematics",
    status: "Active" as "Active" | "On Leave",
  });

  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [editForm, setEditForm] = useState<Teacher | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = teachers.filter((t) => {
    return (
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase())
    );
  });

  /* ADD */
  const addTeacher = () => {
    const newTeacher: Teacher = {
      id: `TCH-${String(teachers.length + 1).padStart(3, "0")}`,
      name: addForm.name || "New Teacher",
      subject: addForm.subject,
      classes: 0,
      students: 0,
      experience: "0 yrs",
      status: addForm.status,
    };
    setTeachers((p) => [...p, newTeacher]);
    setShowAddModal(false);
    setAddForm({ name: "", subject: "Mathematics", status: "Active" });
  };

  /* EDIT */
  const openEdit = (t: Teacher) => {
    setEditTeacher(t);
    setEditForm({ ...t });
  };

  const saveEdit = () => {
    if (!editForm) return;
    setTeachers((p) => p.map((t) => (t.id === editForm.id ? editForm : t)));
    setEditTeacher(null);
    setEditForm(null);
  };

  /* DELETE */
  const confirmDelete = () => {
    setTeachers((p) => p.filter((t) => t.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Teachers</h1>
          <p className="text-gray-400 text-sm mt-1">Manage all teaching staff</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
        >
          ➕ Add Teacher
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        
        {/* SEARCH */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1">
            <span className="text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none text-sm text-gray-600 bg-transparent w-full placeholder-gray-400"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                {["Teacher","ID","Subject","Classes","Students","Experience","Status","Action"].map((h) => (
                  <th key={h} className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition">
                  
                  {/* NAME */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                        style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
                        {t.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{t.name}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">{t.id}</td>

                  <td className="px-6 py-4 text-sm text-gray-500">{t.subject}</td>

                  <td className="px-6 py-4 text-sm text-gray-500">{t.classes}</td>

                  <td className="px-6 py-4 text-sm text-gray-500">{t.students}</td>

                  <td className="px-6 py-4 text-sm text-gray-500">{t.experience}</td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      t.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {t.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(t)}
                        className="text-xs text-blue-500 hover:text-blue-700 font-medium transition">
                        Edit
                      </button>
                      <span className="text-gray-200">|</span>
                      <button onClick={() => setDeleteId(t.id)}
                        className="text-xs text-red-400 hover:text-red-600 font-medium transition">
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-2">🔍</p>
              <p className="text-gray-400 text-sm">No teachers found</p>
            </div>
          )}
        </div>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Add Teacher</h2>

            <input
              placeholder="Full Name"
              value={addForm.name}
              onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 mb-3"
            />

            <select
              value={addForm.subject}
              onChange={(e) => setAddForm({ ...addForm, subject: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 mb-4"
            >
              {subjects.map((s) => <option key={s}>{s}</option>)}
            </select>

            <button onClick={addTeacher}
              className="w-full py-2 rounded-xl text-white"
              style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
              Add Teacher
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editTeacher && editForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Edit Teacher</h2>

            <input
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full border text-gray-200 rounded-xl px-4 py-2 mb-3"
            />

            <select
              value={editForm.status}
              onChange={(e) =>
                setEditForm({ ...editForm, status: e.target.value as any })
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-2 mb-4"
            >
              <option>Active</option>
              <option>On Leave</option>
            </select>

            <button onClick={saveEdit}
              className="w-full py-2 rounded-xl text-white"
              style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}>
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 text-center">
            <p className="mb-4 text-gray-600">Delete this teacher?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 border rounded-xl">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded-xl">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}