import { getToken, removeToken } from "@/lib/auth";
import type {
  Achievement,
  AdmissionEnquiry,
  ContactEnquiry,
  Event,
  Facility,
  Faculty,
  GalleryItem,
  Notice,
  LoginRequest,
  LoginResponse,
  SchoolInfo,
} from "@/types/admin";

const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080";

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    removeToken();
    window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }

  if (response.status === 403) {
    throw new Error("You do not have permission to perform this action.");
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export async function login(
  credentials: LoginRequest
): Promise<LoginResponse> {
  return request<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function getNotices(): Promise<Notice[]> {
  return request<Notice[]>("/api/admin/notices");
}

export async function getEvents(): Promise<Event[]> {
  return request<Event[]>("/api/admin/events");
}

export async function getAchievements(): Promise<Achievement[]> {
  return request<Achievement[]>("/api/admin/achievements");
}

export async function getFaculty(): Promise<Faculty[]> {
  return request<Faculty[]>("/api/admin/faculty");
}

export async function getFacilities(): Promise<Facility[]> {
  return request<Facility[]>("/api/admin/facilities");
}

export async function getGallery(): Promise<GalleryItem[]> {
  return request<GalleryItem[]>("/api/admin/gallery");
}

export async function getAdmissionEnquiries(): Promise<
  AdmissionEnquiry[]
> {
  return request<AdmissionEnquiry[]>(
    "/api/admin/admissions/enquiries"
  );
}

export async function getContactEnquiries(): Promise<
  ContactEnquiry[]
> {
  return request<ContactEnquiry[]>(
    "/api/admin/contact/enquiries"
  );
}

export interface NoticeRequest {
  title: string;
  description: string;
  type: string;
  noticeDate: string;
  documentUrl?: string;
}

export async function createNotice(
  notice: NoticeRequest
): Promise<Notice> {
  return request<Notice>("/api/admin/notices", {
    method: "POST",
    body: JSON.stringify(notice),
  });
}

export async function updateNotice(
  id: number,
  notice: NoticeRequest
): Promise<Notice> {
  return request<Notice>(`/api/admin/notices/${id}`, {
    method: "PUT",
    body: JSON.stringify(notice),
  });
}

export async function deleteNotice(id: number): Promise<void> {
  return request<void>(`/api/admin/notices/${id}`, {
    method: "DELETE",
  });
}

export interface EventRequest {
  title: string;
  description: string;
  eventDate: string;
  location: string;
  imageUrl?: string;
}

export async function createEvent(event: EventRequest): Promise<Event> {
  return request<Event>("/api/admin/events", {
    method: "POST",
    body: JSON.stringify(event),
  });
}

export async function updateEvent(
  id: number,
  event: EventRequest
): Promise<Event> {
  return request<Event>(`/api/admin/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(event),
  });
}

export async function deleteEvent(id: number): Promise<void> {
  return request<void>(`/api/admin/events/${id}`, {
    method: "DELETE",
  });
}

export interface AchievementRequest {
  title: string;
  description: string;
  category: string;
  achievementDate: string;
  imageUrl?: string;
}

export async function createAchievement(
  achievement: AchievementRequest
): Promise<Achievement> {
  return request<Achievement>("/api/admin/achievements", {
    method: "POST",
    body: JSON.stringify(achievement),
  });
}

export async function updateAchievement(
  id: number,
  achievement: AchievementRequest
): Promise<Achievement> {
  return request<Achievement>(`/api/admin/achievements/${id}`, {
    method: "PUT",
    body: JSON.stringify(achievement),
  });
}

export async function deleteAchievement(id: number): Promise<void> {
  return request<void>(`/api/admin/achievements/${id}`, {
    method: "DELETE",
  });
}

export interface FacultyRequest {
  name: string;
  designation: string;
  department: string;
  qualification: string;
  description: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
  principal?: boolean;
}

export async function createFaculty(
  faculty: FacultyRequest
): Promise<Faculty> {
  return request<Faculty>("/api/admin/faculty", {
    method: "POST",
    body: JSON.stringify(faculty),
  });
}

export async function updateFaculty(
  id: number,
  faculty: FacultyRequest
): Promise<Faculty> {
  return request<Faculty>(`/api/admin/faculty/${id}`, {
    method: "PUT",
    body: JSON.stringify(faculty),
  });
}

export async function deleteFaculty(id: number): Promise<void> {
  return request<void>(`/api/admin/faculty/${id}`, {
    method: "DELETE",
  });
}

export interface FacilityRequest {
  name: string;
  description: string;
  imageUrl?: string;
  active: boolean;
}

export async function createFacility(
  facility: FacilityRequest
): Promise<Facility> {
  return request<Facility>("/api/admin/facilities", {
    method: "POST",
    body: JSON.stringify(facility),
  });
}

export async function updateFacility(
  id: number,
  facility: FacilityRequest
): Promise<Facility> {
  return request<Facility>(`/api/admin/facilities/${id}`, {
    method: "PUT",
    body: JSON.stringify(facility),
  });
}

export async function deleteFacility(id: number): Promise<void> {
  return request<void>(`/api/admin/facilities/${id}`, {
    method: "DELETE",
  });
}

export interface GalleryItemRequest {
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: "PHOTO" | "VIDEO";
  category: string;
  homepageSlider: boolean;
  active: boolean;
}

export async function createGalleryItem(
  item: GalleryItemRequest
): Promise<GalleryItem> {
  return request<GalleryItem>("/api/admin/gallery", {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export async function updateGalleryItem(
  id: number,
  item: GalleryItemRequest
): Promise<GalleryItem> {
  return request<GalleryItem>(`/api/admin/gallery/${id}`, {
    method: "PUT",
    body: JSON.stringify(item),
  });
}

export async function deleteGalleryItem(id: number): Promise<void> {
  return request<void>(`/api/admin/gallery/${id}`, {
    method: "DELETE",
  });
}

export async function deleteAdmissionEnquiry(id: number): Promise<void> {
  return request<void>(`/api/admin/admissions/enquiries/${id}`, {
    method: "DELETE",
  });
}

export async function deleteContactEnquiry(id: number): Promise<void> {
  return request<void>(`/api/admin/contact/enquiries/${id}`, {
    method: "DELETE",
  });
}

export interface DocumentRequest {
  title: string;
  description: string;
  documentUrl: string;
  category: string;
  active: boolean;
}

export interface SchoolDocument {
  id: number;
  title: string;
  description: string;
  documentUrl: string;
  category: string;
  active: boolean;
}

export async function getDocuments(): Promise<SchoolDocument[]> {
  return request<SchoolDocument[]>("/api/admin/documents");
}

export async function createDocument(
  document: DocumentRequest
): Promise<SchoolDocument> {
  return request<SchoolDocument>("/api/admin/documents", {
    method: "POST",
    body: JSON.stringify(document),
  });
}

export async function updateDocument(
  id: number,
  document: DocumentRequest
): Promise<SchoolDocument> {
  return request<SchoolDocument>(`/api/admin/documents/${id}`, {
    method: "PUT",
    body: JSON.stringify(document),
  });
}

export async function deleteDocument(id: number): Promise<void> {
  return request<void>(`/api/admin/documents/${id}`, {
    method: "DELETE",
  });
}

export async function getSchoolInfo(): Promise<SchoolInfo> {
  return request<SchoolInfo>("/api/admin/school");
}

export async function updateSchoolInfo(
  schoolInfo: SchoolInfo
): Promise<SchoolInfo> {
  return request<SchoolInfo>("/api/admin/school", {
    method: "PUT",
    body: JSON.stringify(schoolInfo),
  });
}