
import { useEffect, useMemo, useState } from "react";
import {
  deleteAdmissionEnquiry,
  getAdmissionEnquiries,
} from "@/api/admin";
import type { AdmissionEnquiry } from "@/types/admin";

export default function AdminAdmissionEnquiries() {
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selected, setSelected] = useState<AdmissionEnquiry | null>(null);

  async function loadEnquiries() {
    try {
      setLoading(true);
      setError("");
      const data = await getAdmissionEnquiries();
      setEnquiries(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load enquiries."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadEnquiries();
  }, []);

  const filteredEnquiries = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return enquiries;

    return enquiries.filter((item) =>
      [
        item.studentName,
        item.parentName,
        item.phone,
        item.email,
        item.classApplyingFor,
      ].some((value) => value?.toLowerCase().includes(query))
    );
  }, [enquiries, search]);

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this admission enquiry permanently?")) return;

    try {
      setDeletingId(id);
      setError("");
      await deleteAdmissionEnquiry(id);

      setEnquiries((current) => current.filter((item) => item.id !== id));

      if (selected?.id === id) setSelected(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete enquiry."
      );
    } finally {
      setDeletingId(null);
    }
  }

  function formatDate(value: string) {
    if (!value) return "—";

    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleString();
  }

  return (
    <main className="space-y-6 bg-white p-4 text-slate-900 sm:p-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Admission Enquiries
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Review admission requests submitted by students and parents.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-medium text-slate-600">
            Total enquiries
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {enquiries.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-medium text-slate-600">
            Search results
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {filteredEnquiries.length}
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <label
          htmlFor="enquiry-search"
          className="mb-2 block text-sm font-semibold text-slate-800"
        >
          Search enquiries
        </label>

        <input
          id="enquiry-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search student, parent, phone, email or class..."
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </section>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800"
        >
          {error}
          <button
            type="button"
            onClick={() => void loadEnquiries()}
            className="ml-3 font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <p className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
          Loading admission enquiries...
        </p>
      ) : filteredEnquiries.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <h2 className="font-semibold text-slate-900">
            No enquiries found
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {search
              ? "Try another search term."
              : "Admission enquiries will appear here when submitted."}
          </p>
        </div>
      ) : (
        <section className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[850px] border-collapse text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Parent</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Class</th>
                <th className="px-4 py-3 font-semibold">Submitted</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredEnquiries.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {item.studentName}
                  </td>
                  <td className="px-4 py-4">{item.parentName}</td>
                  <td className="px-4 py-4">
                    <div>{item.phone}</div>
                    <div className="mt-1 text-xs text-slate-600">
                      {item.email}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {item.classApplyingFor}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {formatDate(item.submittedAt)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelected(item)}
                        className="rounded-md border border-slate-300 px-3 py-2 font-medium text-slate-800 hover:bg-slate-100"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === item.id}
                        onClick={() => void handleDelete(item.id)}
                        className="rounded-md border border-red-300 px-3 py-2 font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId === item.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelected(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-detail-title"
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 text-slate-900 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="enquiry-detail-title"
                  className="text-xl font-bold text-slate-900"
                >
                  Enquiry details
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Submitted {formatDate(selected.submittedAt)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-md px-3 py-1 text-slate-600 hover:bg-slate-100"
                aria-label="Close details"
              >
                ✕
              </button>
            </div>

            <dl className="mt-6 space-y-4">
              {[
                ["Student", selected.studentName],
                ["Parent / Guardian", selected.parentName],
                ["Phone", selected.phone],
                ["Email", selected.email],
                ["Class applying for", selected.classApplyingFor],
                ["Message", selected.message || "No message provided"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-sm font-semibold text-slate-600">
                    {label}
                  </dt>
                  <dd className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-900">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-6 rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white hover:bg-blue-800"
            >
              Close
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

