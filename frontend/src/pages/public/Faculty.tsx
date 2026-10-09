
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import { getFaculty, getGallery } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { Faculty as FacultyMember, GalleryItem } from "@/types/admin";

export default function Faculty() {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getFaculty(), getGallery()])
      .then(([facultyData, galleryData]) => {
        setFaculty(facultyData);
        setGallery(galleryData);
      })
      .catch(() => setError("Unable to load faculty information."))
      .finally(() => setLoading(false));
  }, []);

  const images = getHeroImages(gallery);

  const sortedFaculty = [...faculty].sort((a, b) => {
    if (a.principal !== b.principal) {
      return a.principal ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <main className="min-h-screen bg-[#030817] text-white">
      <PublicPageHero
        eyebrow="Our Educators"
        title="Meet Our"
        highlight="Faculty"
        description="Meet the educators and mentors who support our students through knowledge, encouragement, and a commitment to learning."
        images={images}
        animation="float"
      >
        <Link
          to="/contact"
          className="mt-8 inline-flex rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-6 py-3 font-semibold transition hover:scale-105"
        >
          Contact Our School
        </Link>
      </PublicPageHero>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
            Our Team
          </p>
          <h2 className="mt-3 text-3xl font-bold">Dedicated Educators</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-400">
            Discover the people helping our students learn, grow, and achieve
            their potential.
          </p>
        </div>

        {loading && (
          <p className="text-slate-300">Loading faculty members...</p>
        )}

        {error && (
          <p className="rounded-xl border border-red-400/20 bg-red-950/30 p-4 text-red-300">
            {error}
          </p>
        )}

        {!loading && !error && sortedFaculty.length === 0 && (
          <p className="text-slate-400">
            Faculty profiles have not been published yet.
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedFaculty.map((member) => (
            <PublicCard
              key={member.id}
              title={member.name}
              description={member.description || "Dedicated to student learning and development."}
              image={member.imageUrl}
              eyebrow={
                member.principal
                  ? `Principal · ${member.designation}`
                  : member.designation
              }
            >
              <div className="space-y-2 text-sm text-slate-400">
                {member.department && (
                  <p>
                    <span className="text-slate-300">Department:</span>{" "}
                    {member.department}
                  </p>
                )}

                {member.qualification && (
                  <p>
                    <span className="text-slate-300">Qualification:</span>{" "}
                    {member.qualification}
                  </p>
                )}
              </div>

              {(member.email || member.phone) && (
                <div className="mt-5 flex flex-wrap gap-3 border-t border-blue-400/15 pt-4">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-sm font-semibold text-sky-300 hover:text-white"
                    >
                      Email
                    </a>
                  )}

                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="text-sm font-semibold text-violet-300 hover:text-white"
                    >
                      Call
                    </a>
                  )}
                </div>
              )}
            </PublicCard>
          ))}
        </div>
      </section>
    </main>
  );
}
