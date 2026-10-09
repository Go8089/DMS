

import { useEffect, useState } from "react";

type PublicPageHeroProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  images: string[];
  animation?: "slide" | "zoom" | "fade" | "float";
  children?: React.ReactNode;
  heightClass?: string;
};

export default function PublicPageHero({
  eyebrow,
  title,
  highlight,
  description,
  images,
  children,
}: PublicPageHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [images.length]);

  const previous = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <section className="relative isolate flex min-h-[580px] items-center overflow-hidden bg-slate-950 px-6 py-20 md:min-h-[650px]">
      {/* Background image slider */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`School academic slide ${index + 1}`}
              className={`h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
                index === activeIndex ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Dark overlay for readable text */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#030817]/95 via-[#030817]/75 to-[#030817]/40" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">
            {eyebrow}
          </p>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
            {title}{" "}
            {highlight && (
              <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">
                {highlight}
              </span>
            )}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
            {description}
          </p>

          {children}
        </div>
      </div>

      {/* Previous / next controls */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={previous}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-slate-950/50 text-2xl text-white backdrop-blur transition hover:bg-sky-500/70 md:left-8"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-slate-950/50 text-2xl text-white backdrop-blur transition hover:bg-sky-500/70 md:right-8"
          >
            ›
          </button>

          {/* Clickable slide indicators */}
          <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {images.map((image, index) => (
              <button
                key={`${image}-dot-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-sky-400"
                    : "w-2.5 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

