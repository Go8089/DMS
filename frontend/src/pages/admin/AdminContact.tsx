import { useEffect, useState } from "react";
import { Trash2, Mail, Phone, MessageSquare } from "lucide-react";

import {
  deleteContactEnquiry,
  getContactEnquiries,
} from "@/api/admin";

import type { ContactEnquiry } from "@/types/admin";

function AdminContact() {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadEnquiries() {
    try {
      setLoading(true);
      setError("");

      const data = await getContactEnquiries();
      setEnquiries(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load contact enquiries."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadEnquiries();
  }, []);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact enquiry?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteContactEnquiry(id);
      setEnquiries((current) =>
        current.filter((enquiry) => enquiry.id !== id)
      );
      setSuccess("Contact enquiry deleted successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete enquiry."
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Contact Enquiries
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage messages submitted through the contact form.
        </p>
      </div>

      {/* Notifications */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {success}
        </div>
      )}

      {/* Enquiries Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-gray-900">
              Submitted Messages
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Contact messages received from visitors.
            </p>
          </div>

          <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            {enquiries.length}{" "}
            {enquiries.length === 1 ? "enquiry" : "enquiries"}
          </span>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading enquiries...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <MessageSquare
              className="mx-auto mb-3 text-gray-400"
              size={32}
            />
            <h3 className="font-medium text-gray-900">
              No contact enquiries yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              New messages submitted through the contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Name
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Contact Details
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Subject
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Message
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Submitted
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {enquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 align-top">
                      <p className="font-medium text-gray-900">
                        {enquiry.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        ID: {enquiry.id}
                      </p>
                    </td>

                    <td className="px-5 py-4 align-top">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Phone
                            size={14}
                            className="shrink-0 text-gray-400"
                          />
                          <span>{enquiry.phone || "Not provided"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail
                            size={14}
                            className="shrink-0 text-gray-400"
                          />
                          <span className="break-all">
                            {enquiry.email || "Not provided"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="max-w-[200px] px-5 py-4 align-top">
                      <p className="break-words text-sm font-medium text-gray-800">
                        {enquiry.subject || "No subject"}
                      </p>
                    </td>

                    <td className="max-w-[280px] px-5 py-4 align-top">
                      <p className="whitespace-pre-wrap break-words text-sm leading-5 text-gray-600">
                        {enquiry.message || "No message"}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 align-top text-sm text-gray-500">
                      {enquiry.submittedAt
                        ? new Date(enquiry.submittedAt).toLocaleString()
                        : "—"}
                    </td>

                    <td className="px-5 py-4 align-top">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => void handleDelete(enquiry.id)}
                          aria-label={`Delete enquiry from ${enquiry.name}`}
                          title="Delete enquiry"
                          className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
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

export default AdminContact;
