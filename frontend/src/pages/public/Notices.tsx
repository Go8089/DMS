
import { useEffect, useState } from "react";
import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import { getGallery, getNotices } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { GalleryItem, Notice } from "@/types/admin";

export default function Notices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getNotices(), getGallery()])
      .then(([noticeData, galleryData]) => {
        setNotices(noticeData);
        setGallery(galleryData);
      })
      .catch(() => setError("Unable to load notices. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  const images = getHeroImages(gallery);

  return (
    <main className="min-h-screen bg-[#030817] text-white">
      <PublicPageHero
        eyebrow="Latest Updates"
        title="Important"
        highlight="Notices"
        description="Stay informed about school announcements, academic updates, and important information for students and parents."
        images={images}
        animation="fade"
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 text-3xl font-bold">School Announcements</h2>

        {loading && <p className="text-slate-300">Loading notices...</p>}
        {error && <p className="text-red-300">{error}</p>}
        {!loading && !error && notices.length === 0 && (
          <p className="text-slate-400">No notices are available right now.</p>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {notices.map((notice) => (
            <PublicCard
              key={notice.id}
              title={notice.title}
              description={notice.description}
              eyebrow={`${notice.type} · ${notice.noticeDate}`}
            >
              {notice.documentUrl && (
                <a
                  href={notice.documentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-sky-400/40 px-4 py-2 text-sm text-sky-300 transition hover:bg-sky-500/15"
                >
                  View Document ↗
                </a>
              )}
            </PublicCard>
          ))}
        </div>
      </section>
    </main>
  );
}
