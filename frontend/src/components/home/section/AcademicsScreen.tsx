import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

const academicItems = [
  {
    icon: GraduationCap,
    number: "01",
    title: "Classes Offered",
    text: "Information about the classes and grades offered by the school.",
  },
  {
    icon: BookOpen,
    number: "02",
    title: "Curriculum",
    text: "Details about the curriculum, subjects and learning structure.",
  },
  {
    icon: CalendarDays,
    number: "03",
    title: "Academic Calendar",
    text: "Important academic dates, activities, terms and school events.",
  },
  {
    icon: ClipboardCheck,
    number: "04",
    title: "Examinations",
    text: "Examination information, schedules and important instructions.",
  },
  {
    icon: ShieldCheck,
    number: "05",
    title: "Rules & Regulations",
    text: "Academic expectations, school rules and regulations for students.",
  },
];

export default function AcademicsScreen() {
  return (
    <section className="h-full w-full overflow-hidden bg-[#151515] px-8 py-24 text-white lg:px-16">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col justify-center">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          {/* LEFT */}
          <div className="animate-content-in">
            <p className="text-xs font-semibold tracking-[0.3em] text-white/35">
              LEARNING & EDUCATION
            </p>

            <h1 className="mt-5 text-6xl font-bold leading-none md:text-7xl lg:text-8xl">
              Learn.
              <br />
              <span className="text-white/30">Grow.</span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-white/50">
              Explore the academic structure, curriculum, subjects,
              examinations and learning framework of DMV School.
            </p>
          </div>

          {/* RIGHT */}
          <div className="grid gap-3 sm:grid-cols-2">
            {academicItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-500 hover:-translate-y-1 hover:bg-white/[0.09]"
                >
                  <span className="absolute right-5 top-4 text-5xl font-bold text-white/[0.04]">
                    {item.number}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15">
                    <Icon size={17} />
                  </div>

                  <p className="mt-6 text-[10px] font-semibold tracking-[0.25em] text-white/30">
                    ACADEMICS
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-white/45">
                    {item.text}
                  </p>
                </article>
              );
            })}

            {/* Subjects */}
            <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-500 hover:-translate-y-1 hover:bg-white/[0.09]">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-white/30">
                SUBJECTS
              </p>

              <h2 className="mt-3 text-xl font-semibold">
                Subjects & Learning
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Languages",
                  "Mathematics",
                  "Science",
                  "Social Studies",
                  "Computer",
                  "Activities",
                ].map((subject) => (
                  <span
                    key={subject}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}