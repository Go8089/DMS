import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Users,
  Building2,
  Sparkles,
  Target,
  MoveUpRight,
  CalendarDays,
  Bell,
} from "lucide-react";

import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import {
  getGallery,
  getSchoolInfo,
  getNotices,
  getEvents,
} from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type {
  GalleryItem,
  SchoolInfo,
  Notice,
  Event,
} from "@/types/admin";

const features = [
  {
    title: "Quality Education",
    description: "Building strong foundations for lifelong learning.",
    to: "/academics",
    icon: BookOpen,
    number: "01",
    glow: "from-sky-500/20 to-blue-600/5",
  },
  {
    title: "Expert Faculty",
    description: "Inspiring students through guidance and mentorship.",
    to: "/faculty",
    icon: Users,
    number: "02",
    glow: "from-violet-500/20 to-purple-600/5",
  },
  {
    title: "Modern Facilities",
    description: "Purpose-built spaces that encourage exploration.",
    to: "/facilities",
    icon: Building2,
    number: "03",
    glow: "from-cyan-500/20 to-teal-600/5",
  },
  {
    title: "Campus Life",
    description: "Discover activities, celebrations, and achievements.",
    to: "/gallery",
    icon: GraduationCap,
    number: "04",
    glow: "from-fuchsia-500/20 to-pink-600/5",
  },
];

