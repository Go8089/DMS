import { useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";

interface PublicMenuProps {
  onClose: () => void;
}

const links = [
  { label: "About", path: "/about", number: "01" },
  { label: "Academics", path: "/academics", number: "02" },
  { label: "Admissions", path: "/admissions", number: "03" },
  { label: "Faculty", path: "/faculty", number: "04" },
  { label: "Facilities", path: "/facilities", number: "05" },
  { label: "Notices", path: "/notices", number: "06" },
  { label: "Events", path: "/events", number: "07" },
  { label: "Achievements", path: "/achievements", number: "08" },
  { label: "Gallery", path: "/gallery", number: "09" },
  { label: "Contact", path: "/contact", number: "10" },
];

function PublicMenu({ onClose }: PublicMenuProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-neutral-950/98 text-white backdrop-blur-2xl animate-menu-in"
      role="dialog"
      aria-modal="true"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-6 py-6 sm:px-10 md:px-14 lg:px-20">
        {/* Menu header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/50">
            Navigation
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            autoFocus
            className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-4 py-3 text-sm transition duration-300 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span className="hidden sm:inline">Close</span>
            <X
              size={20}
              className="transition-transform duration-300 group-hover:rotate-90"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-1 items-center py-10">
          <div className="grid w-full grid-cols-1 gap-x-12 md:grid-cols-2">
            {links.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                style={{ animationDelay: `${index * 45}ms` }}
                className="group flex animate-slide-right items-center gap-4 border-b border-white/10 py-4 transition-colors duration-300 hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:py-5 md:gap-6"
              >
                <span className="w-6 shrink-0 text-xs tabular-nums text-white/35 transition-colors group-hover:text-white/80">
                  {item.number}
                </span>

                <span className="min-w-0 flex-1 text-2xl font-light tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl md:text-4xl lg:text-5xl">
                  {item.label}
                </span>

                <ArrowUpRight
                  size={22}
                  aria-hidden="true"
                  className="shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white sm:size-6"
                />
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>Explore the website</span>
          <span>Use the menu to navigate</span>
        </div>
      </div>
    </div>
  );
}

export default PublicMenu;
