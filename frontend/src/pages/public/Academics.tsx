
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
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
      description: "Explore the classes and grade levels offered at our school.",
    },
    {
      title: "Subjects",
      field: "subjects" as const,
      description: "Discover the subjects available to our students.",
    },
    {
      title: "Curriculum",
      field: "curriculum" as const,
      description: "Learn about our curriculum and learning approach.",
    },
    {
      title: "Academic Calendar",
      field: "academicCalendar" as const,
      description: "Find important dates and academic schedules.",
    },
    {
      title: "Examination System",
      field: "examinationSystem" as const,
      description: "Understand our examination and assessment process.",
    },
    {
      title: "Academic Rules",
      field: "rules" as const,
      description: "Review the academic guidelines followed at our school.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#030817] text-white">
      ```tsx
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
```


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
            Find information about our academic programs, subjects, curriculum,
            examinations, and school guidelines.
          </p>
        </div>

        {loading && (
          <p className="text-slate-300">Loading academic information...</p>
        )}

        {error && (
          <div className="rounded-xl border border-red-400/20 bg-red-950/30 p-4 text-red-300">
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
          <p className="text-slate-400">
            Academic information has not been published yet.
          </p>
        )}

        {!loading &&
          !error &&
          academicInfo.map((academic) => (
            <div key={academic.id} className="mb-12">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">
                  Academic Section
                </p>
                <h3 className="mt-2 text-2xl font-bold">
                  {academic.section}
                </h3>
                {academic.description && (
                  <p className="mt-3 max-w-3xl leading-7 text-slate-400">
                    {academic.description}
                  </p>
                )}
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {details.map((detail) => {
                  const content = academic[detail.field];

                  if (!content?.trim()) return null;

                  return (
                    <PublicCard
                      key={detail.field}
                      title={detail.title}
                      description={content}
                      eyebrow={academic.section}
                    />
                  );
                })}
              </div>
            </div>
          ))}
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
