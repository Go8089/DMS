
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
    <article className="group overflow-hidden rounded-2xl border border-blue-400/20 bg-[#081329]/80 shadow-lg shadow-black/20 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-sky-400/60 hover:shadow-xl hover:shadow-blue-950/50">
      {image && (
        <div className="relative h-48 overflow-hidden bg-slate-900">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030817]/60 to-transparent" />
        </div>
      )}

      <div className="p-6">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-300">
            {eyebrow}
          </p>
        )}

        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-sky-300">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-400">
          {description}
        </p>

        {children && <div className="mt-5">{children}</div>}
      </div>
    </article>
  );
}
