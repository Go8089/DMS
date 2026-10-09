import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { FileText, Pencil, Plus, Trash2, X } from "lucide-react";

import {
  createNotice,
  deleteNotice,
  getNotices,
  updateNotice,
} from "@/api/admin";

import type { Notice } from "@/types/admin";

interface NoticeForm {
  title: string;
  description: string;
  type: string;
  noticeDate: string;
  documentUrl: string;
}

const emptyForm: NoticeForm = {
  title: "",
  description: "",
  type: "ANNOUNCEMENT",
  noticeDate: "",
  documentUrl: "",
};

function AdminNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [form, setForm] = useState<NoticeForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadNotices() {
    try {
      setLoading(true);
      setError("");

      const data = await getNotices();
      setNotices(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load notices.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotices();
  }, []);

  function handleChange(field: keyof NoticeForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError("");
  }

  function openEditForm(notice: Notice) {
    setEditingId(notice.id);

    setForm({
      title: notice.title,
      description: notice.description,
      type: notice.type,
      noticeDate: notice.noticeDate,
      documentUrl: notice.documentUrl ?? "",
    });

    setShowForm(true);
    setError("");
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (editingId !== null) {
        await updateNotice(editingId, form);
      } else {
        await createNotice(form);
      }

      closeForm();
      await loadNotices();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save notice.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Are you sure you want to delete this notice?")) {
      return;
    }

    try {
      setError("");
      await deleteNotice(id);
      await loadNotices();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete notice.",
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Notices</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage school announcements and circulars.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Notice
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
                {editingId !== null ? "Edit Notice" : "Create Notice"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {editingId !== null
                  ? "Update the selected notice."
                  : "Publish a new notice to the school website."}
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="School reopens on Monday"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  required
                  value={form.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="ANNOUNCEMENT">Announcement</option>
                  <option value="CIRCULAR">Circular</option>
                  <option value="HOLIDAY">Holiday</option>
                  <option value="EXAM">Exam</option>
                  <option value="NOTIFICATION">Notification</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Notice Date
                </label>
                <input
                  required
                  type="date"
                  value={form.noticeDate}
                  onChange={(e) => handleChange("noticeDate", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Document URL
                </label>
                <input
                  type="url"
                  value={form.documentUrl}
                  onChange={(e) => handleChange("documentUrl", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="https://..."
                />
              </div>
            </div>

            {form.documentUrl.trim() && (
              <a
                href={form.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-black"
              >
                <FileText size={16} />
                Preview document link
              </a>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Enter notice details..."
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
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
                    ? "Update Notice"
                    : "Publish Notice"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Notices table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 sm:px-6">
          <div>
            <h2 className="font-semibold text-gray-900">Published Notices</h2>
            <p className="mt-1 text-sm text-gray-500">
              {notices.length} {notices.length === 1 ? "notice" : "notices"}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading notices...
          </div>
        ) : notices.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm font-medium text-gray-900">
              No notices found
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Add a notice to publish a school announcement.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-6">
                    Notice
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Type
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Date
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Document
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-6">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {notices.map((notice) => (
                  <tr key={notice.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                          <FileText size={19} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">
                            {notice.title}
                          </p>
                          <p className="mt-1 max-w-md truncate text-sm text-gray-500">
                            {notice.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                        {notice.type}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                      {notice.noticeDate}
                    </td>

                    <td className="px-5 py-4">
                      {notice.documentUrl ? (
                        <a
                          href={notice.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-black"
                        >
                          View document
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>

                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(notice)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                          title="Edit notice"
                          aria-label={`Edit ${notice.title}`}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(notice.id)}
                          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                          title="Delete notice"
                          aria-label={`Delete ${notice.title}`}
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

export default AdminNotices;
