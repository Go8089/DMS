import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Bell,
  GraduationCap,
  Images,
  Phone,
} from "lucide-react";

import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import {
  getGallery,
  getSchoolInfo,
  getNotices,
  getEvents,
} from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type {
  GalleryItem,
  SchoolInfo,
  Notice,
  Event,
} from "@/types/admin";

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
      if (schoolResult.status === "fulfilled")
        setSchool(schoolResult.value);
      if (galleryResult.status === "fulfilled")
        setGallery(galleryResult.value);
      if (noticeResult.status === "fulfilled")
        setNotices(noticeResult.value);
      if (eventResult.status === "fulfilled")
        setEvents(eventResult.value);
    });
  }, []);

  // Keep the existing hero slider and its images unchanged.
  const images = getHeroImages(gallery);

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* HERO SLIDER — unchanged */}
      <PublicPageHero
        eyebrow={school?.schoolName || "Welcome to our school"}
        title="Shaping Bright"
        highlight="Futures Together"
        description={
          school?.vision ||
          "A welcoming place to learn, grow, and discover every student's potential."
        }
        images={images}
        animation="zoom"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Admissions <ArrowRight size={16} />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-md border border-white/50 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            About our school
          </Link>
        </div>
      </PublicPageHero>

      {/* SCHOOL FEATURES */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Discover DMS
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">
            Learning beyond the classroom
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              title: "Academics",
              description: "Build strong foundations for lifelong learning.",
              to: "/academics",
              icon: GraduationCap,
            },
            {
              title: "School life",
              description: "Explore student activities and campus moments.",
              to: "/gallery",
              icon: Images,
            },
            {
              title: "Our faculty",
              description: "Meet the people who guide our students.",
              to: "/faculty",
              icon: GraduationCap,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                to={item.to}
                className="group flex items-start gap-3 rounded-lg border border-slate-200 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                  <Icon size={21} />
                </span>
                <span>
                  <span className="font-semibold text-slate-800 group-hover:text-blue-800">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm leading-5 text-slate-600">
                    {item.description}
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className="ml-auto mt-1 shrink-0 text-slate-400 transition group-hover:translate-x-1"
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* SCHOOL STORY */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-9 sm:px-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              About our school
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              A place to learn and grow
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
              {school?.history ||
                "We aim to provide a supportive learning environment where students develop knowledge, confidence, and character."}
            </p>
            <Link
              to="/about"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-800 hover:underline"
            >
              Read our story <ArrowRight size={16} />
            </Link>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Our mission
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              Helping every student thrive
            </h3>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
              {school?.mission ||
                "We encourage curiosity, creativity, responsibility, and a lifelong love of learning."}
            </p>
            <Link
              to="/academics"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-800 hover:underline"
            >
              Explore academics <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Life at DMS
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
              School Gallery
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-800 hover:underline"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {images.slice(0, 4).map((src, index) => (
              <Link
                to="/gallery"
                key={`${src}-${index}`}
                aria-label={`Explore school gallery image ${index + 1}`}
                className={`group relative overflow-hidden rounded-lg border border-slate-200 ${
                  index === 0
                    ? "col-span-2 row-span-2 aspect-square sm:aspect-auto"
                    : "aspect-[4/3]"
                }`}
              >
                <img
                  src={src}
                  alt={`School gallery ${index + 1}`}
                  loading="lazy"
                  className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
                    index === 0 ? "rounded-full p-5" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-slate-200 p-5 text-sm text-slate-500">
            Gallery images will appear here when available.
          </p>
        )}
      </section>

      {/* NOTICES */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
              <Bell size={14} /> Updates
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
              Latest Notices
            </h2>
          </div>
          <Link
            to="/notices"
            className="text-sm font-semibold text-blue-800 hover:underline"
          >
            All notices
          </Link>
        </div>

        {notices.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {notices.slice(0, 3).map((notice) => (
              <div
                key={notice.id}
                className="transition duration-200 hover:-translate-y-0.5"
              >
                <PublicCard
                  title={notice.title}
                  description={notice.description}
                  eyebrow={notice.noticeDate}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-slate-200 p-4 text-sm text-slate-500">
            No notices available right now.
          </p>
        )}
      </section>

      {/* EVENTS */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
              <CalendarDays size={14} /> Campus life
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
              Upcoming Events
            </h2>
          </div>
          <Link
            to="/events"
            className="text-sm font-semibold text-blue-800 hover:underline"
          >
            All events
          </Link>
        </div>

        {events.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="transition duration-200 hover:-translate-y-0.5"
              >
                <PublicCard
                  title={event.title}
                  description={event.description}
                  image={event.imageUrl}
                  eyebrow={`${event.eventDate} · ${event.location}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-slate-200 p-4 text-sm text-slate-500">
            No events available right now.
          </p>
        )}
      </section>

      {/* COMPACT ADMISSIONS AND CONTACT */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Join our school community
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Learn about admission procedures or get in touch with us.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Admissions <ArrowRight size={15} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <Phone size={15} /> Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
