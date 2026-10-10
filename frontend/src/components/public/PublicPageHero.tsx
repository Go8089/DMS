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
  heightClass = "min-h-[calc(100svh-56px)]",
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

  const changeImage = (direction: number) => {
    setIndex(
      (current) => (current + direction + images.length) % images.length,
    );
  };

  
return (
  <section
    className={`relative isolate flex w-full items-center overflow-hidden bg-slate-900 ${heightClass}`}
  >
    {/* Background slideshow */}
    {/* Animated background slideshow */}
<div className="absolute inset-0 z-0 overflow-hidden">
  {images.map((src, i) => (
    <div
      key={`${src}-${i}`}
      aria-hidden="true"
      className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1800ms] ease-in-out ${
        i === index ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `url("${src}")`,
        transform: i === index ? "scale(1.1)" : "scale(1)",
        transition:
          "opacity 1800ms ease-in-out, transform 5500ms ease-out",
      }}
    />
  ))}
</div>

    {/* Dark overlay instead of the white wash */}
    <div className="absolute inset-0 z-10 bg-black/35" />
    <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/65 via-black/30 to-black/10" />

    {/* Hero content */}
    <div
      key={`${index}-${animation}`}
      className={`relative z-20 mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 md:py-24 lg:px-20 ${
        animation === "slide"
          ? "animate-[heroSlideIn_.8s_ease-out]"
          : animation === "float"
            ? "animate-[heroFloatIn_.9s_ease-out]"
            : "animate-[heroFadeIn_.8s_ease-out]"
      }`}
    >
      <div className="max-w-4xl">
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-sky-200 sm:text-base">
          {eyebrow}
        </p>

        <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-8xl">
          {title}{" "}
          {highlight && (
            <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-teal-200 bg-clip-text text-transparent">
              {highlight}
            </span>
          )}
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl sm:leading-9">
          {description}
        </p>

        {children && <div className="mt-9">{children}</div>}
      </div>
    </div>

    {/* Slideshow controls */}
    {images.length > 1 && (
      <div className="absolute bottom-7 left-6 z-20 flex items-center gap-3 sm:left-10 lg:left-20">
        <button
          type="button"
          aria-label="Previous background image"
          onClick={() => changeImage(-1)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-black/30 text-xl text-white backdrop-blur transition hover:bg-black/50"
        >
          ‹
        </button>

        <div className="flex items-center gap-2">
          {images.map((src, i) => (
            <button
              key={`${src}-dot-${i}`}
              type="button"
              aria-label={`Show background image ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next background image"
          onClick={() => changeImage(1)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-black/30 text-xl text-white backdrop-blur transition hover:bg-black/50"
        >
          ›
        </button>
      </div>
    )}

    <style>{`
      @keyframes heroFadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes heroSlideIn {
        from { opacity: 0; transform: translateX(-35px); }
        to { opacity: 1; transform: translateX(0); }
      }

      @keyframes heroFloatIn {
        from { opacity: 0; transform: translateY(25px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (prefers-reduced-motion: reduce) {
        section *,
        section *::before,
        section *::after {
          animation: none !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  </section>
);
}