import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import { getAchievements, getGallery } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { Achievement, GalleryItem } from "@/types/admin";

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
      .catch(() => setError("Unable to load achievements. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  const images = getHeroImages(gallery);

  return (
    <main className="min-h-screen bg-[#030817] text-white">
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
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3 font-semibold transition hover:scale-105"
        >
          Explore Gallery
        </Link>
      </PublicPageHero>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 text-3xl font-bold">Celebrating Success</h2>

        {loading && <p className="text-slate-300">Loading achievements...</p>}
        {error && <p className="text-red-300">{error}</p>}

        {!loading && !error && achievements.length === 0 && (
          <p className="text-slate-400">No achievements have been published yet.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <PublicCard
              key={achievement.id}
              title={achievement.title}
              description={achievement.description}
              image={achievement.imageUrl}
              eyebrow={`${achievement.category} · ${achievement.achievementDate}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
