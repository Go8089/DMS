
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Academics", to: "/academics" },
  { label: "Admissions", to: "/admissions" },
  { label: "Faculty", to: "/faculty" },
  { label: "Facilities", to: "/facilities" },
  { label: "Notices", to: "/notices" },
  { label: "Events", to: "/events" },
  { label: "Achievements", to: "/achievements" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export default function PublicMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap rounded-md px-2 py-2 text-[15px] font-semibold transition-colors ${
      isActive
        ? "text-blue-700"
        : "text-slate-700 hover:bg-slate-100 hover:text-blue-700"
    }`;

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      <nav
        className="mx-auto flex min-h-14 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* DMS branding */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="shrink-0 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
          aria-label="DMS homepage"
        >
          DMS
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center justify-end gap-6 xl:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-800 transition hover:bg-slate-100 xl:hidden"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full max-h-[calc(100dvh-56px)] overflow-y-auto border-b border-slate-200 bg-white px-4 py-3 shadow-lg xl:hidden">
          <div className="mx-auto flex max-w-2xl flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}