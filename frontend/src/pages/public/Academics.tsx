import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  CalendarDays,
  ClipboardCheck,
  BookMarked,
  ListChecks,
} from "lucide-react";
import PublicPageHero from "@/components/public/PublicPageHero";
import { getAcademicInfo, getGallery } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { AcademicInfo, GalleryItem } from "@/types/admin";
import Footer from "@/components/public/Footer";

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
        setError(
          "Unable to load academic information. Please try again later."
        );
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
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero slider: component and sizing preserved */}
      <PublicPageHero
        eyebrow="Learning & Development"
        title="Explore Our"
        highlight="Academics"
        description="Discover our classes, subjects, curriculum, and academic approach to student development."
        images={images}
        animation="zoom"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#academic-programs"
            className="inline-flex items-center rounded-md bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-md"
          >
            Explore Programs
          </a>

          <Link
            to="/admissions"
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition duration-300 hover:border-blue-800 hover:text-blue-800"
          >
            Admissions
          </Link>
        </div>
      </PublicPageHero>

      {/* Academic information */}
      <section
        id="academic-programs"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-16"
      >
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-800">
            Academic Information
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Learning for the Future
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Explore our academic programs, subjects, curriculum, examinations,
            and school guidelines.
          </p>
        </div>

        {loading && (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-600">
            Loading academic information...
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-800"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 font-semibold underline underline-offset-4 hover:text-red-950"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && academicInfo.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white px-6 py-10 text-center">
            <BookOpen className="mx-auto mb-3 h-9 w-9 text-blue-800" />
            <h3 className="text-lg font-semibold text-slate-900">
              Academic information coming soon
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Academic details will appear here once they are published.
            </p>
          </div>
        )}

        {!loading && !error && academicInfo.length > 0 && (
          <div className="space-y-7">
            {academicInfo.map((academic, index) => {
              const availableDetails = details.filter((detail) =>
                academic[detail.field]?.trim()
              );

              return (
                <article
                  key={academic.id}
                  className="animate-[academicEnter_450ms_ease-out_both] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                  style={{ animationDelay: `${Math.min(index * 80, 400)}ms` }}
                >
                  <div className="border-b border-slate-100 bg-slate-50/70 p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                        <GraduationCap className="h-5 w-5 text-blue-800" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-800">
                          Academic Section
                        </p>
                        <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                          {academic.section}
                        </h3>
                        {academic.description && (
                          <p className="mt-2 max-w-3xl whitespace-pre-line text-sm leading-6 text-slate-600">
                            {academic.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    {availableDetails.length > 0 ? (
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {availableDetails.map((detail) => {
                          const Icon = detail.icon;
                          const content = academic[detail.field];

                          return (
                            <div
                              key={detail.field}
                              className="group rounded-lg border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-800 transition-colors group-hover:bg-blue-100">
                                  <Icon className="h-[18px] w-[18px]" />
                                </div>
                                <h4 className="text-sm font-semibold text-slate-900">
                                  {detail.title}
                                </h4>
                              </div>

                              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                                {content}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                        Details for this section have not been added yet.
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Admissions call to action */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-10 sm:px-6 md:flex-row md:items-center md:py-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-800">
              Take the Next Step
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              Begin Your Learning Journey
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Find out about admission procedures, eligibility, and the
              information required to apply to our school.
            </p>
          </div>

          <Link
            to="/admissions"
            className="inline-flex shrink-0 items-center rounded-md bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-md"
          >
            Explore Admissions
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes academicEnter {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[academicEnter_450ms_ease-out_both\\] {
            animation: none !important;
          }
        }
      `}</style>
      <Footer />
    </main>
  );
}
