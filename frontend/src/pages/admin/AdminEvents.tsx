import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "@/api/admin";

import type { Event } from "@/types/admin";

interface EventForm {
  title: string;
  description: string;
  eventDate: string;
  location: string;
  imageUrl: string;
}

const emptyForm: EventForm = {
  title: "",
  description: "",
  eventDate: "",
  location: "",
  imageUrl: "",
};

function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<EventForm>({ ...emptyForm });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadEvents() {
    try {
      setLoading(true);
      setError("");

      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function handleChange(field: keyof EventForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function openCreateForm() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
    setError("");
  }

  function openEditForm(event: Event) {
    setEditingId(event.id);
    setForm({
      title: event.title,
      description: event.description,
      eventDate: event.eventDate,
      location: event.location,
      imageUrl: event.imageUrl ?? "",
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
        await createEvent(form);
      } else {
        await updateEvent(editingId, form);
      }

      closeForm();
      await loadEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save event.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      setError("");
      await deleteEvent(id);
      await loadEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Events
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage school events and activities.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Event
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
                {editingId === null ? "Add Event" : "Edit Event"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Enter the event details below.
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              disabled={saving}
              aria-label="Close form"
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="event-title"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="event-title"
                  required
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="Annual Sports Day"
                />
              </div>

              <div>
                <label
                  htmlFor="event-date"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="event-date"
                  required
                  type="date"
                  value={form.eventDate}
                  onChange={(e) => handleChange("eventDate", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="event-location"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Location <span className="text-red-500">*</span>
              </label>
              <input
                id="event-location"
                required
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                placeholder="School Ground"
              />
            </div>

            <div>
              <label
                htmlFor="event-description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="event-description"
                required
                rows={4}
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Describe the event..."
              />
            </div>

            <div>
              <label
                htmlFor="event-image"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                id="event-image"
                type="url"
                value={form.imageUrl}
                onChange={(e) => handleChange("imageUrl", e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                placeholder="https://example.com/event.jpg"
              />
            </div>

            {form.imageUrl.trim() && (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Image Preview
                </p>
                <img
                  src={form.imageUrl}
                  alt="Event preview"
                  className="hidden h-40 w-full rounded-lg border border-gray-200 object-cover sm:w-64"
                  onLoad={(e) => {
                    e.currentTarget.style.display = "block";
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

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
                className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId === null
                    ? "Create Event"
                    : "Update Event"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-1 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold text-gray-900">All Events</h2>
          <p className="text-sm text-gray-500">
            {events.length} {events.length === 1 ? "event" : "events"}
          </p>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <Plus size={22} className="text-gray-500" />
            </div>
            <p className="font-medium text-gray-900">No events found</p>
            <p className="mt-1 text-sm text-gray-500">
              Add an event to display it here.
            </p>
            <button
              type="button"
              onClick={openCreateForm}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              <Plus size={16} />
              Add Event
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Event
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Date
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Location
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="max-w-md px-5 py-4">
                      <div className="flex items-center gap-3">
                        {event.imageUrl ? (
                          <img
                            src={event.imageUrl}
                            alt=""
                            className="h-12 w-12 shrink-0 rounded-lg border border-gray-200 object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-600">
                            {event.title.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate font-medium text-gray-900">
                            {event.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                            {event.description || "No description provided"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-700">
                      {event.eventDate || "—"}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-700">
                      {event.location || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEditForm(event)}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                          title="Edit event"
                          aria-label={`Edit ${event.title}`}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(event.id)}
                          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                          title="Delete event"
                          aria-label={`Delete ${event.title}`}
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

export default AdminEvents;
