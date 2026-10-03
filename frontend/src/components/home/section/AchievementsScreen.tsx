import { ArrowRight, Award, BookOpen, Medal, Trophy } from "lucide-react";

const achievements = [
  {
    number: "01",
    icon: BookOpen,
    category: "ACADEMICS",
    title: "Academic Achievements",
    description:
      "Recognising students for dedication, academic performance and excellence in learning.",
  },
  {
    number: "02",
    icon: Trophy,
    category: "SPORTS",
    title: "Sports Achievements",
    description:
      "Celebrating participation and accomplishments across sporting activities.",
  },
  {
    number: "03",
    icon: Medal,
    category: "COMPETITIONS",
    title: "Competition Achievements",
    description:
      "Showcasing student success in competitions and other school activities.",
  },
  {
    number: "04",
    icon: Award,
    category: "SCHOOL",
    title: "School Awards",
    description:
      "Highlighting awards and achievements that recognise the school community.",
  },
];

export default function AchievementsScreen() {
  return (
    <section className="h-full w-full overflow-hidden bg-[#111] px-8 py-24 text-white lg:px-16">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col justify-center">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          {/* Heading */}
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-white/40">
              CELEBRATING SUCCESS
            </p>

            <h1 className="mt-5 text-6xl font-bold leading-none md:text-7xl lg:text-8xl">
              Achieve.
              <br />
              <span className="text-white/30">Inspire.</span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-white/50">
              Every achievement represents dedication, participation and the
              continuous growth of our students and school community.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-3 sm:grid-cols-2">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;

              return (
                <div
                  key={achievement.number}
                  className="group relative min-h-52 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-500 hover:-translate-y-1 hover:bg-white/[0.08]"
                >
                  <span className="absolute right-5 top-4 text-5xl font-bold text-white/[0.05]">
                    {achievement.number}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15">
                    <Icon size={18} />
                  </div>

                  <p className="mt-7 text-[10px] font-semibold tracking-[0.25em] text-white/35">
                    {achievement.category}
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    {achievement.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-white/45">
                    {achievement.description}
                  </p>

                  <button className="mt-5 flex items-center gap-2 text-xs font-semibold">
                    Explore
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}