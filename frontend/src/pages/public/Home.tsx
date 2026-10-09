
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import { getGallery, getSchoolInfo, getNotices, getEvents } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { GalleryItem, SchoolInfo, Notice, Event } from "@/types/admin";

export default function Home() {
  const [school, setSchool] = useState<SchoolInfo | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    Promise.allSettled([
      getSchoolInfo(),
      getGallery(),
      getNotices(),
      getEvents(),
    ]).then(([schoolResult, galleryResult, noticeResult, eventResult]) => {
      if (schoolResult.status === "fulfilled") setSchool(schoolResult.value);
      if (galleryResult.status === "fulfilled") setGallery(galleryResult.value);
      if (noticeResult.status === "fulfilled") setNotices(noticeResult.value);
      if (eventResult.status === "fulfilled") setEvents(eventResult.value);
    });
  }, []);

  const images = getHeroImages(gallery);

  return (
    <main className="min-h-screen bg-[#030817] text-white">
      <PublicPageHero
        eyebrow={school?.schoolName || "Welcome to our school"}
        title="Shaping Bright"
        highlight="Futures Together"
        description={
          school?.vision ||
          "A nurturing learning environment where every student can learn, grow, and discover their potential."
        }
        images={images}
        animation="zoom"
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/admissions"
            className="rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
          >
            Explore Admissions
          </Link>
          <Link
            to="/about"
            className="rounded-full border border-blue-300/40 px-6 py-3 font-semibold text-white transition hover:bg-blue-500/15"
          >
            Learn More
          </Link>
        </div>
      </PublicPageHero>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Quality Education", description: "Strong foundations for lifelong learning.", to: "/academics" },
          { title: "Experienced Faculty", description: "Guidance and support at every step.", to: "/faculty" },
          { title: "Modern Facilities", description: "Spaces designed for learning and growth.", to: "/facilities" },
          { title: "School Gallery", description: "Explore life and activities at our school.", to: "/gallery" },
        ].map((item, index) => (
          <Link key={item.title} to={item.to}>
            <PublicCard
              title={item.title}
              description={item.description}
              image={images[index % Math.max(images.length, 1)]}
            />
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-blue-400/20 bg-[#081329]/80 p-7">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">Our school</p>
            <h2 className="mt-3 text-2xl font-bold">Learning with purpose</h2>
            <p className="mt-4 leading-8 text-slate-300">
              {school?.history || "Our school is committed to providing a supportive and inspiring education."}
            </p>
            <Link to="/about" className="mt-5 inline-block text-sky-300 hover:text-white">Discover our story →</Link>
          </div>

          <div className="rounded-2xl border border-blue-400/20 bg-[#081329]/80 p-7">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">Our mission</p>
            <h2 className="mt-3 text-2xl font-bold">Helping students thrive</h2>
            <p className="mt-4 leading-8 text-slate-300">
              {school?.mission || "We encourage curiosity, creativity, confidence, and responsibility."}
            </p>
            <Link to="/academics" className="mt-5 inline-block text-sky-300 hover:text-white">Explore academics →</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 mt-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-sky-300">Stay informed</p>
            <h2 className="mt-2 text-3xl font-bold">Latest Notices</h2>
          </div>
          <Link to="/notices" className="text-sky-300 hover:text-white">All notices →</Link>
        </div>

        {notices.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {notices.slice(0, 4).map((notice) => (
              <PublicCard
                key={notice.id}
                title={notice.title}
                description={notice.description}
                eyebrow={notice.noticeDate}
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No notices available right now.</p>
        )}

        <div className="mb-8 mt-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-violet-300">What's happening</p>
            <h2 className="mt-2 text-3xl font-bold">Upcoming Events</h2>
          </div>
          <Link to="/events" className="text-sky-300 hover:text-white">All events →</Link>
        </div>

        {events.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {events.slice(0, 3).map((event) => (
              <PublicCard
                key={event.id}
                title={event.title}
                description={event.description}
                image={event.imageUrl}
                eyebrow={`${event.eventDate} · ${event.location}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No events available right now.</p>
        )}
      </section>
    </main>
  );
}
