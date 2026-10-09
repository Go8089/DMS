import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import {
  createAchievement,
  deleteAchievement,
  getAchievements,
  updateAchievement,
} from "@/api/admin";

import type { Achievement } from "@/types/admin";

interface AchievementForm {
  title: string;
  description: string;
  category: string;
  achievementDate: string;
  imageUrl: string;
}

const emptyForm: AchievementForm = {
  title: "",
  description: "",
  category: "",
  achievementDate: "",
  imageUrl: "",
};

function AdminAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [form, setForm] = useState<AchievementForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadAchievements() {
    try {
      setLoading(true);
      setError("");

      const data = await getAchievements();
      setAchievements(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load achievements.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAchievements();
  }, []);

  function handleChange(field: keyof AchievementForm, value: string) {
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

  function openEditForm(achievement: Achievement) {
    setEditingId(achievement.id);

    setForm({
      title: achievement.title,
      description: achievement.description,
      category: achievement.category,
      achievementDate: achievement.achievementDate,
      imageUrl: achievement.imageUrl ?? "",
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

      if (editingId === null) {
        await createAchievement(form);
      } else {
        await updateAchievement(editingId, form);
      }

      closeForm();
      await loadAchievements();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save achievement.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Are you sure you want to delete this achievement?")) {
      return;
    }

    try {
      setError("");
      await deleteAchievement(id);
      await loadAchievements();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete achievement.",
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Achievements
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage academic, sports and competition achievements.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Achievement
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
                {editingId === null ? "Add Achievement" : "Edit Achievement"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Enter the achievement details below.
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
                  placeholder="District Level Science Competition"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="">Select category</option>
                  <option value="ACADEMIC">Academic</option>
                  <option value="SPORTS">Sports</option>
                  <option value="COMPETITION">Competition</option>
                  <option value="AWARD">Award</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Achievement Date
                </label>
                <input
                  required
                  type="date"
                  value={form.achievementDate}
                  onChange={(e) =>
                    handleChange("achievementDate", e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="https://..."
                />
              </div>
            </div>

            {form.imageUrl.trim() && (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Image Preview
                </p>
                <img
                  src={form.imageUrl}
                  alt="Achievement preview"
                  className="h-36 w-48 rounded-lg border border-gray-200 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = "block";
                  }}
                />
              </div>
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
                placeholder="Describe the achievement..."
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
                  : editingId === null
                    ? "Create Achievement"
                    : "Update Achievement"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Achievements table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 sm:px-6">
          <div>
            <h2 className="font-semibold text-gray-900">
              All Achievements
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {achievements.length}{" "}
              {achievements.length === 1 ? "achievement" : "achievements"}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading achievements...
          </div>
        ) : achievements.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm font-medium text-gray-900">
              No achievements found
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Add an achievement to display it here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-6">
                    Achievement
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Category
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Date
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 sm:px-6">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {achievements.map((achievement) => (
                  <tr
                    key={achievement.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        {achievement.imageUrl ? (
                          <img
                            src={achievement.imageUrl}
                            alt={achievement.title}
                            className="h-12 w-12 shrink-0 rounded-lg border border-gray-200 object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-sm font-semibold text-gray-600">
                            {achievement.title.charAt(0).toUpperCase() || "A"}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">
                            {achievement.title}
                          </p>
                          <p className="mt-1 max-w-md truncate text-sm text-gray-500">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                        {achievement.category}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                      {achievement.achievementDate}
                    </td>

                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(achievement)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                          title="Edit achievement"
                          aria-label={`Edit ${achievement.title}`}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(achievement.id)}
                          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                          title="Delete achievement"
                          aria-label={`Delete ${achievement.title}`}
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

export default AdminAchievements;
