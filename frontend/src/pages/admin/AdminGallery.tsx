import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import {
  createGalleryItem,
  deleteGalleryItem,
  getGallery,
  updateGalleryItem,
} from "@/api/admin";

import type { GalleryItem } from "@/types/admin";

interface GalleryForm {
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: "PHOTO" | "VIDEO";
  category: string;
  homepageSlider: boolean;
  active: boolean;
}

const emptyForm: GalleryForm = {
  title: "",
  description: "",
  mediaUrl: "",
  mediaType: "PHOTO",
  category: "",
  homepageSlider: false,
  active: true,
};

const categories = [
  { value: "CAMPUS", label: "Campus" },
  { value: "EVENTS", label: "Events" },
  { value: "ACTIVITIES", label: "Activities" },
  { value: "CELEBRATIONS", label: "Celebrations" },
  { value: "SPORTS", label: "Sports" },
  { value: "COMPETITIONS", label: "Competitions" },
  { value: "FUNCTIONS", label: "Functions" },
  { value: "OTHER", label: "Other" },
];

function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<GalleryForm>(emptyForm);
  const [error, setError] = useState("");

  async function loadGallery() {
    try {
      setLoading(true);
      setError("");

      const data = await getGallery();
      setItems(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load gallery items."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGallery();
  }, []);

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  }

  function openEditForm(item: GalleryItem) {
    setEditingId(item.id);

    setForm({
      title: item.title ?? "",
      description: item.description ?? "",
      mediaUrl: item.mediaUrl ?? "",
      mediaType: item.mediaType ?? "PHOTO",
      category: item.category ?? "",
      homepageSlider: item.homepageSlider ?? false,
      active: item.active ?? true,
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

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!form.category) {
      setError("Please select a category.");
      return;
    }

    if (!form.mediaUrl.trim()) {
      setError("Media URL is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingId !== null) {
        await updateGalleryItem(editingId, form);
      } else {
        await createGalleryItem(form);
      }

      await loadGallery();
      closeForm();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save gallery item."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery item?"
    );

    if (!confirmed) return;

    try {
      setError("");
      await deleteGalleryItem(id);
      await loadGallery();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete gallery item."
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Gallery
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage school photos and videos.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Gallery Item
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId !== null
                  ? "Edit Gallery Item"
                  : "Add Gallery Item"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add a photo or video to the school gallery.
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              disabled={saving}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label
                htmlFor="gallery-title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Title
              </label>

              <input
                id="gallery-title"
                type="text"
                value={form.title}
                onChange={(event) =>
                  setForm({
                    ...form,
                    title: event.target.value,
                  })
                }
                placeholder="Annual Sports Day"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Category + Media Type */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Category */}
              <div>
                <label
                  htmlFor="gallery-category"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Category
                </label>

                <select
                  id="gallery-category"
                  value={form.category}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      category: event.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="">Select category</option>

                  {categories.map((category) => (
                    <option
                      key={category.value}
                      value={category.value}
                    >
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Media Type */}
              <div>
                <label
                  htmlFor="gallery-media-type"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Media Type
                </label>

                <select
                  id="gallery-media-type"
                  value={form.mediaType}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      mediaType: event.target.value as
                        | "PHOTO"
                        | "VIDEO",
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="PHOTO">Photo</option>
                  <option value="VIDEO">Video</option>
                </select>
              </div>
            </div>

            {/* Media URL */}
            <div>
              <label
                htmlFor="gallery-media-url"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Media URL
              </label>

              <input
                id="gallery-media-url"
                type="url"
                value={form.mediaUrl}
                onChange={(event) =>
                  setForm({
                    ...form,
                    mediaUrl: event.target.value,
                  })
                }
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />

              <p className="mt-1.5 text-xs text-gray-500">
                Enter the public URL of the image or video.
              </p>
            </div>

            {/* Preview */}
            {form.mediaUrl.trim() &&
              form.mediaType === "PHOTO" && (
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Preview
                  </p>

                  <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                    <img
                      src={form.mediaUrl}
                      alt="Gallery preview"
                      className="h-56 w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}

            {/* Description */}
            <div>
              <label
                htmlFor="gallery-description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="gallery-description"
                value={form.description}
                onChange={(event) =>
                  setForm({
                    ...form,
                    description: event.target.value,
                  })
                }
                placeholder="Brief description of this photo or video..."
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-4 border-t border-gray-200 pt-5 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={form.homepageSlider}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      homepageSlider: event.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Homepage Slider
                  </p>

                  <p className="text-xs text-gray-500">
                    Show this item on the homepage slider.
                  </p>
                </div>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      active: event.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Active
                  </p>

                  <p className="text-xs text-gray-500">
                    Make this item visible on the public website.
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
                    ? "Update Gallery Item"
                    : "Save Gallery Item"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery List */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">
            Gallery Items
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {items.length}{" "}
            {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-sm text-gray-500">
            Loading gallery...
          </div>
        ) : items.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-gray-500">
              No gallery items found.
            </p>

            <button
              type="button"
              onClick={openCreateForm}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Plus size={16} />
              Add First Gallery Item
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Media
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Title
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Category
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Type
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Homepage
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
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* Media */}
                    <td className="px-6 py-4">
                      {item.mediaType === "PHOTO" &&
                      item.mediaUrl ? (
                        <img
                          src={item.mediaUrl}
                          alt={item.title}
                          className="h-14 w-20 rounded-lg border border-gray-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-gray-100 text-xs font-medium text-gray-500">
                          VIDEO
                        </div>
                      )}
                    </td>

                    {/* Title */}
                    <td className="px-6 py-4">
                      <div className="max-w-[220px]">
                        <p className="font-medium text-gray-900">
                          {item.title}
                        </p>

                        {item.description && (
                          <p className="mt-1 truncate text-xs text-gray-500">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        {item.category || "—"}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.mediaType === "PHOTO"
                        ? "Photo"
                        : "Video"}
                    </td>

                    {/* Homepage */}
                    <td className="px-6 py-4">
                      {item.homepageSlider ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Yes
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                          No
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {item.active ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(item)}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                          title="Delete"
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

export default AdminGallery;