import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import {
  createDocument,
  deleteDocument,
  getDocuments,
  updateDocument,
} from "@/api/admin";

import type { SchoolDocument, DocumentRequest } from "@/api/admin";

const emptyForm: DocumentRequest = {
  title: "",
  description: "",
  documentUrl: "",
  category: "GENERAL",
  active: true,
};

const categories = [
  "GENERAL",
  "ADMISSION",
  "ACADEMIC",
  "NOTICE",
  "EXAMINATION",
  "FEES",
  "HOLIDAY",
  "OTHER",
];

export default function AdminDocuments() {
  const [documents, setDocuments] = useState<SchoolDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<DocumentRequest>(emptyForm);
  const [error, setError] = useState("");

  async function loadDocuments() {
    try {
      setLoading(true);
      setError("");

      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load documents."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadDocuments();
  }, []);

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  }

  function openEditForm(document: SchoolDocument) {
    setEditingId(document.id);

    setForm({
      title: document.title ?? "",
      description: document.description ?? "",
      documentUrl: document.documentUrl ?? "",
      category: document.category ?? "GENERAL",
      active: document.active ?? true,
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

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleActiveChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm((current) => ({
      ...current,
      active: event.target.checked,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Document title is required.");
      return;
    }

    if (!form.documentUrl.trim()) {
      setError("Document URL is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingId !== null) {
        await updateDocument(editingId, form);
      } else {
        await createDocument(form);
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);

      await loadDocuments();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save document."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) return;

    try {
      setError("");
      await deleteDocument(id);

      if (editingId === id) {
        setShowForm(false);
        setEditingId(null);
        setForm(emptyForm);
      }

      await loadDocuments();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete document."
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Documents
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage school documents and downloadable resources.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Document
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
                {editingId !== null ? "Edit Document" : "Add Document"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add a downloadable resource for the school website.
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
            {/* Title */}
            <div>
              <label
                htmlFor="document-title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Title
              </label>

              <input
                id="document-title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Admission Form 2026"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="document-category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Category
              </label>

              <select
                id="document-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Document URL */}
            <div>
              <label
                htmlFor="document-url"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Document URL
              </label>

              <input
                id="document-url"
                name="documentUrl"
                type="url"
                value={form.documentUrl}
                onChange={handleChange}
                placeholder="https://example.com/document.pdf"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              />

              <p className="mt-1.5 text-xs text-gray-500">
                Enter the publicly accessible URL of the document.
              </p>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="document-description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="document-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description of this document..."
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Active */}
            <div className="border-t border-gray-200 pt-5">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={handleActiveChange}
                  className="h-4 w-4 rounded border-gray-300 accent-black"
                />

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Active
                  </p>

                  <p className="text-xs text-gray-500">
                    Make this document available on the public website.
                  </p>
                </div>
              </label>
            </div>

            {/* Buttons */}
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
                  : editingId !== null
                    ? "Update Document"
                    : "Save Document"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Documents Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">
            Documents
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {documents.length}{" "}
            {documents.length === 1 ? "document" : "documents"}
          </p>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-sm text-gray-500">
            Loading documents...
          </div>
        ) : documents.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-gray-500">
              No documents found.
            </p>

            <button
              type="button"
              onClick={openCreateForm}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              <Plus size={16} />
              Add First Document
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Title
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Category
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Document
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {documents.map((document) => (
                  <tr
                    key={document.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="max-w-[240px]">
                        <p className="font-medium text-gray-900">
                          {document.title}
                        </p>

                        {document.description && (
                          <p className="mt-1 truncate text-xs text-gray-500">
                            {document.description}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        {document.category || "—"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <a
                        href={document.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-700 underline underline-offset-2 hover:text-blue-900"
                      >
                        Open document
                      </a>
                    </td>

                    <td className="px-6 py-4">
                      {document.active ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(document)}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                          title="Edit document"
                          aria-label={`Edit ${document.title}`}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(document.id)}
                          className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                          title="Delete document"
                          aria-label={`Delete ${document.title}`}
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

