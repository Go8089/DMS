import type {
  AcademicInfo,
  Achievement,
  AdmissionInfo,
  Event,
  Facility,
  Faculty,
  GalleryItem,
  Notice,
  SchoolInfo,
} from "@/types/admin";

const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080";

async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${endpoint}`);
  }

  return response.json();
}

export function getSchoolInfo(): Promise<SchoolInfo> {
  return get<SchoolInfo>("/api/school");
}

export function getNotices(): Promise<Notice[]> {
  return get<Notice[]>("/api/notices");
}

export function getEvents(): Promise<Event[]> {
  return get<Event[]>("/api/events");
}

export function getAchievements(): Promise<Achievement[]> {
  return get<Achievement[]>("/api/achievements");
}

export function getFaculty(): Promise<Faculty[]> {
  return get<Faculty[]>("/api/faculty");
}

export function getFacilities(): Promise<Facility[]> {
  return get<Facility[]>("/api/facilities");
}

export function getGallery(): Promise<GalleryItem[]> {
  return get<GalleryItem[]>("/api/gallery");
}

export function getAcademicInfo(): Promise<AcademicInfo[]> {
  return get("/api/academics");
}

export function getAdmissionInfo(): Promise<AdmissionInfo[]> {
  return get("/api/admissions");
}