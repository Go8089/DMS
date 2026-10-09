export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface Notice {
  id: number;
  title: string;
  description: string;
  type: string;
  noticeDate: string;
  documentUrl?: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  imageUrl?: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  category: string;
  achievementDate: string;
  imageUrl?: string;
}

export interface Faculty {
  id: number;
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

export interface Facility {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  active: boolean;
}

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: "PHOTO" | "VIDEO";
  category: string;
  homepageSlider: boolean;
  active: boolean;
}

export interface AdmissionEnquiry {
  id: number;
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  classApplyingFor: string;
  message?: string;
  submittedAt: string;
}

export interface ContactEnquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export interface SchoolInfo {
  id: number;
  schoolName: string;
  address: string;
  phone: string;
  email: string;
  principalName: string;
  history: string;
  vision: string;
  mission: string;
}

export interface SchoolInfo {
  id: number;
  schoolName: string;
  address: string;
  phone: string;
  email: string;
  principalName: string;
  history: string;
  vision: string;
  mission: string;
}

export interface AcademicInfo {
  id: number;
  section: string;
  description: string;
  classesOffered: string;
  subjects: string;
  curriculum: string;
  academicCalendar: string;
  examinationSystem: string;
  rules: string;
}

export interface AdmissionInfo {
  id: number;
  title: string;
  description: string;
  procedure: string;
  eligibility: string;
  requiredDocuments: string;
  admissionDates: string;
  feeDetails: string;
  applicationFormUrl?: string;
  brochureUrl?: string;
  active: boolean;
}

export interface NoticeRequest {
  title: string;
  description: string;
  type: string;
  noticeDate: string;
  documentUrl?: string;
}