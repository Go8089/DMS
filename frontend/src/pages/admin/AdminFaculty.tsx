import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import {
  createFaculty,
  deleteFaculty,
  getFaculty,
  updateFaculty,
} from "@/api/admin";

import type { Faculty } from "@/types/admin";

interface FacultyForm {
  name: string;
  designation: string;
  department: string;
  qualification: string;
  description: string;
  email: string;
  phone: string;
  imageUrl: string;
  principal: boolean;
}

const emptyForm: FacultyForm = {
  name: "",
  designation: "",
  department: "",
  qualification: "",
  description: "",
  email: "",
  phone: "",
  imageUrl: "",
  principal: false,
};

function AdminFaculty() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [form, setForm] = useState<FacultyForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadFaculty() {
    try {
      setLoading(true);
      setError("");
      const data = await getFaculty();
      setFaculty(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load faculty."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadFaculty();
  }, []);

  function handleChange(
    field: keyof FacultyForm,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  }

  function openEditForm(member: Faculty) {
    setEditingId(member.id);

    setForm({
      name: member.name ?? "",
      designation: member.designation ?? "",
      department: member.department ?? "",
      qualification: member.qualification ?? "",
      description: member.description ?? "",
      email: member.email ?? "",
      phone: member.phone ?? "",
      imageUrl: member.imageUrl ?? "",
      principal: member.principal ?? false,
    });

    setError("");
    setShowForm(true);
  }

  function closeForm() {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (editingId === null) {
        await createFaculty(form);
      } else {
        await updateFaculty(editingId, form);
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);

      await loadFaculty();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save faculty."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (
      !window.confirm(
        "Are you sure you want to delete this faculty member?"
      )
    ) {
      return;
    }

    try {
      setError("");
      await deleteFaculty(id);
      await loadFaculty();

      if (editingId === id) {
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete faculty member."
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Faculty
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage teachers, staff and principal information.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Faculty
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId === null ? "Add Faculty" : "Edit Faculty"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the faculty member's profile information.
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              disabled={saving}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
              title="Close form"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name and Designation */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="faculty-name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Name
                </label>

                <input
                  id="faculty-name"
                  required
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Faculty name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label
                  htmlFor="faculty-designation"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Designation
                </label>

                <input
                  id="faculty-designation"
                  required
                  value={form.designation}
                  onChange={(e) =>
                    handleChange("designation", e.target.value)
                  }
                  placeholder="Senior Teacher"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            {/* Department and Qualification */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="faculty-department"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Department
                </label>

                <input
                  id="faculty-department"
                  required
                  value={form.department}
                  onChange={(e) =>
                    handleChange("department", e.target.value)
                  }
                  placeholder="Science"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label
                  htmlFor="faculty-qualification"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Qualification
                </label>

                <input
                  id="faculty-qualification"
                  required
                  value={form.qualification}
                  onChange={(e) =>
                    handleChange("qualification", e.target.value)
                  }
                  placeholder="M.Sc., B.Ed."
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="faculty-email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  id="faculty-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="teacher@school.com"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label
                  htmlFor="faculty-phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>

                <input
                  id="faculty-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Phone number"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="faculty-image"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>

              <input
                id="faculty-image"
                type="url"
                value={form.imageUrl}
                onChange={(e) => handleChange("imageUrl", e.target.value)}
                placeholder="https://example.com/faculty.jpg"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Image Preview */}
            {form.imageUrl.trim() && (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Image Preview
                </p>

                <div className="flex h-40 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  <img
                    src={form.imageUrl}
                    alt="Faculty preview"
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <label
                htmlFor="faculty-description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="faculty-description"
                rows={4}
                value={form.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
                placeholder="Faculty profile and experience..."
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Principal Option */}
            <div className="border-t border-gray-200 pt-5">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={form.principal}
                  onChange={(e) =>
                    handleChange("principal", e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 accent-black"
                />

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Principal
                  </p>

                  <p className="text-xs text-gray-500">
                    Mark this faculty member as the school principal.
                  </p>
                </div>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId === null
                    ? "Save Faculty"
                    : "Update Faculty"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Faculty Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">Faculty Members</h2>

          <p className="mt-1 text-sm text-gray-500">
            {faculty.length}{" "}
            {faculty.length === 1 ? "member" : "members"}
          </p>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-sm text-gray-500">
            Loading faculty...
          </div>
        ) : faculty.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-gray-500">
              No faculty members found.
            </p>

            <button
              type="button"
              onClick={openCreateForm}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              <Plus size={16} />
              Add First Faculty Member
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Faculty
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Designation
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Department
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Role
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {faculty.map((member) => (
                  <tr
                    key={member.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {member.imageUrl ? (
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="h-11 w-11 rounded-full border border-gray-200 object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                            {member.name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                        )}

                        <div className="max-w-[220px]">
                          <p className="font-medium text-gray-900">
                            {member.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {member.qualification || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {member.designation || "—"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {member.department || "—"}
                    </td>

                    <td className="px-6 py-4">
                      {member.principal ? (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                          Principal
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          Faculty
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(member)}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                          title="Edit faculty"
                          aria-label={`Edit ${member.name}`}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(member.id)}
                          className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                          title="Delete faculty"
                          aria-label={`Delete ${member.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminFaculty;

