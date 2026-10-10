import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import Footer from "@/components/public/Footer";
import { getFacilities, getGallery } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { Facility, GalleryItem } from "@/types/admin";

export default function Facilities() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getFacilities(), getGallery()])
      .then(([facilityData, galleryData]) => {
        setFacilities(facilityData);
        setGallery(galleryData);
      })
      .catch(() => setError("Unable to load school facilities."))
      .finally(() => setLoading(false));
  }, []);

  const images = getHeroImages(gallery);
  const activeFacilities = facilities.filter(
    (facility) => facility.active,
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <PublicPageHero
        eyebrow="Explore Our Campus"
        title="Spaces to"
        highlight="Learn & Grow"
        description="Explore the facilities that support classroom learning, creativity, collaboration, and student development."
        images={images}
        animation="zoom"
      >
        <Link
          to="/gallery"
          className="mt-8 inline-flex items-center rounded-md bg-blue-800 px-6 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-blue-900"
        >
          View Campus Gallery
        </Link>
      </PublicPageHero>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-800">
            Our Campus
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            School Facilities
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Learn more about the facilities available to our students and
            school community.
          </p>
        </div>

        {loading && (
          <p className="text-slate-600">Loading facilities...</p>
        )}

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && activeFacilities.length === 0 && (
          <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-500">
            No facilities have been published yet.
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeFacilities.map((facility) => (
            <PublicCard
              key={facility.id}
              title={facility.name}
              description={facility.description}
              image={facility.imageUrl}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-800">
            Learn More
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
            Want to know more about our school?
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Contact our team to learn about the campus, academics, and
            opportunities available to students.
          </p>

          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-800 px-6 py-3 font-semibold text-white transition duration-300 hover:bg-blue-900"
          >
            Contact Us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
