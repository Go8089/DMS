import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, CalendarDays, ClipboardCheck, BookMarked, ListChecks } from "lucide-react";
import PublicPageHero from "@/components/public/PublicPageHero";
import { getAcademicInfo, getGallery } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { AcademicInfo, GalleryItem } from "@/types/admin";

export default function Academics() {
  const [academicInfo, setAcademicInfo] = useState<AcademicInfo[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getAcademicInfo(), getGallery()])
      .then(([academicData, galleryData]) => {
        setAcademicInfo(academicData);
        setGallery(galleryData);
      })
      .catch(() => {
        setError("Unable to load academic information. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const images = getHeroImages(gallery);

  const details = [
    {
      title: "Classes Offered",
      field: "classesOffered" as const,
      icon: GraduationCap,
    },
    {
      title: "Subjects",
      field: "subjects" as const,
      icon: BookOpen,
    },
    {
      title: "Curriculum",
      field: "curriculum" as const,
      icon: BookMarked,
    },
    {
      title: "Academic Calendar",
      field: "academicCalendar" as const,
      icon: CalendarDays,
    },
    {
      title: "Examination System",
      field: "examinationSystem" as const,
      icon: ClipboardCheck,
    },
    {
      title: "Academic Rules",
      field: "rules" as const,
      icon: ListChecks,
    },
  ];

  return (
    <main className="min-h-screen bg-[#030817] text-white">
      <PublicPageHero
        eyebrow="Learning & Development"
        title="Explore Our"
        highlight="Academics"
        description="Discover our classes, subjects, curriculum, and academic approach to student development."
        images={images}
        animation="zoom"
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#academic-programs"
            className="rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
          >
            Explore Programs
          </a>

          <Link
            to="/admissions"
            className="rounded-full border border-blue-300/40 px-6 py-3 font-semibold text-white transition hover:bg-blue-500/15"
          >
            Admissions
          </Link>
        </div>
      </PublicPageHero>

      <section
        id="academic-programs"
        className="mx-auto max-w-7xl px-6 py-16"
      >
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
            Academic Information
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            Learning for the Future
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-400">
            Explore our academic programs, subjects, curriculum, examinations,
            and school guidelines.
          </p>
        </div>

        {loading && (
          <p className="text-slate-300">Loading academic information...</p>
        )}

        {error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-950/30 p-5 text-red-300">
            {error}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="ml-3 underline hover:text-white"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && academicInfo.length === 0 && (
          <div className="rounded-2xl border border-blue-400/20 bg-[#081329]/80 p-8 text-center">
            <BookOpen className="mx-auto mb-3 h-10 w-10 text-sky-300" />
            <h3 className="text-xl font-semibold">Academic information coming soon</h3>
            <p className="mt-2 text-slate-400">
              Academic details will appear here once they are published.
            </p>
          </div>
        )}

        <div className="space-y-10">
          {!loading &&
            !error &&
            academicInfo.map((academic) => {
              const availableDetails = details.filter((detail) =>
                academic[detail.field]?.trim()
              );

              return (
                <article
                  key={academic.id}
                  className="overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-[#0b1931] via-[#081329] to-[#111035] p-6 shadow-xl shadow-blue-950/20 sm:p-8"
                >
                  <div className="mb-7 flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-sky-300/20 bg-sky-400/10">
                      <GraduationCap className="h-6 w-6 text-sky-300" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                        Academic Section
                      </p>
                      <h3 className="mt-2 text-2xl font-bold">
                        {academic.section}
                      </h3>
                      {academic.description && (
                        <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                          {academic.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {availableDetails.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {availableDetails.map((detail) => {
                        const Icon = detail.icon;
                        const content = academic[detail.field];

                        return (
                          <div
                            key={detail.field}
                            className="group rounded-2xl border border-white/10 bg-slate-950/35 p-5 transition duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:bg-blue-950/40"
                          >
                            <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-500/20 to-violet-500/20 text-sky-300">
                              <Icon className="h-5 w-5" />
                            </div>

                            <h4 className="text-lg font-semibold text-white">
                              {detail.title}
                            </h4>
                            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-300">
                              {content}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="rounded-xl border border-white/10 bg-slate-950/30 p-4 text-sm text-slate-400">
                      Details for this section have not been added yet.
                    </p>
                  )}
                </article>
              );
            })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-blue-400/20 bg-gradient-to-r from-[#081329] to-[#11103a] p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">
            Take the Next Step
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            Begin Your Learning Journey
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Find out about admission procedures, eligibility, and the
            information required to apply to our school.
          </p>
          <Link
            to="/admissions"
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-6 py-3 font-semibold transition hover:scale-105"
          >
            Explore Admissions →
          </Link>
        </div>
      </section>
    </main>
  );
}
