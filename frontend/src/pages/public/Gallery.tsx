import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Images,
  RefreshCw,
  Video,
  X,
} from "lucide-react";
import { getGallery } from "@/api/public";
import type { GalleryItem } from "@/types/admin";

const ROTATION_INTERVAL = 5000;

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const loadGallery = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getGallery();
      const activeItems = Array.isArray(data)
        ? data.filter((item) => item.active && item.mediaUrl?.trim())
        : [];

      setItems(activeItems);
      setBackgroundIndex(0);
    } catch {
      setError("Unable to load the gallery. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadGallery();
  }, [loadGallery]);

  // Continuously rotate the hero background through active gallery photos.
  const backgroundPhotos = useMemo(
    () => items.filter((item) => item.mediaType === "PHOTO"),
    [items],
  );

  useEffect(() => {
    if (backgroundPhotos.length < 2) return;

    const timer = window.setInterval(() => {
      setBackgroundIndex((current) => (current + 1) % backgroundPhotos.length);
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(timer);
  }, [backgroundPhotos]);

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          items
            .map((item) => item.category?.trim())
            .filter((category): category is string => Boolean(category)),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    ],
    [items],
  );

  const filteredItems = useMemo(
    () =>
      selectedCategory === "All"
        ? items
        : items.filter((item) => item.category === selectedCategory),
    [items, selectedCategory],
  );

  const moveBackground = (direction: number) => {
    if (backgroundPhotos.length < 2) return;

    setBackgroundIndex(
      (current) =>
        (current + direction + backgroundPhotos.length) %
        backgroundPhotos.length,
    );
  };

  

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Continuously changing image background */}
      <section className="relative isolate flex min-h-[580px] items-center overflow-hidden sm:min-h-[680px]">
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />

        

