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
          : "Failed to load achievements."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAchievements();
  }, []);

  function handleChange(
    field: keyof AchievementForm,
    value: string
  ) {
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
          : "Failed to save achievement."
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
          : "Failed to delete achievement."
      );
    }
  }

  return (
    <div className="min-h-full p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Achievements
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage academic, sports and competition achievements.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            <Plus size={18} />
            Add Achievement
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {showForm && (
          <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingId === null
                  ? "Add Achievement"
                  : "Edit Achievement"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Title
                  </label>

                  <input
                    required
                    value={form.title}
                    onChange={(e) =>
                      handleChange("title", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                    placeholder="District Level Science Competition"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Category
                  </label>

                  <select
                    required
                    value={form.category}
                    onChange={(e) =>
                      handleChange("category", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                  >
                    <option value="">Select category</option>
                    <option value="ACADEMIC">Academic</option>
                    <option value="SPORTS">Sports</option>
                    <option value="COMPETITION">Competition</option>
                    <option value="AWARD">Award</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Achievement Date
                </label>

                <input
                  required
                  type="date"
                  value={form.achievementDate}
                  onChange={(e) =>
                    handleChange("achievementDate", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    handleChange("description", e.target.value)
                  }
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                  placeholder="Describe the achievement..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Image URL
                </label>

                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) =>
                    handleChange("imageUrl", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                  placeholder="https://..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
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

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-8 text-center text-sm text-slate-500">
              Loading achievements...
            </div>
          ) : achievements.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No achievements found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Achievement
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Date
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {achievements.map((achievement) => (
                    <tr
                      key={achievement.id}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">
                          {achievement.title}
                        </div>
                        <div className="mt-1 max-w-md truncate text-sm text-slate-500">
                          {achievement.description}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {achievement.category}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {achievement.achievementDate}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditForm(achievement)}
                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                            title="Edit"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(achievement.id)}
                            className="rounded-lg p-2 text-red-500 hover:bg-red-50"
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
        </div>
      </div>
    </div>
  );
}

export default AdminAchievements;