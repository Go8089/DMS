import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import {
  getSchoolInfo,
  updateSchoolInfo,
} from "@/api/admin";

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
          : "Failed to load school information."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSchool();
  }, []);

  function updateField(
    field: keyof SchoolInfo,
    value: string
  ) {
    setSchool((current) => ({
      ...current,
      [field]: value,
    }));
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
          : "Failed to update school information."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-sm text-slate-500">
        Loading school information...
      </div>
    );
  }

  return (
    <div className="min-h-full p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            School Information
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage the basic information displayed throughout the
            school website.
          </p>
        </div>

        {message && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <section>
            <h2 className="mb-5 text-lg font-semibold text-slate-900">
              Basic Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  School Name
                </label>

                <input
                  required
                  value={school.schoolName}
                  onChange={(e) =>
                    updateField("schoolName", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Principal Name
                </label>

                <input
                  value={school.principalName}
                  onChange={(e) =>
                    updateField(
                      "principalName",
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone
                </label>

                <input
                  value={school.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  value={school.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Address
              </label>

              <textarea
                rows={3}
                value={school.address}
                onChange={(e) =>
                  updateField("address", e.target.value)
                }
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
              />
            </div>
          </section>

          <section>
            <h2 className="mb-5 text-lg font-semibold text-slate-900">
              About the School
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  History
                </label>

                <textarea
                  rows={5}
                  value={school.history}
                  onChange={(e) =>
                    updateField("history", e.target.value)
                  }
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Vision
                </label>

                <textarea
                  rows={4}
                  value={school.vision}
                  onChange={(e) =>
                    updateField("vision", e.target.value)
                  }
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Mission
                </label>

                <textarea
                  rows={4}
                  value={school.mission}
                  onChange={(e) =>
                    updateField("mission", e.target.value)
                  }
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-slate-500"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end border-t border-slate-200 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminSchool;