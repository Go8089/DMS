import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Building2, Save } from "lucide-react";

import { getSchoolInfo, updateSchoolInfo } from "@/api/admin";
import type { SchoolInfo } from "@/types/admin";

const emptySchool: SchoolInfo = {
  id: 0,
  schoolName: "",
  address: "",
  phone: "",
  email: "",
  principalName: "",
  history: "",
  vision: "",
  mission: "",
};

function AdminSchool() {
  const [school, setSchool] = useState<SchoolInfo>(emptySchool);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadSchool() {
    try {
      setLoading(true);
      setError("");

      const data = await getSchoolInfo();

      if (data) {
        setSchool(data);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load school information.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSchool();
  }, []);

  function updateField(field: keyof SchoolInfo, value: string) {
    setSchool((current) => ({
      ...current,
      [field]: value,
    }));
    setMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const updated = await updateSchoolInfo(school);

      setSchool(updated);
      setMessage("School information updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update school information.",
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black";

  const labelClass =
    "mb-2 block text-sm font-medium text-gray-700";

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            School Information
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your school's basic information and profile.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Loading school information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          School Information
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage the basic information displayed throughout the school website.
        </p>
      </div>

      {/* Success message */}
      {message && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {message}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic information */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4 sm:px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
              <Building2 size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Basic Information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                School identity and contact details.
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <label className={labelClass}>School Name</label>
              <input
                required
                value={school.schoolName}
                onChange={(e) =>
                  updateField("schoolName", e.target.value)
                }
                className={inputClass}
                placeholder="Enter school name"
              />
            </div>

            <div>
              <label className={labelClass}>Principal Name</label>
              <input
                value={school.principalName}
                onChange={(e) =>
                  updateField("principalName", e.target.value)
                }
                className={inputClass}
                placeholder="Enter principal name"
              />
            </div>

            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                value={school.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={inputClass}
                placeholder="Enter contact number"
              />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={school.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={inputClass}
                placeholder="school@example.com"
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Address</label>
              <textarea
                rows={3}
                value={school.address}
                onChange={(e) => updateField("address", e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="Enter the complete school address"
              />
            </div>
          </div>
        </section>

        {/* About the school */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
            <h2 className="font-semibold text-gray-900">
              About the School
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Share the school's background, vision and mission.
            </p>
          </div>

          <div className="space-y-5 p-5 sm:p-6">
            <div>
              <label className={labelClass}>History</label>
              <textarea
                rows={5}
                value={school.history}
                onChange={(e) => updateField("history", e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="Describe the history of your school..."
              />
            </div>

            <div>
              <label className={labelClass}>Vision</label>
              <textarea
                rows={4}
                value={school.vision}
                onChange={(e) => updateField("vision", e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="Enter the school's vision..."
              />
            </div>

            <div>
              <label className={labelClass}>Mission</label>
              <textarea
                rows={4}
                value={school.mission}
                onChange={(e) => updateField("mission", e.target.value)}
                className={`${inputClass} resize-y`}
                placeholder="Enter the school's mission..."
              />
            </div>
          </div>
        </section>

        {/* Save changes */}
        <div className="flex flex-col-reverse gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm text-gray-500">
            Save your changes to update the school website.
          </p>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={17} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminSchool;
