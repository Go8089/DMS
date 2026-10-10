import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import { getGallery, getSchoolInfo } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { GalleryItem, SchoolInfo } from "@/types/admin";
import Footer from "@/components/public/Footer";
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
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero slider: component and sizing preserved */}
      <PublicPageHero
        eyebrow="Get in Touch"
        title="We Are"
        highlight="Here to Help"
        description="Have a question about admissions, academics, or school activities? Get in touch with our school team."
        images={images}
        animation="slide"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          {school?.phone && (
            <a
              href={`tel:${school.phone}`}
              className="inline-flex items-center rounded-md bg-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-md"
            >
              Call Our School
            </a>
          )}

          <a
            href="#contact-details"
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition duration-300 hover:border-blue-800 hover:text-blue-800"
          >
            Contact Details
          </a>
        </div>
      </PublicPageHero>

      <section
        id="contact-details"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-16"
      >
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-800">
            Contact Information
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Let's Connect
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Reach out to us using the details below.
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            {error}
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <PublicCard
            title="Visit Our School"
            description={
              school?.address || "School address is not available yet."
            }
            eyebrow="Address"
          />

          <PublicCard
            title="Call Us"
            description={
              school?.phone || "Phone number is not available yet."
            }
            eyebrow="Telephone"
          >
            {school?.phone && (
              <a
                href={`tel:${school.phone}`}
                className="inline-flex items-center font-semibold text-blue-800 transition-colors hover:text-blue-950"
              >
                Call now
                <span className="ml-2" aria-hidden="true">→</span>
              </a>
            )}
          </PublicCard>

          <PublicCard
            title="Email Us"
            description={
              school?.email || "Email address is not available yet."
            }
            eyebrow="Email"
          >
            {school?.email && (
              <a
                href={`mailto:${school.email}`}
                className="inline-flex max-w-full items-center break-all font-semibold text-blue-800 transition-colors hover:text-blue-950"
              >
                Send an email
                <span className="ml-2 shrink-0" aria-hidden="true">→</span>
              </a>
            )}
          </PublicCard>
        </div>

        {/* Admissions call to action */}
        <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:flex md:items-center md:justify-between md:gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-800">
              Admissions
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Interested in joining our school?
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Explore the admission process and find the information you need
              before applying.
            </p>
          </div>

          <Link
            to="/admissions"
            className="mt-5 inline-flex shrink-0 items-center rounded-md bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-md md:mt-0"
          >
            Explore Admissions
            <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
