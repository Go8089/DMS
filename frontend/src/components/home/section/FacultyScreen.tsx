import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  UserRound,
} from "lucide-react";

const faculty = [
  {
    name: "Principal",
    role: "School Leadership",
    description:
      "Provides academic and administrative leadership for the school community.",
    icon: GraduationCap,
  },
  {
    name: "Teaching Faculty",
    role: "Academic Team",
    description:
      "Teachers supporting students across different classes, subjects and learning activities.",
    icon: BookOpen,
  },
  {
    name: "Departments",
    role: "Academic Departments",
    description:
      "Explore the school's departments and the faculty members associated with them.",
    icon: UserRound,
  },
];

export default function FacultyScreen() {
  return (
    <section className="h-full w-full overflow-hidden bg-[#e9e5dc] px-8 py-24 text-gray-900 lg:px-16">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col justify-center">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          {/* LEFT */}
          <div className="animate-content-in">
            <p className="text-xs font-semibold tracking-[0.3em] text-gray-400">
              OUR PEOPLE
            </p>

            <h1 className="mt-5 text-6xl font-bold leading-none md:text-7xl lg:text-8xl">
              The People
              <br />
              <span className="text-gray-400">Behind Learning.</span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-gray-500">
              Meet the principal, teachers and academic departments that
              contribute to the learning environment at DMV School.
            </p>

            <button className="group mt-8 flex items-center gap-2 text-sm font-semibold">
              Meet Our Faculty
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* RIGHT */}
          <div className="grid gap-4">
            {faculty.map((member, index) => {
              const Icon = member.icon;

              return (
                <article
                  key={member.name}
                  className="group flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 transition duration-500 hover:-translate-x-1 hover:shadow-lg md:p-6"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white">
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-400">
                      0{index + 1} · {member.role}
                    </p>

                    <h2 className="mt-1 text-xl font-semibold">
                      {member.name}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {member.description}
                    </p>
                  </div>

                  <ArrowRight
                    size={19}
                    className="shrink-0 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-gray-900"
                  />
                </article>
              );
            })}

            {/* Faculty Profiles */}
            <div className="mt-2 rounded-2xl bg-gray-900 p-6 text-white">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.25em] text-white/40">
                    FACULTY PROFILES
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    Explore Our Teachers
                  </h2>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-white/50">
                    Individual faculty profiles can include names, subjects,
                    departments, roles and other approved school information.
                  </p>
                </div>

                <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition hover:scale-105">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}