export default function Home() {
  const [school, setSchool] = useState<SchoolInfo | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    Promise.allSettled([
      getSchoolInfo(),
      getGallery(),
      getNotices(),
      getEvents(),
    ]).then(([schoolResult, galleryResult, noticeResult, eventResult]) => {
      if (schoolResult.status === "fulfilled") {
        setSchool(schoolResult.value);
      }
      if (galleryResult.status === "fulfilled") {
        setGallery(galleryResult.value);
      }
      if (noticeResult.status === "fulfilled") {
        setNotices(noticeResult.value);
      }
      if (eventResult.status === "fulfilled") {
        setEvents(eventResult.value);
      }
    });
  }, []);

  const images = getHeroImages(gallery);

  return (
    <main className="home-3d relative min-h-screen overflow-hidden bg-[#030817] text-white">
      {/* Global ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="ambient-orb orb-one" />
        <div className="ambient-orb orb-two" />
        <div className="ambient-orb orb-three" />

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(96,165,250,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,.16) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 75%)",
          }}
        />
      </div>

       

{/* Continuous 3D star burst effect */}
<div className="star-universe" aria-hidden="true">
  <div className="burst-star">
    <span className="star-core">✦</span>

    {Array.from({ length: 12 }, (_, i) => (
      <span
        key={i}
        className="star-particle"
        style={{ "--particle": i } as React.CSSProperties}
      />
    ))}

    <span className="star-ring" />
  </div>
</div>

      {/* Hero */}
      <div className="relative z-10">
        <PublicPageHero
          eyebrow={school?.schoolName || "Welcome to our school"}
          title="Shaping Bright"
          highlight="Futures Together"
          description={
            school?.vision ||
            "A nurturing learning environment where every student can learn, grow, and discover their potential."
          }
          images={images}
          animation="zoom"
          heightClass="min-h-[620px]"
        >
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/admissions"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30"
            >
              Explore Admissions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 font-semibold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-300/50 hover:bg-sky-400/10"
            >
              Discover Our School
              <MoveUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
              Learning without limits
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-sky-300" />
              Growing together
            </span>
          </div>
        </PublicPageHero>
      </div>

      {/* Floating feature cards */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="reveal-up max-w-2xl">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-sky-300">
              <Sparkles className="h-4 w-4" />
              The school experience
            </p>
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              More than education.
              <span className="mt-1 block bg-gradient-to-r from-sky-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                A world of possibilities.
              </span>
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-slate-400">
              A supportive environment where curiosity becomes confidence,
              ideas become achievements, and every student can move forward.
            </p>
          </div>

          <Link
            to="/about"
            className="group inline-flex w-fit items-center gap-2 pb-1 font-medium text-sky-300 transition hover:text-white"
          >
            Discover our approach
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                to={item.to}
                className="feature-card group relative block min-w-0 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                style={{
                  animationDelay: `${index * 120}ms`,
                }}
              >
                <div
                  className={`feature-card-inner relative h-full min-h-[260px] overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br ${item.glow} p-6 backdrop-blur-xl`}
                >
                  <div className="absolute inset-0 bg-[#081329]/75 transition-colors duration-500 group-hover:bg-[#081329]/40" />

                  <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-sky-400/10 blur-3xl transition duration-500 group-hover:scale-150 group-hover:bg-blue-400/20" />

                  <div className="relative flex h-full min-h-[212px] flex-col">
                    <div className="flex items-start justify-between">
                      <div className="icon-3d grid h-14 w-14 place-items-center rounded-2xl border border-sky-300/20 bg-sky-400/[0.08] text-sky-300 shadow-lg shadow-sky-950/30">
                        <Icon className="h-6 w-6" />
                      </div>

                      <span className="text-xs font-semibold tracking-[0.2em] text-white/25">
                        {item.number}
                      </span>
                    </div>

                    <div className="mt-auto pt-10">
                      <h3 className="text-xl font-bold transition-colors group-hover:text-sky-200">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-widest text-sky-300">
                        Explore
                      </span>
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition duration-300 group-hover:rotate-45 group-hover:border-sky-300/40 group-hover:bg-sky-400/15">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* School story and mission */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
         <article className="story-panel group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0b1932] via-[#081329] to-[#11102d] p-7 sm:p-10">
            <div className="absolute -right-20 -top-20 h-62 w-62 rounded-full bg-blue-500/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />

            <div className="relative">
              <div className="mb-8 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-400/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                  <Building2 className="h-4 w-4" />
                  Our school
                </span>
                <span className="text-4xl font-black text-white/[0.07]">01</span>
              </div>

              <h2 className="max-w-lg text-3xl font-extrabold sm:text-4xl">
                A place to learn.
                <span className="block text-sky-300">A place to belong.</span>
              </h2>

              <p className="mt-5 max-w-2xl whitespace-pre-line leading-8 text-slate-300">
                {school?.history ||
                  "Our school is committed to providing a supportive and inspiring education where students develop knowledge, character, and confidence."}
              </p>

              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-sky-300 transition hover:gap-4 hover:text-white"
              >
                Discover our story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>

          <article className="mission-panel group relative h-full overflow-hidden rounded-[2rem] border border-violet-300/15 bg-gradient-to-br from-[#17123a] via-[#0b1029] to-[#081329] p-7 sm:p-10">
            <div className="absolute -bottom-20 -right-12 h-62 w-62 rounded-full bg-violet-500/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />

            <div className="relative">
              <div className="mb-8 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
                  <Target className="h-4 w-4" />
                  Our mission
                </span>
                <span className="text-4xl font-black text-white/[0.07]">02</span>
              </div>

              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Helping every
                <span className="block text-violet-300">student thrive.</span>
              </h2>

              <p className="mt-5 whitespace-pre-line leading-8 text-slate-300">
                {school?.mission ||
                  "We encourage curiosity, creativity, confidence, and responsibility to prepare students for a changing world."}
              </p>

              <Link
                to="/academics"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-violet-300 transition hover:gap-4 hover:text-white"
              >
                Explore academics <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Notices */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="mb-8 mt-20 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-sky-300">
              <Bell className="h-4 w-4" />
              Stay informed
            </p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Latest Notices
            </h2>
            <p className="mt-3 text-slate-400">
              Important updates and announcements from our school.
            </p>
          </div>

          <Link
            to="/notices"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-300/30 hover:bg-sky-400/[0.06] hover:text-sky-300"
          >
            View all notices
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {notices.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notices.slice(0, 3).map((notice, index) => (
              <div
                key={notice.id}
                className="notice-card group rounded-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PublicCard
                  title={notice.title}
                  description={notice.description}
                  eyebrow={notice.noticeDate}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-7 text-slate-400">
            No notices available right now.
          </div>
        )}

        {/* Events */}
        <div className="mb-8 mt-20 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-violet-300">
              <CalendarDays className="h-4 w-4" />
              What's happening
            </p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              School Events
            </h2>
            <p className="mt-3 text-slate-400">
              Moments, celebrations, and experiences that bring us together.
            </p>
          </div>

          <Link
            to="/events"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-violet-300/30 hover:bg-violet-400/[0.06] hover:text-violet-300"
          >
            View all events
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {events.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).map((event, index) => (
              <div
                key={event.id}
                className="event-card group"
                style={{ animationDelay: `${index * 130}ms` }}
              >
                <PublicCard
                  title={event.title}
                  description={event.description}
                  image={event.imageUrl}
                  eyebrow={`${event.eventDate} · ${event.location}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-7 text-slate-400">
            No events available right now.
          </div>
        )}
      </section>

      {/* Final call to action */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="cta-3d relative overflow-hidden rounded-[2rem] border border-sky-300/20 bg-gradient-to-br from-[#0c2342] via-[#11143b] to-[#1a1040] px-7 py-12 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/[0.06] text-sky-300 shadow-xl shadow-blue-950/30">
              <GraduationCap className="h-7 w-7" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-300">
              Your future starts here
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
              Ready to begin your
              <span className="mt-2 block bg-gradient-to-r from-sky-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                learning journey?
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-300">
              Discover our academic programs and find out how to become part
              of our school community.
            </p>

            <Link
              to="/admissions"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-slate-950 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:bg-sky-100 hover:shadow-sky-400/20"
            >
              Start Your Admission
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Page-specific animations */}
      <style>{`
        .home-3d {
          isolation: isolate;
          perspective: 1400px;
        }

        .ambient-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(80px);
          opacity: .2;
          animation: orbDrift 15s ease-in-out infinite alternate;
          will-change: transform;
        }

        .orb-one {
          top: 8%;
          left: -140px;
          width: 340px;
          height: 340px;
          background: #0ea5e9;
        }

        .orb-two {
          top: 36%;
          right: -160px;
          width: 380px;
          height: 380px;
          background: #7c3aed;
          animation-delay: -5s;
        }

        .orb-three {
          top: 70%;
          left: 24%;
          width: 260px;
          height: 260px;
          background: #2563eb;
          animation-delay: -9s;
        }

        .feature-card {
          perspective: 1000px;
          animation: cardEnter .8s cubic-bezier(.2,.75,.25,1) both;
        }

        .feature-card-inner {
          transform-style: preserve-3d;
          transition:
            transform .45s cubic-bezier(.2,.75,.25,1),
            border-color .35s ease,
            box-shadow .35s ease;
          box-shadow: 0 12px 35px rgba(0,0,0,.12);
        }

        .feature-card:hover .feature-card-inner {
          transform: translateY(-9px) rotateX(3deg) rotateY(-3deg);
          border-color: rgba(125,211,252,.3);
          box-shadow:
            0 24px 55px rgba(2,132,199,.13),
            0 8px 20px rgba(0,0,0,.2);
        }

        .icon-3d {
          transform: translateZ(22px);
          transition: transform .45s ease, box-shadow .45s ease;
        }

        .feature-card:hover .icon-3d {
          transform: translateZ(38px) rotate(-7deg) scale(1.06);
          box-shadow: 0 12px 30px rgba(14,165,233,.16);
        }

        .story-panel,
        .mission-panel {
          transform-style: preserve-3d;
          transition: transform .45s ease, border-color .4s ease;
        }

        .story-panel:hover {
          transform: perspective(1000px) rotateY(1deg) translateY(-3px);
          border-color: rgba(56,189,248,.3);
        }

        .mission-panel:hover {
          transform: perspective(1000px) rotateY(-1deg) translateY(-3px);
          border-color: rgba(167,139,250,.3);
        }

        .notice-card,
        .event-card {
          min-width: 0;
          animation: cardEnter .7s ease both;
          transition: transform .3s ease, filter .3s ease;
        }

        .notice-card:hover,
        .event-card:hover {
          transform: translateY(-5px);
          filter: drop-shadow(0 15px 25px rgba(14,165,233,.08));
        }

        .cta-3d {
          transform-style: preserve-3d;
          box-shadow: 0 30px 90px rgba(3,7,18,.25);
          transition: border-color .4s ease, box-shadow .4s ease;
        }

        .cta-3d:hover {
          border-color: rgba(125,211,252,.4);
          box-shadow: 0 30px 90px rgba(37,99,235,.12);
        }


.star-universe {
  position: absolute;
  z-index: 20;
  top: 70px;
  left: 45%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  pointer-events: none;
  perspective: 700px;
}

.burst-star {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: starRotate 5s ease-in-out infinite;
}

.star-core {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 100px;
  color: #7dd3fc;
  text-shadow:
    0 0 12px #38bdf8,
    0 0 30px #3b82f6,
    0 0 65px #8b5cf6;
  animation: starFormBreak 4s ease-in-out infinite;
}

.star-particle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: #a5f3fc;
  box-shadow: 0 0 12px #38bdf8;
  opacity: 0;
  animation: particleBurst 4s ease-out infinite;
  animation-delay: calc(var(--particle) * 0.035s);
}

.star-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 65px;
  height: 65px;
  border: 1px solid rgba(125, 211, 252, 0.7);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
  transform: translate(-50%, -50%) rotateX(65deg);
  animation: ringBurst 4s ease-out infinite;
}

@keyframes starFormBreak {
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.15) rotateY(0deg) rotateZ(0deg);
    filter: blur(5px);
  }
  15% {
    opacity: 1;
    transform: scale(1) rotateY(90deg) rotateZ(20deg);
    filter: blur(0);
  }
  30%, 45% {
    opacity: 1;
    transform: scale(1.1) rotateY(180deg) rotateZ(45deg);
    filter: blur(0);
  }
  65% {
    opacity: 0;
    transform: scale(1.7) rotateY(300deg) rotateZ(120deg);
    filter: blur(8px);
  }
  80% {
    opacity: 0;
    transform: scale(0.1) rotateY(360deg);
  }
}

