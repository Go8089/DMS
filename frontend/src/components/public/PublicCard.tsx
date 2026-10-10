import type { ReactNode } from "react";

interface PublicCardProps {
  title: string;
  description: string;
  image?: string;
  eyebrow?: string;
  children?: ReactNode;
}

export default function PublicCard({
  title,
  description,
  image,
  eyebrow,
  children,
}: PublicCardProps) {
  return (
    <article className="public-card group overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-md motion-safe:animate-[cardEnter_500ms_ease-out_both]">
      {/* Compact rectangular image */}
      {image && (
        <div className="relative h-32 overflow-hidden bg-slate-100 sm:h-36">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/[0.02] transition-colors duration-300 group-hover:bg-transparent" />
        </div>
      )}

      {/* Compact card content */}
      <div className="p-4">
        {eyebrow && (
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-500">
            {eyebrow}
          </p>
        )}

        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-800 transition-colors duration-200 group-hover:text-blue-800">
          {title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-600">
          {description}
        </p>

        {children && (
          <div className="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-700">
            {children}
          </div>
        )}
      </div>

      <style>{`
        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .public-card {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </article>
  );
}
