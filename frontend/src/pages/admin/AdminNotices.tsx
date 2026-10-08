import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadNotices() {
    try {
      setError("");
      const data = await getNotices();
      setNotices(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load notices."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotices();
  }, []);

  function handleChange(
    field: keyof NoticeForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(notice: Notice) {
    setEditingId(notice.id);

    setForm({
      title: notice.title,
      description: notice.description,
      type: notice.type,
      noticeDate: notice.noticeDate,
      documentUrl: notice.documentUrl ?? "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      if (editingId !== null) {
        await updateNotice(editingId, form);
      } else {
        await createNotice(form);
      }

      resetForm();
      await loadNotices();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save notice."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      await deleteNotice(id);
      await loadNotices();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete notice."
      );
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-semibold text-slate-900">
          Notices
        </h1>

        <p className="mt-2 text-slate-500">
          Create and manage school announcements and circulars.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {editingId !== null
                ? "Edit Notice"
                : "Create Notice"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {editingId !== null
                ? "Update the selected notice."
                : "Publish a new notice to the school website."}
            </p>
          </div>

          {editingId !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-100"
            >
              <X size={16} />
              Cancel
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 md:grid-cols-2"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>

            <input
              value={form.title}
              onChange={(e) =>
                handleChange("title", e.target.value)
              }
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-slate-900"
              placeholder="School reopens on Monday"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Type
            </label>

            <select
              value={form.type}
              onChange={(e) =>
                handleChange("type", e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none focus:border-slate-900"
            >
              <option value="ANNOUNCEMENT">
                Announcement
              </option>
              <option value="CIRCULAR">Circular</option>
              <option value="HOLIDAY">Holiday</option>
              <option value="EXAM">Exam</option>
              <option value="NOTIFICATION">
                Notification
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Notice Date
            </label>

            <input
              type="date"
              value={form.noticeDate}
              onChange={(e) =>
                handleChange("noticeDate", e.target.value)
              }
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Document URL
            </label>

            <input
              type="url"
              value={form.documentUrl}
              onChange={(e) =>
                handleChange("documentUrl", e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-slate-900"
              placeholder="https://..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(e) =>
                handleChange("description", e.target.value)
              }
              required
              rows={4}
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-slate-900"
              placeholder="Enter notice details..."
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              <Plus size={17} />

              {saving
                ? "Saving..."
                : editingId !== null
                  ? "Update Notice"
                  : "Publish Notice"}
            </button>
          </div>
        </form>
      </section>

      {/* Notices table */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="font-semibold text-slate-900">
            Published Notices
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {notices.length} notice
            {notices.length === 1 ? "" : "s"}
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-slate-500">
            Loading notices...
          </div>
        ) : notices.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">
            No notices found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-medium">
                    Title
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Type
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Date
                  </th>

                  <th className="px-6 py-4 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {notices.map((notice) => (
                  <tr
                    key={notice.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">
                        {notice.title}
                      </p>

                      <p className="mt-1 max-w-xl truncate text-slate-500">
                        {notice.description}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        {notice.type}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {notice.noticeDate}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => startEdit(notice)}
                          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(notice.id)
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                          title="Delete"
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
      </section>
    </div>
  );
}

export default AdminNotices;