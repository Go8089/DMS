import {
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

const events = [
  {
    date: "12",
    month: "OCT",
    title: "Annual School Event",
    location: "School Campus",
  },
  {
    date: "18",
    month: "OCT",
    title: "Inter-School Competition",
    location: "School Auditorium",
  },
  {
    date: "25",
    month: "OCT",
    title: "Parent Interaction",
    location: "School Campus",
  },
];

export default function EventsScreen() {
  return (
    <section className="relative h-full w-full overflow-hidden bg-[#151515] px-8 py-24 text-white lg:px-16">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col justify-center">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          {/* Heading */}
          <div className="max-w-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15">
              <CalendarDays size={20} />
            </div>

            <p className="mt-7 text-xs font-semibold tracking-[0.3em] text-white/35">
              SCHOOL LIFE
            </p>

            <h1 className="mt-4 text-6xl font-bold leading-none md:text-7xl lg:text-8xl">
              What's
              <br />
              <span className="text-white/30">Happening.</span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-white/50">
              Discover upcoming school events, activities, competitions and
              celebrations.
            </p>
          </div>

          {/* Events */}
          <div className="w-full max-w-2xl space-y-3">
            {events.map((event, index) => (
              <article
                key={event.title}
                className="group grid grid-cols-[80px_1fr_auto] items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:bg-white/[0.09]"
              >
                <div className="text-center">
                  <p className="text-3xl font-bold">
                    {event.date}
                  </p>

                  <p className="text-[9px] tracking-[0.2em] text-white/35">
                    {event.month}
                  </p>
                </div>

                <div className="border-l border-white/10 pl-5">
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-white/30">
                    EVENT 0{index + 1}
                  </p>

                  <h2 className="mt-1 text-lg font-semibold">
                    {event.title}
                  </h2>

                  <div className="mt-2 flex items-center gap-2 text-xs text-white/40">
                    <MapPin size={13} />
                    {event.location}
                  </div>
                </div>

                <ArrowRight
                  size={19}
                  className="text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white"
                />
              </article>
            ))}

            <button className="group mt-5 flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white">
              Explore All Events
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}