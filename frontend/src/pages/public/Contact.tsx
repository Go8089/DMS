import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import { getGallery, getSchoolInfo } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { GalleryItem, SchoolInfo } from "@/types/admin";

export default function Contact() {
  const [school, setSchool] = useState<SchoolInfo | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getSchoolInfo(), getGallery()])
      .then(([schoolData, galleryData]) => {
        setSchool(schoolData);
        setGallery(galleryData);
      })
      .catch(() => setError("Contact information could not be loaded."));
  }, []);

  const images = getHeroImages(gallery);

  return (
    <main className="min-h-screen bg-[#030817] text-white">
      <PublicPageHero
        eyebrow="Get in Touch"
        title="We Are"
        highlight="Here to Help"
        description="Have a question about admissions, academics, or school activities? Get in touch with our school team."
        images={images}
        animation="slide"
      >
        <div className="mt-8 flex flex-wrap gap-4">
          {school?.phone && (
            <a
              href={`tel:${school.phone}`}
              className="rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 font-semibold transition hover:scale-105"
            >
              Call Our School
            </a>
          )}
          <a
            href="#contact-details"
            className="rounded-full border border-blue-300/40 px-6 py-3 font-semibold transition hover:bg-blue-500/15"
          >
            Contact Details
          </a>
        </div>
      </PublicPageHero>

      <section
        id="contact-details"
        className="mx-auto max-w-7xl px-6 py-16"
      >
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
            Contact Information
          </p>
          <h2 className="mt-3 text-3xl font-bold">Let's Connect</h2>
          <p className="mt-3 text-slate-400">
            Reach out to us using the details below.
          </p>
        </div>

        {error && (
          <p className="mb-6 rounded-xl border border-red-400/20 bg-red-950/30 p-4 text-red-300">
            {error}
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PublicCard
            title="Visit Our School"
            description={school?.address || "School address is not available yet."}
            eyebrow="Address"
          />

          <PublicCard
            title="Call Us"
            description={school?.phone || "Phone number is not available yet."}
            eyebrow="Telephone"
          >
            {school?.phone && (
              <a
                href={`tel:${school.phone}`}
                className="text-sm font-semibold text-sky-300 hover:text-white"
              >
                Call now →
              </a>
            )}
          </PublicCard>

          <PublicCard
            title="Email Us"
            description={school?.email || "Email address is not available yet."}
            eyebrow="Email"
          >
            {school?.email && (
              <a
                href={`mailto:${school.email}`}
                className="break-all text-sm font-semibold text-sky-300 hover:text-white"
              >
                Send an email →
              </a>
            )}
          </PublicCard>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-r from-[#081329] to-[#11103a] p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">
            Admissions
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            Interested in joining our school?
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Explore the admission process and find the information you need
            before applying.
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
