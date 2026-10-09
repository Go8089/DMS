import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import PublicLayout from "./components/public/PublicLayout";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Academics from "./pages/public/Academics";
import Admissions from "./pages/public/Admissions";
import Achievements from "@/pages/public/Achievements";
import Events from "@/pages/public/Events";
import Notices from "@/pages/public/Notices";
import Faculty from "@/pages/public/Faculty";
import Facilities from "@/pages/public/Facilities";
import Gallery from "@/pages/public/Gallery";
import Contact from "@/pages/public/Contact";

import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNotices from "./pages/admin/AdminNotices";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminAchievements from "./pages/admin/AdminAchievements";
import AdminFaculty from "./pages/admin/AdminFaculty";
import AdminFacilities from "./pages/admin/AdminFacilities";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminAdmissions from "./pages/admin/AdminAdmissions";
import AdminContact from "./pages/admin/AdminContact";
import AdminSchool from "./pages/admin/AdminSchool";
import AdminAcademics from "./pages/admin/AdminAcademics";
import AdminAdmissionEnquiries from "@/pages/admin/AdminAdmissionEnquiries";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public website */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/events" element={<Events />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

        </Route>

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin area */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="notices" element={<AdminNotices />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="achievements" element={<AdminAchievements />} />
            <Route path="faculty" element={<AdminFaculty />} />
            <Route path="facilities" element={<AdminFacilities />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="documents" element={<AdminDocuments />} />
            <Route path="admissions" element={<AdminAdmissions />} />
            <Route path="contact" element={<AdminContact />} />
            <Route path="school" element={<AdminSchool />} />
            <Route path="academics" element={<AdminAcademics />} />
            <Route path="admission-enquiries" element={<AdminAdmissionEnquiries />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;