
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface PublicPageHeroProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  images: string[];
  animation?: "slide" | "zoom" | "fade" | "float";
  children?: ReactNode;
  heightClass?: string;
}

export default function PublicPageHero({
  eyebrow,
  title,
  highlight,
  description,
  images,
  animation = "fade",
  children,
  heightClass = "min-h-[520px]",
}: PublicPageHeroProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [images.length]);

  useEffect(() => {
    if (images.length < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [images.length]);

  const image = images[index];

  return (
    <section
      className={`relative isolate flex items-center overflow-hidden bg-[#030817] ${heightClass}`}
    >
      {/* Image slideshow */}
      {images.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className={`absolute inset-0 -z-20 bg-cover bg-center transition-all duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          } ${
            animation === "zoom" && i === index
              ? "scale-110"
              : "scale-100"
          }`}
          style={{ backgroundImage: `url("${src}")` }}
        />
      ))}

      {/* Keep the same solid navy theme across all pages */}
      <div className="absolute inset-0 -z-10 bg-[#030817]/75" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#030817] via-[#030817]/80 to-[#030817]/35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#030817] via-transparent to-[#030817]/30" />

      {/* Decorative glow */}
      <div className="absolute -right-24 top-12 -z-10 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-64 w-64 rounded-full bg-violet-600/15 blur-3xl" />

      <div
        key={`${index}-${animation}`}
        className={`mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 lg:px-10 ${
          animation === "slide"
            ? "animate-[slideIn_.8s_ease-out]"
            : animation === "float"
              ? "animate-[floatIn_.9s_ease-out]"
              : "animate-[fadeIn_.8s_ease-out]"
        }`}
      >
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-sky-300">
            {eyebrow}
          </p>

          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            {title}{" "}
            {highlight && (
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                {highlight}
              </span>
            )}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
            {description}
          </p>

          {children}
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-blue-500/40 to-violet-600/40 blur-xl" />

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-blue-300/25 bg-slate-900/70 shadow-2xl shadow-blue-950/50">
            {image ? (
              <img
                key={image}
                src={image}
                alt="School highlights"
                className={`h-full w-full object-cover ${
                  animation === "zoom"
                    ? "animate-[imageZoom_6s_ease-in-out_infinite_alternate]"
                    : animation === "float"
                      ? "animate-[imageFloat_5s_ease-in-out_infinite]"
                      : "transition-transform duration-700 hover:scale-105"
                }`}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-950 to-violet-950 text-slate-400">
                Add school photos in Admin Gallery
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#030817]/75 via-transparent to-transparent" />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() =>
                    setIndex((index - 1 + images.length) % images.length)
                  }
                  className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-slate-950/60 text-white backdrop-blur transition hover:bg-blue-600"
                >
                  ‹
                </button>

                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => setIndex((index + 1) % images.length)}
                  className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-slate-950/60 text-white backdrop-blur transition hover:bg-blue-600"
                >
                  ›
                </button>

                <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
                  {images.map((src, i) => (
                    <button
                      key={`${src}-dot-${i}`}
                      type="button"
                      aria-label={`Show image ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === index
                          ? "w-8 bg-sky-400"
                          : "w-2 bg-white/60 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-35px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes imageZoom {
          from { transform: scale(1); }
          to { transform: scale(1.09); }
        }
        @keyframes imageFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}

