
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
import Footer from "@/components/public/Footer";

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
      const response = await getGallery();
      const activeItems = response.filter(
        (item) => item.active && item.mediaUrl?.trim(),
      );

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

  const backgroundPhotos = useMemo(
    () => items.filter((item) => item.mediaType === "PHOTO"),
    [items],
  );

  useEffect(() => {
    if (backgroundPhotos.length < 2) return;

    const interval = window.setInterval(() => {
      setBackgroundIndex((current) => (current + 1) % backgroundPhotos.length);
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(interval);
  }, [backgroundPhotos.length]);

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
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
        : items.filter(
            (item) => item.category?.trim() === selectedCategory,
          ),
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

  const currentBackground = backgroundPhotos[backgroundIndex];

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-800">
      {/* Hero: original dimensions preserved */}
      <section className="relative isolate flex min-h-[580px] items-center overflow-hidden sm:min-h-[680px]">
        {backgroundPhotos.length > 0 ? (
          backgroundPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-in-out ${
                index === backgroundIndex
                  ? "scale-100 opacity-100"
                  : "scale-105 opacity-0"
              }`}
              style={{
                backgroundImage: `url("${photo.mediaUrl}")`,
              }}
              aria-hidden="true"
            />
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900" />
        )}

        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              <Camera className="h-4 w-4" />
              <span>Moments worth remembering</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
              Our School
              <span className="mt-2 block text-blue-300">Gallery</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              Explore the moments, celebrations, achievements, and everyday
              experiences that make our school community special.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#gallery-items"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <Images className="h-5 w-5" />
                Explore Gallery
              </a>

              <div className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-md">
                <Camera className="h-4 w-4 text-blue-300" />
                {items.length} {items.length === 1 ? "Memory" : "Memories"}
              </div>
            </div>
          </div>
        </div>

        {backgroundPhotos.length > 1 && (
          <>
            <div className="absolute bottom-8 right-5 z-10 flex items-center gap-3 sm:bottom-10 sm:right-10">
              <button
                type="button"
                onClick={() => moveBackground(-1)}
                aria-label="Previous background photo"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {backgroundPhotos.map((photo, index) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setBackgroundIndex(index)}
                    aria-label={`Show background photo ${index + 1}`}
                    aria-current={index === backgroundIndex}
                    className={`h-2 rounded-full transition-all ${
                      index === backgroundIndex
                        ? "w-7 bg-white"
                        : "w-2 bg-white/55 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => moveBackground(1)}
                aria-label="Next background photo"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {currentBackground && (
              <div className="absolute bottom-10 left-5 z-10 hidden text-sm text-white/80 sm:left-10 sm:block">
                {String(backgroundIndex + 1).padStart(2, "0")} /{" "}
                {String(backgroundPhotos.length).padStart(2, "0")}
              </div>
            )}
          </>
        )}
      </section>

      {/* Gallery content */}
      <section
        id="gallery-items"
        className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                Memories in focus
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Explore Our Moments
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                A collection of events, activities, celebrations, and
                experiences from our school community.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm">
              <Images className="h-4 w-4 text-blue-700" />
              {filteredItems.length}{" "}
              {filteredItems.length === 1 ? "item" : "items"}
            </div>
          </div>

          {!loading && !error && categories.length > 1 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((category) => {
                const isSelected = selectedCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={isSelected}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isSelected
                        ? "border-blue-700 bg-blue-700 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="aspect-[4/3] animate-pulse bg-slate-200" />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
                    <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-white px-6 py-14 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Images className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">
                Gallery unavailable
              </h3>
              <p className="mt-2 text-slate-600">{error}</p>
              <button
                type="button"
                onClick={() => void loadGallery()}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && filteredItems.length === 0 && (
            <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <Images className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">
                {items.length === 0
                  ? "Our gallery is growing"
                  : "No items in this category"}
              </h3>
              <p className="mx-auto mt-2 max-w-md leading-7 text-slate-600">
                {items.length === 0
                  ? "School memories will appear here once they have been added."
                  : "Try selecting another category to explore more school memories."}
              </p>

              {items.length > 0 && selectedCategory !== "All" && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className="mt-5 rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-800"
                >
                  View All Items
                </button>
              )}
            </div>
          )}

          {!loading && !error && filteredItems.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => {
                const isVideo = item.mediaType === "VIDEO";

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={`View ${item.title || "gallery item"}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      {isVideo ? (
                        <video
                          src={item.mediaUrl}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          muted
                          playsInline
                          preload="metadata"
                          aria-label={item.title || "Gallery video preview"}
                        />
                      ) : (
                        <img
                          src={item.mediaUrl}
                          alt={item.title || "School gallery"}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />

                      <div className="absolute left-4 top-4">
                        {item.category?.trim() && (
                          <span className="inline-flex rounded-full border border-white/40 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur">
                            {item.category.trim()}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-white">
                        {isVideo ? (
                          <Video className="h-4 w-4" />
                        ) : (
                          <Camera className="h-4 w-4" />
                        )}
                        <span>{isVideo ? "Video" : "Photo"}</span>
                      </div>

                      <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                        <Images className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="line-clamp-1 text-lg font-semibold text-slate-900 transition group-hover:text-blue-800">
                        {item.title || "School Memory"}
                      </h3>

                      {item.description?.trim() ? (
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      ) : (
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          A special moment from our school community.
                        </p>
                      )}

                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
                        <span className="text-slate-500">
                          View {isVideo ? "video" : "photo"}
                        </span>
                        <span className="inline-flex items-center gap-1 font-medium text-blue-700 transition group-hover:gap-2">
                          Open
                          <ChevronRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Media lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title || "Gallery media"}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedItem(null);
            }
          }}
        >
          <button
            type="button"
            onClick={() => setSelectedItem(null)}
            aria-label="Close gallery viewer"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-white sm:right-7 sm:top-7"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="max-h-full w-full max-w-6xl overflow-hidden rounded-xl border border-white/15 bg-slate-900 shadow-2xl">
            <div className="flex max-h-[75vh] items-center justify-center bg-black">
              {selectedItem.mediaType === "VIDEO" ? (
                <video
                  src={selectedItem.mediaUrl}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[75vh] w-full object-contain"
                />
              ) : (
                <img
                  src={selectedItem.mediaUrl}
                  alt={selectedItem.title || "School gallery"}
                  className="max-h-[75vh] w-full object-contain"
                />
              )}
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    {selectedItem.title || "School Memory"}
                  </h3>
                  {selectedItem.description?.trim() && (
                    <p className="mt-2 max-w-3xl leading-7 text-slate-300">
                      {selectedItem.description}
                    </p>
                  )}
                </div>

                {selectedItem.category?.trim() && (
                  <span className="w-fit shrink-0 rounded-full border border-blue-300/30 bg-blue-500/15 px-3 py-1 text-sm font-medium text-blue-200">
                    {selectedItem.category.trim()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}