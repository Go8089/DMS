import { useEffect, useState } from "react";
import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import Footer from "@/components/public/Footer";
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
      .catch(() =>
        setError("Unable to load notices. Please try again later."),
      )
      .finally(() => setLoading(false));
  }, []);

  const images = getHeroImages(gallery);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <PublicPageHero
        eyebrow="Latest Updates"
        title="Important"
        highlight="Notices"
        description="Stay informed about school announcements, academic updates, and important information for students and parents."
        images={images}
        animation="fade"
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-800">
            Stay Informed
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            School Announcements
          </h2>
        </div>

        {loading && (
          <p className="text-slate-600">Loading notices...</p>
        )}

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && notices.length === 0 && (
          <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-500">
            No notices are available right now.
          </p>
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
                  className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 transition hover:border-blue-300 hover:bg-blue-100"
                >
                  View Document <span className="ml-1" aria-hidden="true">↗</span>
                </a>
              )}
            </PublicCard>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
