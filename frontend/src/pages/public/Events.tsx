import { useEffect, useState } from "react";
import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import { getEvents, getGallery } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { Event, GalleryItem } from "@/types/admin";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getEvents(), getGallery()])
      .then(([eventData, galleryData]) => {
        setEvents(eventData);
        setGallery(galleryData);
      })
      .catch(() => setError("Unable to load events. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  const images = getHeroImages(gallery);
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
  );

  return (
    <main className="min-h-screen bg-[#030817] text-white">
      <PublicPageHero
        eyebrow="School Calendar"
        title="Our"
        highlight="Events"
        description="Explore the activities, celebrations, competitions, and experiences that bring our school community together."
        images={images}
        animation="zoom"
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 text-3xl font-bold">School Events</h2>

        {loading && <p className="text-slate-300">Loading events...</p>}
        {error && <p className="text-red-300">{error}</p>}
        {!loading && !error && sortedEvents.length === 0 && (
          <p className="text-slate-400">No events have been announced yet.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedEvents.map((event) => (
            <PublicCard
              key={event.id}
              title={event.title}
              description={event.description}
              image={event.imageUrl}
              eyebrow={`${event.eventDate} · ${event.location}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
