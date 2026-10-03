import { ArrowRight } from "lucide-react";

const facilities = [
  {
    name: "Classrooms",
    image: "/images/school-classroom.webp",
  },
  {
    name: "Laboratories",
    image: "/images/faculity-laboratory.webp",
  },
  {
    name: "Library",
    image: "/images/facility-library.webp",
  },
  {
    name: "Computer Lab",
    image: "/images/facility-computer-lab.webp",
  },
  {
    name: "Sports",
    image: "/images/facility-sport.webp",
  },
  {
    name: "Transportation",
    image: "/images/transport.webp",
  },
];

export default function FacilitiesScreen() {
  return (
    <section className="h-full w-full overflow-hidden bg-[#111] px-8 py-24 text-white lg:px-12">
      <div className="mx-auto flex h-full max-w-[1700px] flex-col justify-center">
        {/* Heading */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <div className="animate-content-in">
            <p className="text-xs font-semibold tracking-[0.3em] text-white/40">
              CAMPUS & INFRASTRUCTURE
            </p>

            <h1 className="mt-3 text-5xl font-bold leading-none md:text-6xl lg:text-7xl">
              Our
              <span className="text-white/30"> Facilities.</span>
            </h1>
          </div>

          <p className="hidden max-w-sm text-right text-sm leading-6 text-white/40 md:block">
            Explore the spaces and facilities that support learning,
            activities and everyday school life.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid h-[58vh] grid-cols-2 gap-3 md:grid-cols-3">
          {facilities.map((facility, index) => (
            <button
              key={facility.name}
              className={`group relative overflow-hidden rounded-2xl text-left ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <img
                src={facility.image}
                alt={facility.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/25 transition duration-500 group-hover:bg-black/10" />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold tracking-[0.2em] text-white/50">
                      0{index + 1}
                    </p>

                    <h2 className="text-xl font-semibold md:text-2xl">
                      {facility.name}
                    </h2>
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black opacity-0 transition duration-300 group-hover:opacity-100">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}