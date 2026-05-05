"use client";
import { useEffect, useState } from "react";
import {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
  type ClassItem,
} from "@/services/classService";

const defaultForm = { name: "", section: "" };
const sections = ["9A", "10A", "10B", "11A", "12A"];

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeClass, setActiveClass] = useState<ClassItem | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllClasses();
      setClasses(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const filteredClasses = classes.filter((item) => {
    const text = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(text) ||
      item.section.toLowerCase().includes(text) ||
      item.id.toString().includes(text)
    );
  });

  const openAddModal = () => {
    setForm(defaultForm);
    setActiveClass(null);
    setShowAdd(true);
  };

  const openEditModal = (item: ClassItem) => {
    setActiveClass(item);
    setForm({ name: item.name, section: item.section });
    setShowEdit(true);
  };

  const saveClass = async () => {
    if (!form.name.trim() || !form.section.trim()) {
      setError("Please provide both class name and section.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (activeClass) {
        await updateClass(activeClass.id, form);
      } else {
        await createClass(form);
      }

      setShowAdd(false);
      setShowEdit(false);
      setForm(defaultForm);
      setActiveClass(null);
      await fetchClasses();
    } catch (err: any) {
      setError(err.response?.data?.message || "Unable to save class.");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);
      setError("");
      await deleteClass(deleteId);
      setDeleteId(null);
      await fetchClasses();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete class.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Classes</h1>
          <p className="text-gray-400 text-sm mt-1">Manage class sections and assignments</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
        >
          ➕ Add Class
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-red-500">⚠️</span>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <p className="text-gray-500">Loading classes...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1 min-w-48">
                <span className="text-gray-400 text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="outline-none text-sm text-gray-600 bg-transparent w-full placeholder-gray-400"
                />
              </div>
              <div className="text-sm text-gray-500">
                Showing {filteredClasses.length} of {classes.length}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    {[
                      "Class Name",
                      "Section",
                      "ID",
                      "Created",
                      "Actions",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredClasses.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{item.section}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{item.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openEditModal(item)}
                            className="text-xs text-blue-500 hover:text-blue-700 font-medium transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteId(item.id)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredClasses.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-4xl mb-2">📭</p>
                  <p>No classes found.</p>
                </div>
              )}
            </div>
          </div>

          {showAdd && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-semibold text-gray-800">Create Class</h2>
                  <button
                    onClick={() => setShowAdd(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition text-sm"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Class Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Section</label>
                    <select
                      value={form.section}
                      onChange={(e) => setForm({ ...form, section: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 bg-white transition"
                    >
                      <option value="">Select section</option>
                      {sections.map((section) => (
                        <option key={section} value={section}>
                          {section}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setShowAdd(false)}
                      className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveClass}
                      disabled={saving}
                      className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
                    >
                      {saving ? "Saving..." : "Create Class"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showEdit && activeClass && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-semibold text-gray-800">Edit Class</h2>
                  <button
                    onClick={() => {
                      setShowEdit(false);
                      setActiveClass(null);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition text-sm"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Class Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Section</label>
                    <select
                      value={form.section}
                      onChange={(e) => setForm({ ...form, section: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-purple-400 bg-white transition"
                    >
                      <option value="">Select section</option>
                      {sections.map((section) => (
                        <option key={section} value={section}>
                          {section}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => {
                        setShowEdit(false);
                        setActiveClass(null);
                      }}
                      className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveClass}
                      disabled={saving}
                      className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {deleteId && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  🗑️
                </div>
                <h2 className="text-base font-semibold text-gray-800 mb-1">Delete Class?</h2>
                <p className="text-sm text-gray-400 mb-6">
                  Are you sure you want to delete this class? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteId(null)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={deleteLoading}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleteLoading ? "Deleting..." : "Delete"
                    }
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
