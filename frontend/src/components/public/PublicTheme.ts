import type { GalleryItem } from "@/types/admin";

export function getHeroImages(items: GalleryItem[]): string[] {
  const activePhotos = items.filter(
    (item) =>
      item.active &&
      item.mediaType === "PHOTO" &&
      Boolean(item.mediaUrl?.trim()),
  );

  const sliderPhotos = activePhotos.filter((item) => item.homepageSlider);
  const selected =
    sliderPhotos.length > 0 ? sliderPhotos : activePhotos;

  return [...new Set(selected.map((item) => item.mediaUrl))];
}
