import { ArrowRight, Play } from "lucide-react";

const galleryItems = [
  {
    title: "Campus",
    image: "/images/gallery-campus.jpg",
    size: "large",
  },
  {
    title: "School Events",
    image: "/images/gallery-event.jpg",
    size: "small",
  },
  {
    title: "Student Activities",
    image: "/images/gallery-activity.jpg",
    size: "small",
  },
  {
    title: "Celebrations",
    image: "/images/gallery-celebration.jpg",
    size: "medium",
  },
  {
    title: "School Life",
    image: "/images/gallery-school-life.jpg",
    size: "medium",
  },
];

export default function GalleryScreen() {
  return (
    <section className="h-full w-full overflow-hidden bg-[#eeeae3] px-8 py-24 text-gray-900 lg:px-12">
      <div className="mx-auto flex h-full max-w-[1700px] flex-col justify-center">
        {/* Heading */}
        <div className="mb-7 flex items-end justify-between">
          <div className="animate-content-in">
            <p className="text-xs font-semibold tracking-[0.3em] text-gray-400">
              SCHOOL LIFE
            </p>

            <h1 className="mt-3 text-5xl font-bold leading-none md:text-6xl lg:text-7xl">
              Moments
              <span className="text-gray-400">.</span>
            </h1>
          </div>

          <p className="hidden max-w-sm text-right text-sm leading-6 text-gray-400 md:block">
            A glimpse into campus life, activities, events and memorable
            moments from the school community.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid h-[58vh] grid-cols-2 gap-3 md:grid-cols-4">
          {galleryItems.map((item, index) => (
            <button
              key={item.title}
              className={`group relative overflow-hidden rounded-2xl text-left ${
                item.size === "large"
                  ? "md:col-span-2 md:row-span-2"
                  : item.size === "medium"
                    ? "md:col-span-2"
                    : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20 transition duration-500 group-hover:bg-black/5" />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-white/50">
                      0{index + 1}
                    </p>

                    <h2 className="mt-1 text-lg font-semibold text-white md:text-xl">
                      {item.title}
                    </h2>
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black opacity-0 transition group-hover:opacity-100">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </button>
          ))}

          {/* Video */}
          <button className="group relative overflow-hidden rounded-2xl bg-gray-900 text-left">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition group-hover:scale-110">
                <Play size={18} fill="currentColor" />
              </div>

              <p className="mt-4 text-xs font-semibold tracking-[0.2em] text-white/50">
                SCHOOL VIDEO
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}