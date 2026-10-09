
import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X, BookOpen } from "lucide-react";

import {
  createAcademicInfo,
  deleteAcademicInfo,
  getAdminAcademicInfo,
  updateAcademicInfo,
} from "@/api/admin";

import type { AcademicInfo } from "@/types/admin";

type AcademicForm = Omit<AcademicInfo, "id">;

const emptyForm: AcademicForm = {
  section: "",
  description: "",
  classesOffered: "",
  subjects: "",
  curriculum: "",
  academicCalendar: "",
  examinationSystem: "",
  rules: "",
};

function AdminAcademics() {
  const [items, setItems] = useState<AcademicInfo[]>([]);
  const [form, setForm] = useState<AcademicForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await getAdminAcademicInfo();
      setItems(data);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load academic information."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  const updateField = (field: keyof AcademicForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const openEdit = (item: AcademicInfo) => {
    setEditingId(item.id);
    setForm({
      section: item.section,
      description: item.description,
      classesOffered: item.classesOffered,
      subjects: item.subjects,
      curriculum: item.curriculum,
      academicCalendar: item.academicCalendar,
      examinationSystem: item.examinationSystem,
      rules: item.rules,
    });
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.section.trim()) {
      setError("Section name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (editingId === null) {
        await createAcademicInfo(form);
        setSuccess("Academic section created successfully.");
      } else {
        await updateAcademicInfo(editingId, form);
        setSuccess("Academic section updated successfully.");
      }

      await loadItems();
      closeForm();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save academic information."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this academic section?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");
      await deleteAcademicInfo(id);
      setItems((current) => current.filter((item) => item.id !== id));
      setSuccess("Academic section deleted successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete academic information."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Academics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage academic information shown on the public website.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={17} />
          Add Academic Section
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {success}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId === null
                  ? "Add Academic Section"
                  : "Edit Academic Section"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Enter the details for this academic section.
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              aria-label="Close form"
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Section"
              value={form.section}
              onChange={(value) => updateField("section", value)}
              placeholder="e.g. Primary Education"
              required
            />

            <Field
              label="Classes Offered"
              value={form.classesOffered}
              onChange={(value) => updateField("classesOffered", value)}
              placeholder="e.g. Classes I - V"
            />

            <Field
              label="Subjects"
              value={form.subjects}
              onChange={(value) => updateField("subjects", value)}
              placeholder="e.g. Mathematics, Science, English"
            />

            <Field
              label="Curriculum"
              value={form.curriculum}
              onChange={(value) => updateField("curriculum", value)}
              placeholder="Curriculum details"
            />

            <Field
              label="Academic Calendar"
              value={form.academicCalendar}
              onChange={(value) => updateField("academicCalendar", value)}
              placeholder="Academic year / calendar details"
            />

            <Field
              label="Examination System"
              value={form.examinationSystem}
              onChange={(value) => updateField("examinationSystem", value)}
              placeholder="Examination details"
            />

            <div className="md:col-span-2">
              <TextArea
                label="Description"
                value={form.description}
                onChange={(value) => updateField("description", value)}
                placeholder="Describe this academic section..."
              />
            </div>

            <div className="md:col-span-2">
              <TextArea
                label="Rules"
                value={form.rules}
                onChange={(value) => updateField("rules", value)}
                placeholder="Academic rules and guidelines..."
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
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
                  ? "Create Section"
                  : "Update Section"}
            </button>
          </div>
        </form>
      )}

      {/* Academic Sections */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="font-semibold text-gray-900">
              Academic Sections
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              All academic information entries.
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            {items.length} {items.length === 1 ? "section" : "sections"}
          </span>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading academic information...
          </div>
        ) : items.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <BookOpen className="mx-auto mb-3 text-gray-400" size={32} />
            <h3 className="font-medium text-gray-900">
              No academic sections yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Add an academic section to display it on the public website.
            </p>
            <button
              type="button"
              onClick={openCreate}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              <Plus size={16} />
              Add First Section
            </button>
          </div>
        ) : (
          <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-2">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-5 transition hover:border-gray-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="break-words font-semibold text-gray-900">
                      {item.section}
                    </h3>
                    <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-gray-600">
                      {item.description || "No description provided."}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                    #{item.id}
                  </span>
                </div>

                <div className="mt-5 flex-1 space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-700">
                  {item.classesOffered && (
                    <p className="break-words">
                      <span className="font-medium text-gray-900">
                        Classes:
                      </span>{" "}
                      {item.classesOffered}
                    </p>
                  )}

                  {item.subjects && (
                    <p className="break-words">
                      <span className="font-medium text-gray-900">
                        Subjects:
                      </span>{" "}
                      {item.subjects}
                    </p>
                  )}

                  {item.curriculum && (
                    <p className="break-words">
                      <span className="font-medium text-gray-900">
                        Curriculum:
                      </span>{" "}
                      {item.curriculum}
                    </p>
                  )}

                  {item.academicCalendar && (
                    <p className="break-words">
                      <span className="font-medium text-gray-900">
                        Academic Calendar:
                      </span>{" "}
                      {item.academicCalendar}
                    </p>
                  )}

                  {item.examinationSystem && (
                    <p className="break-words">
                      <span className="font-medium text-gray-900">
                        Examination:
                      </span>{" "}
                      {item.examinationSystem}
                    </p>
                  )}

                  {item.rules && (
                    <p className="break-words">
                      <span className="font-medium text-gray-900">
                        Rules:
                      </span>{" "}
                      {item.rules}
                    </p>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => void handleDelete(item.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: FieldProps) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>

      <input
        type="text"
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200"
      />
    </label>
  );
}

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: TextAreaProps) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-gray-700">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200"
      />
    </label>
  );
}

export default AdminAcademics;