@keyframes particleBurst {
  0%, 20% {
    opacity: 0;
    transform: translate(-50%, -50%) translateZ(0) scale(0);
  }
  30% {
    opacity: 1;
  }
  65% {
    opacity: 0.8;
    transform:
      translate(-50%, -50%)
      rotate(calc(var(--particle) * 30deg))
      translateY(-85px)
      translateX(25px)
      translateZ(50px)
      scale(0.3);
  }
  80%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
}

@keyframes ringBurst {
  0%, 25% {
    opacity: 0;
    transform: translate(-50%, -50%) rotateX(65deg) scale(0.2);
  }
  35% {
    opacity: 1;
  }
  70%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotateX(65deg) scale(2.8);
  }
}

@keyframes starRotate {
  0%, 100% {
    transform: rotateY(-25deg) rotateX(15deg);
  }
  50% {
    transform: rotateY(25deg) rotateX(-15deg);
  }
}

@media (max-width: 640px) {
  .star-universe {
    top: 30px;
    right: 2%;
    transform: scale(0.55);
    transform-origin: top right;
    opacity: 0.7;
  }
}

@media (prefers-reduced-motion: reduce) {
  .burst-star,
  .star-core,
  .star-particle,
  .star-ring {
    animation: none !important;
  }

  .star-core {
    opacity: 0.8;
    transform: none;
  }
}

        @keyframes orbDrift {
          0% {
            transform: translate3d(0,0,0) scale(1);
          }
          50% {
            transform: translate3d(45px,-35px,40px) scale(1.12);
          }
          100% {
            transform: translate3d(-25px,35px,-20px) scale(.94);
          }
        }

        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateY(24px) scale(.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ambient-orb,
          .feature-card,
          .notice-card,
          .event-card {
            animation: none !important;
          }

          .feature-card-inner,
          .icon-3d,
          .story-panel,
          .mission-panel,
          .notice-card,
          .event-card,
          .cta-3d {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  );
}
