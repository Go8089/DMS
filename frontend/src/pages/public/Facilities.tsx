
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
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
  const activeFacilities = facilities.filter((facility) => facility.active);

  return (
    <main className="min-h-screen bg-[#030817] text-white">
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
          className="mt-8 inline-flex rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-6 py-3 font-semibold transition hover:scale-105"
        >
          View Campus Gallery
        </Link>
      </PublicPageHero>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
            Our Campus
          </p>
          <h2 className="mt-3 text-3xl font-bold">School Facilities</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-400">
            Learn more about the facilities available to our students and
            school community.
          </p>
        </div>

        {loading && (
          <p className="text-slate-300">Loading facilities...</p>
        )}

        {error && (
          <p className="rounded-xl border border-red-400/20 bg-red-950/30 p-4 text-red-300">
            {error}
          </p>
        )}

        {!loading && !error && activeFacilities.length === 0 && (
          <p className="text-slate-400">
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
        <div className="rounded-3xl border border-blue-400/20 bg-gradient-to-r from-[#081329] to-[#11103a] p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">
            Learn More
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            Want to know more about our school?
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Contact our team to learn about the campus, academics, and
            opportunities available to students.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 font-semibold transition hover:scale-105"
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </main>
  );
}
