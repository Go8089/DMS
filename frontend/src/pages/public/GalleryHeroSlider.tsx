import { useEffect, useState } from "react";
import type { GalleryItem } from "@/types/admin";

type Props = {
  photos: GalleryItem[];
  eyebrow: string;
  title: string;
  description: string;
  heightClass?: string;
};

export default function GalleryHeroSlider({
  photos,
  eyebrow,
  title,
  description,
  heightClass = "min-h-[65vh]",
}: Props) {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setSlideIndex(0);
  }, [photos.length]);

  useEffect(() => {
    if (photos.length < 2) return;

    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % photos.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [photos.length]);

  const activePhoto = photos[slideIndex];

  const previous = () => {
    setSlideIndex((current) => (current - 1 + photos.length) % photos.length);
  };

  const next = () => {
    setSlideIndex((current) => (current + 1) % photos.length);
  };

  return (
    <section
      className={`relative isolate flex ${heightClass} items-center overflow-hidden bg-slate-950 px-6 py-20 text-white`}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url("${photo.mediaUrl.replace(/"/g, '\\"')}")`,
              opacity: index === slideIndex ? 1 : 0,
              transform: index === slideIndex ? "scale(1.04)" : "scale(1)",
              transition:
                "opacity 1000ms ease-in-out, transform 5000ms ease-in-out",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-950/35 to-indigo-950/60" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <p className="reveal-from-left mb-5 font-semibold uppercase tracking-[0.22em] text-cyan-300">
          {eyebrow}
        </p>

        <h1 className="reveal-from-bottom max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          {title}
        </h1>

        <p className="reveal-from-bottom delay-2 mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
          {description}
        </p>

        {activePhoto?.title && (
          <p className="mt-4 text-sm text-slate-300">
            {activePhoto.title}
          </p>
        )}

        {photos.length > 1 && (
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-black/30 text-xl transition hover:bg-white hover:text-slate-900"
            >
              ‹
            </button>

            <div className="flex items-center gap-2">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSlideIndex(index)}
                  aria-label={`Show slide ${index + 1}`}
                  aria-pressed={index === slideIndex}
                  className={`h-2.5 rounded-full transition-all ${
                    index === slideIndex
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/50 hover:bg-white"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-black/30 text-xl transition hover:bg-white hover:text-slate-900"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
