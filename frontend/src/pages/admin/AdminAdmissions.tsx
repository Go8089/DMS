import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import {
  deleteAdmissionEnquiry,
  getAdmissionEnquiries,
} from "@/api/admin";

import type { AdmissionEnquiry } from "@/types/admin";

function AdminAdmissions() {
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEnquiries() {
    try {
      setLoading(true);
      setError("");

      const data = await getAdmissionEnquiries();
      setEnquiries(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load admission enquiries."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  async function handleDelete(id: number) {
    if (
      !window.confirm(
        "Are you sure you want to delete this admission enquiry?"
      )
    ) {
      return;
    }

    try {
      setError("");
      await deleteAdmissionEnquiry(id);
      await loadEnquiries();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete enquiry."
      );
    }
  }

  return (
    <div className="min-h-full p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            Admission Enquiries
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View admission enquiries submitted by parents.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-8 text-center text-sm text-slate-500">
              Loading enquiries...
            </div>
          ) : enquiries.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No admission enquiries found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Parent
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Class
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Submitted
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {enquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">
                          {enquiry.studentName}
                        </div>

                        {enquiry.message && (
                          <div className="mt-1 max-w-xs truncate text-sm text-slate-500">
                            {enquiry.message}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {enquiry.parentName}
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-700">
                          {enquiry.phone}
                        </div>
                        <div className="text-sm text-slate-500">
                          {enquiry.email}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {enquiry.classApplyingFor}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(
                          enquiry.submittedAt
                        ).toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(enquiry.id)
                            }
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

export default AdminAdmissions;