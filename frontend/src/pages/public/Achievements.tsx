import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import { getAchievements, getGallery } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { Achievement, GalleryItem } from "@/types/admin";
import Footer from "@/components/public/Footer";

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getAchievements(), getGallery()])
      .then(([achievementData, galleryData]) => {
        setAchievements(achievementData);
        setGallery(galleryData);
      })
      .catch(() =>
        setError("Unable to load achievements. Please try again later.")
      )
      .finally(() => setLoading(false));
  }, []);

  const images = getHeroImages(gallery);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero slider: component and sizing preserved */}
      <PublicPageHero
        eyebrow="Our Achievements"
        title="Milestones of"
        highlight="Excellence"
        description="Celebrating the dedication, creativity, and achievements of our school community."
        images={images}
        animation="float"
      >
        <Link
          to="/gallery"
          className="mt-8 inline-flex items-center rounded-md bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-md"
        >
          Explore Gallery
          <span className="ml-2" aria-hidden="true">→</span>
        </Link>
      </PublicPageHero>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-16">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-800">
            Our Journey
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Celebrating Success
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Recognizing the accomplishments, milestones, and memorable moments
            of our school community.
          </p>
        </div>

        {loading && (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-600">
            Loading achievements...
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-800"
          >
            {error}
          </div>
        )}

        {!loading && !error && achievements.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white px-6 py-10 text-center">
            <p className="text-lg font-semibold text-slate-900">
              No achievements published yet
            </p>
            <p className="mt-2 text-sm text-slate-600">
              School achievements will appear here once they are published.
            </p>
          </div>
        )}

        {!loading && !error && achievements.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className="animate-[achievementEnter_450ms_ease-out_both]"
                style={{
                  animationDelay: `${Math.min(index * 70, 350)}ms`,
                }}
              >
                <PublicCard
                  title={achievement.title}
                  description={achievement.description}
                  image={achievement.imageUrl}
                  eyebrow={`${achievement.category} · ${achievement.achievementDate}`}
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 border-t border-slate-200 pt-6">
          <Link
            to="/gallery"
            className="inline-flex items-center text-sm font-semibold text-blue-800 transition-colors hover:text-blue-950"
          >
            View our gallery
            <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes achievementEnter {
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
          .animate-\\[achievementEnter_450ms_ease-out_both\\] {
            animation: none !important;
          }
        }
      `}</style>
      <Footer />
    </main>
  );
}
