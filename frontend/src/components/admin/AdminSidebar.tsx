import {
  Award,
  Bell,
  Building2,
  CalendarDays,
  FileText,
  Image,
  LayoutDashboard,
  Library,
  LogOut,
  Mail,
  School,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "@/lib/auth";
import { BookOpen } from "lucide-react";
const navigation = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Notices",
    path: "/admin/notices",
    icon: Bell,
  },
  {
    label: "Events",
    path: "/admin/events",
    icon: CalendarDays,
  },
  {
    label: "Achievements",
    path: "/admin/achievements",
    icon: Award,
  },
  {
    label: "Faculty",
    path: "/admin/faculty",
    icon: Users,
  },
  {
    label: "Facilities",
    path: "/admin/facilities",
    icon: Building2,
  },
  {
    label: "Gallery",
    path: "/admin/gallery",
    icon: Image,
  },
  {
    label: "Documents",
    path: "/admin/documents",
    icon: FileText,
  },
  {
    label: "Admissions",
    path: "/admin/admissions",
    icon: School,
  },
  {
    lanel: "Admission Enquiries",
    path: "/admin/admission-enquiries",
    icon: Library,

  },
  {
    label: "Contact Enquiries",
    path: "/admin/contact",
    icon: Mail,
  },
  {
  label: "School Information",
  path: "/admin/school",
  icon: School,
  },
  {
  label: "Academics",
  path: "/admin/academics",
  icon: BookOpen,
  },
];

function AdminSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate("/admin/login");
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <h1 className="text-lg font-semibold text-slate-900">
          DMV School
        </h1>

        <p className="text-xs text-slate-500">
          Administration
        </p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;