import {
  Award,
  Bell,
  CalendarDays,
  Image,
  Mail,
  School,
  Users,
} from "lucide-react";

const cards = [
  {
    title: "Notices",
    description: "Manage school announcements",
    icon: Bell,
    path: "/admin/notices",
  },
  {
    title: "Events",
    description: "Manage upcoming events",
    icon: CalendarDays,
    path: "/admin/events",
  },
  {
    title: "Achievements",
    description: "Manage school achievements",
    icon: Award,
    path: "/admin/achievements",
  },
  {
    title: "Faculty",
    description: "Manage faculty profiles",
    icon: Users,
    path: "/admin/faculty",
  },
  {
    title: "Gallery",
    description: "Manage photos and videos",
    icon: Image,
    path: "/admin/gallery",
  },
  {
    title: "Admissions",
    description: "View admission enquiries",
    icon: School,
    path: "/admin/admissions",
  },
  {
    title: "Contact",
    description: "View contact enquiries",
    icon: Mail,
    path: "/admin/contact",
  },
];

function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-semibold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Manage the DMV School website content.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <a
              key={card.title}
              href={card.path}
              className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                <Icon size={20} />
              </div>

              <h2 className="font-semibold text-slate-900">
                {card.title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {card.description}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;