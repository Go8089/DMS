

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import { getGallery, getSchoolInfo } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { GalleryItem, SchoolInfo } from "@/types/admin";

export default function About() {
  const [school, setSchool] = useState<SchoolInfo | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    getSchoolInfo().then(setSchool).catch(console.error);
    getGallery().then(setGallery).catch(console.error);
  }, []);

  const images = getHeroImages(gallery);

  return (
    <main className="min-h-screen bg-[#030817] text-white">
      <PublicPageHero
        eyebrow="About Us"
        title="Our School"
        highlight="Our Pride"
        description={
          school?.history ||
          "Discover our story, values, and commitment to a supportive learning environment."
        }
        images={images}
        animation="slide"
      >
        <Link
          to="/academics"
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-6 py-3 font-semibold transition hover:scale-105"
        >
          Discover Academics
        </Link>
      </PublicPageHero>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-3">
        <PublicCard title="Our Vision" description={school?.vision || "Inspiring students to become confident, curious, lifelong learners."} />
        <PublicCard title="Our Mission" description={school?.mission || "Providing meaningful education and encouraging each student to grow."} />
        <PublicCard title="Our History" description={school?.history || "Building a community dedicated to learning and achievement."} />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-blue-400/20 bg-gradient-to-r from-[#081329] to-[#11103a] p-8 md:p-12">
          <p className="text-sm uppercase tracking-widest text-sky-300">Meet our leadership</p>
          <h2 className="mt-3 text-3xl font-bold">{school?.principalName || "Our Principal"}</h2>
          <p className="mt-4 max-w-2xl leading-8 text-slate-300">
            Dedicated to supporting students, teachers, and families through a strong culture of learning.
          </p>
          <Link to="/faculty" className="mt-6 inline-block text-sky-300 hover:text-white">Meet our faculty →</Link>
        </div>
      </section>
    </main>
  );
}