{backgroundPhotos.map((photo, index) => {
  const isActive =
    index === backgroundIndex % backgroundPhotos.length;

  return (
    <div
      key={photo.id}
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden transition-opacity duration-[1200ms] ease-in-out"
      style={{
        opacity: isActive ? 1 : 0,
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-linear"
        style={{
          backgroundImage: `url(${JSON.stringify(photo.mediaUrl).slice(1, -1)})`,
          transform: isActive ? "scale(1.12)" : "scale(1)",
        }}
      />
    </div>
  );
})}





        <div className="absolute inset-0 -z-10 bg-slate-950/65" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/40" />

        <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="reveal-from-left inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
            <Camera size={16} />
            Moments worth remembering
          </div>

          <h1 className="reveal-from-bottom mt-7 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Our School{" "}
            <span className="bg-gradient-to-r from-cyan-200 via-blue-300 to-violet-300 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>

          <p className="reveal-from-bottom delay-2 mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            Explore photographs and videos capturing activities, events, and
            memorable moments from our school community.
          </p>

          <div className="reveal-from-bottom delay-3 mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#gallery-items"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-100"
            >
              <Images size={18} />
              Explore gallery
            </a>

            <span className="rounded-xl border border-white/20 bg-black/20 px-5 py-3 text-sm text-white backdrop-blur">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>

          {backgroundPhotos.length > 1 && (
            <div className="mt-12 flex items-center gap-3">
              <button
                type="button"
                onClick={() => moveBackground(-1)}
                aria-label="Previous background image"
                className="rounded-full border border-white/30 bg-black/30 p-3 backdrop-blur transition hover:bg-white/20"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {backgroundPhotos.map((photo, index) => (
                  <button
                    key={photo.id}
                    type="button"
                    aria-label={`Show background image ${index + 1}`}
                    aria-pressed={
                      index === backgroundIndex % backgroundPhotos.length
                    }
                    onClick={() => setBackgroundIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === backgroundIndex % backgroundPhotos.length
                        ? "w-8 bg-white"
                        : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => moveBackground(1)}
                aria-label="Next background image"
                className="rounded-full border border-white/30 bg-black/30 p-3 backdrop-blur transition hover:bg-white/20"
              >
                <ChevronRight size={20} />
              </button>

              
<span className="ml-1 text-xs tabular-nums text-white/80">
  {backgroundIndex + 1} / {backgroundPhotos.length}
</span>


            </div>
          )}
        </div>
      </section>

      {/* Gallery grid */}
      <section id="gallery-items" className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="reveal-from-bottom flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Explore our memories
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Moments in focus
              </h2>
              <p className="mt-3 max-w-xl leading-7 text-slate-400">
                Browse the photographs and videos published by the school.
              </p>
            </div>

            {!loading && !error && (
              <p className="text-sm text-slate-400">
                Showing {filteredItems.length}{" "}
                {filteredItems.length === 1 ? "item" : "items"}
              </p>
            )}
          </div>

          {!loading && !error && categories.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? "border-cyan-300 bg-cyan-300 text-slate-950"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/50 hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div
              role="status"
              className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <div className="aspect-[4/3] bg-white/10" />
                  <div className="space-y-3 p-5">
                    <div className="h-5 w-2/3 rounded bg-white/10" />
                    <div className="h-4 w-full rounded bg-white/10" />
                  </div>
                </div>
              ))}
              <span className="sr-only">Loading gallery...</span>
            </div>
          )}

          {!loading && error && (
            <div
              role="alert"
              className="mt-10 rounded-2xl border border-red-400/20 bg-red-400/10 p-8 text-center"
            >
              <p className="text-lg font-semibold text-red-200">{error}</p>
              <button
                type="button"
                onClick={() => void loadGallery()}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-100"
              >
                <RefreshCw size={16} />
                Try again
              </button>
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-16 text-center">
              <Images size={44} className="mx-auto text-cyan-300" />
              <h3 className="mt-5 text-2xl font-semibold">
                No gallery items published yet
              </h3>
              <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-400">
                Active photos and videos will appear here after they are
                published through the admin gallery.
              </p>
            </div>
          )}

          {!loading && !error && items.length > 0 && filteredItems.length === 0 && (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-12 text-center text-slate-400">
              No items found in this category.
            </div>
          )}

          {!loading && !error && filteredItems.length > 0 && (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item, index) => (
                <article
                  key={item.id}
                  className={`card-3d group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition duration-300 hover:border-cyan-300/40 ${
                    index % 3 === 0
                      ? "reveal-from-left"
                      : index % 3 === 1
                        ? "reveal-from-bottom"
                        : "reveal-from-right"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    aria-label={`View ${item.title}`}
                    className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-800 text-left"
                  >
                    {item.mediaType === "VIDEO" ? (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-800 to-indigo-950 text-slate-300">
                        <Video size={44} />
                        <span className="text-sm">Watch video</span>
                      </div>
                    ) : (
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        onError={(event) => {
                          event.currentTarget.style.opacity = "0";
                        }}
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />

                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                      {item.mediaType === "VIDEO" ? (
                        <Video size={13} />
                      ) : (
                        <Camera size={13} />
                      )}
                      {item.mediaType === "VIDEO" ? "Video" : "Photo"}
                    </span>

                    <span className="absolute bottom-4 right-4 rounded-full bg-white/15 p-2 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                      <Images size={18} />
                    </span>
                  </button>

                  <div className="p-5">
                    {item.category?.trim() && (
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                        {item.category}
                      </p>
                    )}

                    <h3 className="mt-2 text-lg font-semibold text-white transition-colors group-hover:text-cyan-200">
                      {item.title}
                    </h3>

                    {item.description?.trim() && (
                      <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-400">
                        {item.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Media lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              aria-label="Close media viewer"
              className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/70 p-2 text-white transition hover:bg-white/20"
            >
              <X size={22} />
            </button>

            {selectedItem.mediaType === "VIDEO" ? (
              <video
                key={selectedItem.id}
                src={selectedItem.mediaUrl}
                controls
                autoPlay
                className="max-h-[72vh] w-full bg-black object-contain"
              >
                Your browser does not support video playback.
              </video>
            ) : (
              <img
                src={selectedItem.mediaUrl}
                alt={selectedItem.title}
                className="max-h-[72vh] w-full bg-black object-contain"
              />
            )}

            <div className="p-5 sm:p-7">
              {selectedItem.category && (
                <p className="text-sm font-medium text-cyan-300">
                  {selectedItem.category}
                </p>
              )}
              <h3 className="mt-2 text-xl font-bold">
                {selectedItem.title}
              </h3>
              {selectedItem.description && (
                <p className="mt-3 whitespace-pre-line leading-7 text-slate-300">
                  {selectedItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
