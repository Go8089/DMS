import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import {
  createFacility,
  deleteFacility,
  getFacilities,
  updateFacility,
} from "@/api/admin";

import type { Facility } from "@/types/admin";

interface FacilityForm {
  name: string;
  description: string;
  imageUrl: string;
  active: boolean;
}

const emptyForm: FacilityForm = {
  name: "",
  description: "",
  imageUrl: "",
  active: true,
};

function AdminFacilities() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [form, setForm] = useState<FacilityForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadFacilities() {
    try {
      setLoading(true);
      setError("");

      const data = await getFacilities();
      setFacilities(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load facilities."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFacilities();
  }, []);

  function openCreateForm() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
    setError("");
  }

  function openEditForm(facility: Facility) {
    setEditingId(facility.id);
    setForm({
      name: facility.name,
      description: facility.description,
      imageUrl: facility.imageUrl ?? "",
      active: facility.active,
    });
    setShowForm(true);
    setError("");
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (editingId === null) {
        await createFacility(form);
      } else {
        await updateFacility(editingId, form);
      }

      closeForm();
      await loadFacilities();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save facility."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Are you sure you want to delete this facility?")) {
      return;
    }

    try {
      setError("");
      await deleteFacility(id);
      await loadFacilities();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete facility."
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Facilities
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage school facilities displayed on the website.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Facility
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
                {editingId === null ? "Add Facility" : "Edit Facility"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Enter the facility details below.
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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="facility-name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Facility Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="facility-name"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      name: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="e.g. Library"
                />
              </div>

              <div>
                <label
                  htmlFor="facility-image"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Image URL
                </label>
                <input
                  id="facility-image"
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      imageUrl: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="https://example.com/image.jpg"
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
                  alt="Facility preview"
                  className="h-40 w-full rounded-lg border border-gray-200 object-cover sm:w-64"
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
              <label
                htmlFor="facility-description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="facility-description"
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    description: e.target.value,
                  }))
                }
                className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Describe the facility..."
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    active: e.target.checked,
                  }))
                }
                className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-black"
              />
              <span>
                <span className="block text-sm font-medium text-gray-900">
                  Active
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  Show this facility on the website.
                </span>
              </span>
            </label>

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
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId === null
                    ? "Create Facility"
                    : "Update Facility"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Facilities table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-1 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold text-gray-900">
            All Facilities
          </h2>
          <p className="text-sm text-gray-500">
            {facilities.length} {facilities.length === 1 ? "facility" : "facilities"}
          </p>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading facilities...
          </div>
        ) : facilities.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Plus size={22} className="text-gray-500" />
            </div>
            <p className="font-medium text-gray-900">No facilities found</p>
            <p className="mt-1 text-sm text-gray-500">
              Add a facility to display it here.
            </p>
            <button
              type="button"
              onClick={openCreateForm}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              <Plus size={16} />
              Add Facility
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Facility
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Description
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
                {facilities.map((facility) => (
                  <tr
                    key={facility.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {facility.imageUrl ? (
                          <img
                            src={facility.imageUrl}
                            alt=""
                            className="h-11 w-11 shrink-0 rounded-lg border border-gray-200 object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-600">
                            {facility.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium text-gray-900">
                          {facility.name}
                        </span>
                      </div>
                    </td>

                    <td className="max-w-md px-5 py-4 text-sm text-gray-600">
                      <p className="line-clamp-2">
                        {facility.description || "No description provided"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      {facility.active ? (
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
                          onClick={() => openEditForm(facility)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                          title="Edit facility"
                          aria-label={`Edit ${facility.name}`}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(facility.id)}
                          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                          title="Delete facility"
                          aria-label={`Delete ${facility.name}`}
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

export default AdminFacilities;
