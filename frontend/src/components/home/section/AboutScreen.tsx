import {
  ArrowRight,
  Eye,
  Target,
  UserRound,
  Users,
} from "lucide-react";

const aboutItems = [
  {
    icon: Eye,
    title: "Vision",
    text: "To create an environment that supports learning, growth and the development of responsible individuals.",
  },
  {
    icon: Target,
    title: "Mission",
    text: "To provide quality education while encouraging curiosity, discipline, participation and continuous improvement.",
  },
  {
    icon: Users,
    title: "Management",
    text: "Information about the school's management structure and the people responsible for guiding the institution.",
  },
];

const objectives = [
  "Support meaningful and effective learning.",
  "Encourage discipline, responsibility and participation.",
  "Help students develop their abilities and confidence.",
  "Build a positive and supportive school community.",
];

export default function AboutScreen() {
  return (
    <section className="h-full w-full overflow-hidden bg-[#f3f0e9] px-8 py-24 text-gray-900 lg:px-16">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col justify-center">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          {/* LEFT */}
          <div className="animate-content-in">
            <p className="text-xs font-semibold tracking-[0.3em] text-gray-400">
              ABOUT DMV SCHOOL
            </p>

            <h1 className="mt-5 text-6xl font-bold leading-none md:text-7xl lg:text-8xl">
              More Than
              <br />
              <span className="text-gray-400">Education.</span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-gray-500">
              Discover the story, values and people behind our school
              community.
            </p>

            <button className="group mt-7 flex items-center gap-2 text-sm font-semibold">
              Discover Our Story
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* RIGHT */}
          <div className="grid gap-3 sm:grid-cols-2">
            {/* History */}
            <article className="rounded-2xl bg-white p-6 shadow-sm sm:col-span-2">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-gray-400">
                OUR HISTORY
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                The School Story
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500">
                This section will present the school's verified history,
                founding story, milestones and important developments.
              </p>
            </article>

            {/* Vision / Mission / Management */}
            {aboutItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-gray-200 bg-white/70 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white">
                    <Icon size={16} />
                  </div>

                  <h2 className="mt-5 text-lg font-semibold">
                    {item.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {item.text}
                  </p>
                </article>
              );
            })}

            {/* Principal */}
            <article className="rounded-2xl bg-gray-900 p-5 text-white transition duration-300 hover:-translate-y-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20">
                <UserRound size={16} />
              </div>

              <p className="mt-5 text-[10px] font-semibold tracking-[0.25em] text-white/40">
                PRINCIPAL'S MESSAGE
              </p>

              <p className="mt-3 text-sm leading-6 text-white/60">
                A message from the principal about the school's educational
                values, students and vision for the school community.
              </p>
            </article>

            {/* Objectives */}
            <article className="rounded-2xl border border-gray-200 bg-white/70 p-5 sm:col-span-2">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-gray-400">
                SCHOOL OBJECTIVES
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {objectives.map((objective, index) => (
                  <div
                    key={objective}
                    className="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <span className="text-xs font-semibold text-gray-400">
                      0{index + 1}
                    </span>

                    <span>{objective}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}