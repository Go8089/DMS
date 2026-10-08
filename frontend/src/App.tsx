
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import VisualHome from "./components/home/VisualHome";

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
import AdminAdmissions from "./pages/admin/AdminAdmissions";
import AdminContact from "./pages/admin/AdminContact";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminSchool from "./pages/admin/AdminSchool";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public website */}
        <Route path="/*" element={<VisualHome />} />

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />

            {/* Temporary placeholders */}
            <Route path="notices" element={<AdminNotices />} />

            <Route path="events" element={<AdminEvents />} />

            <Route
              path="achievements"
              element={<AdminAchievements />}
            />

            <Route
              path="faculty"
              element={<AdminFaculty />}
            />

            <Route
              path="facilities"
              element={<AdminFacilities />}
            />

            <Route
              path="gallery"
              element={<AdminGallery />}
            />

            <Route
              path="documents"
              element={<AdminDocuments />}
            />

            <Route
              path="admissions"
              element={<AdminAdmissions />}
            />

            <Route
              path="contact"
              element={<AdminContact />}
            />

            <Route path="school" element={<AdminSchool />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;