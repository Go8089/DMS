import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import { getGallery, getSchoolInfo } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { GalleryItem, SchoolInfo } from "@/types/admin";
import Footer from "@/components/public/Footer";

export default function About() {
  const [school, setSchool] = useState<SchoolInfo | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    getSchoolInfo().then(setSchool).catch(console.error);
    getGallery().then(setGallery).catch(console.error);
  }, []);

  const images = getHeroImages(gallery);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero slider: existing component and sizing preserved */}
      <PublicPageHero
        eyebrow="About Us"
        title="Our School"
        highlight="Our Pride"
        description={
          school?.history ||
          "Discover our story, values, and commitment to a supportive learning environment."
        }
        images={images}
        animation="slide"
      >
        <Link
          to="/academics"
          className="mt-8 inline-flex items-center rounded-md bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-md"
        >
          Discover Academics
          <span className="ml-2" aria-hidden="true">→</span>
        </Link>
      </PublicPageHero>

      {/* Vision, mission and history */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-16">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-800">
            Who We Are
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            The values behind our school
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            A learning community focused on knowledge, character, and the
            development of every student.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="animate-[aboutEnter_450ms_ease-out_both]">
            <PublicCard
              title="Our Vision"
              description={
                school?.vision ||
                "Inspiring students to become confident, curious, lifelong learners."
              }
            />
          </div>

          <div className="animate-[aboutEnter_450ms_ease-out_100ms_both]">
            <PublicCard
              title="Our Mission"
              description={
                school?.mission ||
                "Providing meaningful education and encouraging each student to grow."
              }
            />
          </div>

          <div className="animate-[aboutEnter_450ms_ease-out_200ms_both]">
            <PublicCard
              title="Our History"
              description={
                school?.history ||
                "Building a community dedicated to learning and achievement."
              }
            />
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-6 md:grid-cols-[220px_1fr] md:gap-12 md:py-16">
          <div className="flex justify-center md:justify-start">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-blue-100 bg-blue-50 p-3 shadow-sm transition duration-300 hover:scale-[1.03]">
              <div className="flex h-full w-full items-center justify-center rounded-full border border-blue-200 bg-white text-center">
                <div>
                  <span className="text-4xl text-blue-800" aria-hidden="true">
                    ✦
                  </span>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                    School Leadership
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-[aboutEnter_500ms_ease-out_both]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-800">
              Meet Our Leadership
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {school?.principalName || "Our Principal"}
            </h2>

            <div className="mt-4 h-1 w-12 rounded-full bg-blue-800" />

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Dedicated to supporting students, teachers, and families through
              a strong culture of learning.
            </p>

            <Link
              to="/faculty"
              className="mt-5 inline-flex items-center text-sm font-semibold text-blue-800 transition-colors hover:text-blue-950"
            >
              Meet our faculty
              <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes aboutEnter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            scroll-behavior: auto !important;
            transition: none !important;
          }
        }
      `}</style>
      <Footer />
    </main>
  );
}
