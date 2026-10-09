import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Pencil, Plus, Trash2, X, ExternalLink } from "lucide-react";

import {
  createAdmissionInfo,
  deleteAdmissionInfo,
  getAdminAdmissionInfo,
  updateAdmissionInfo,
} from "@/api/admin";

import type { AdmissionInfo } from "@/types/admin";

type AdmissionForm = Omit<AdmissionInfo, "id">;

const emptyForm: AdmissionForm = {
  title: "",
  description: "",
  procedure: "",
  eligibility: "",
  requiredDocuments: "",
  admissionDates: "",
  feeDetails: "",
  applicationFormUrl: "",
  brochureUrl: "",
  active: true,
};

function AdminAdmissions() {
  const [items, setItems] = useState<AdmissionInfo[]>([]);
  const [form, setForm] = useState<AdmissionForm>({ ...emptyForm });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadItems() {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminAdmissionInfo();
      setItems(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load admission information."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  function updateField(
    field: keyof AdmissionForm,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function openCreate() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError("");
    setShowForm(true);
  }

  function openEdit(item: AdmissionInfo) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      procedure: item.procedure,
      eligibility: item.eligibility,
      requiredDocuments: item.requiredDocuments,
      admissionDates: item.admissionDates,
      feeDetails: item.feeDetails,
      applicationFormUrl: item.applicationFormUrl ?? "",
      brochureUrl: item.brochureUrl ?? "",
      active: item.active,
    });
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingId === null) {
        await createAdmissionInfo(form);
      } else {
        await updateAdmissionInfo(editingId, form);
      }

      closeForm();
      await loadItems();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save admission information."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (
      !window.confirm(
        "Are you sure you want to delete this admission information?"
      )
    ) {
      return;
    }

    try {
      setError("");
      await deleteAdmissionInfo(id);
      await loadItems();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete admission information."
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Admissions
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage admission information displayed on the public website.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Admission Information
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Create / edit form */}
      {showForm && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId === null
                  ? "Add Admission Information"
                  : "Edit Admission Information"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Fill in the admission details below.
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              disabled={saving}
              aria-label="Close form"
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field
                id="admission-title"
                label="Title"
                value={form.title}
                onChange={(value) => updateField("title", value)}
                placeholder="e.g. Admissions 2026-27"
                required
              />

              <Field
                id="admission-dates"
                label="Admission Dates"
                value={form.admissionDates}
                onChange={(value) => updateField("admissionDates", value)}
                placeholder="e.g. April - June"
              />

              <Field
                id="admission-fees"
                label="Fee Details"
                value={form.feeDetails}
                onChange={(value) => updateField("feeDetails", value)}
                placeholder="Enter fee information"
              />

              <Field
                id="admission-application-url"
                label="Application Form URL"
                value={form.applicationFormUrl ?? ""}
                onChange={(value) =>
                  updateField("applicationFormUrl", value)
                }
                placeholder="https://example.com/application"
                type="url"
              />

              <Field
                id="admission-brochure-url"
                label="Brochure URL"
                value={form.brochureUrl ?? ""}
                onChange={(value) => updateField("brochureUrl", value)}
                placeholder="https://example.com/brochure.pdf"
                type="url"
              />

              <div className="flex items-center">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(event) =>
                      updateField("active", event.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300 accent-black"
                  />
                  <span>
                    <span className="block text-sm font-medium text-gray-900">
                      Active
                    </span>
                    <span className="mt-1 block text-sm text-gray-500">
                      Show this information on the website.
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <TextArea
              id="admission-description"
              label="Description"
              value={form.description}
              onChange={(value) => updateField("description", value)}
              placeholder="General admission information..."
            />

            <TextArea
              id="admission-procedure"
              label="Admission Procedure"
              value={form.procedure}
              onChange={(value) => updateField("procedure", value)}
              placeholder="Describe the admission procedure..."
            />

            <TextArea
              id="admission-eligibility"
              label="Eligibility"
              value={form.eligibility}
              onChange={(value) => updateField("eligibility", value)}
              placeholder="Enter eligibility requirements..."
            />

            <TextArea
              id="admission-documents"
              label="Required Documents"
              value={form.requiredDocuments}
              onChange={(value) =>
                updateField("requiredDocuments", value)
              }
              placeholder="List the required documents..."
            />

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
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
                    ? "Create Admission Information"
                    : "Update Admission Information"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Admission records */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-1 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold text-gray-900">
            Admission Information
          </h2>
          <p className="text-sm text-gray-500">
            {items.length} {items.length === 1 ? "record" : "records"}
          </p>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading admission information...
          </div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Plus size={22} className="text-gray-500" />
            </div>
            <p className="font-medium text-gray-900">
              No admission information found
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Add an admission record to display it here.
            </p>
            <button
              type="button"
              onClick={openCreate}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              <Plus size={16} />
              Add Admission Information
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Title
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Admission Dates
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Fee Details
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Links
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="max-w-xs px-5 py-4">
                      <p className="font-medium text-gray-900">
                        {item.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {item.description || "No description provided"}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-700">
                      {item.admissionDates || "—"}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-700">
                      <p className="max-w-xs whitespace-pre-line">
                        {item.feeDetails || "—"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-col items-start gap-2">
                        {item.applicationFormUrl && (
                          <a
                            href={item.applicationFormUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 underline underline-offset-2 hover:text-black"
                          >
                            Application
                            <ExternalLink size={13} />
                          </a>
                        )}
                        {item.brochureUrl && (
                          <a
                            href={item.brochureUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 underline underline-offset-2 hover:text-black"
                          >
                            Brochure
                            <ExternalLink size={13} />
                          </a>
                        )}
                        {!item.applicationFormUrl && !item.brochureUrl && (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {item.active ? (
                        <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          title="Edit admission information"
                          aria-label={`Edit ${item.title}`}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          title="Delete admission information"
                          aria-label={`Delete ${item.title}`}
                          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={17} />
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

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "url";
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
      />
    </div>
  );
}

interface TextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
}: TextAreaProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
      />
    </div>
  );
}

export default AdminAdmissions;

