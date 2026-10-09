
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

import { getSchoolInfo } from "@/api/public";
import type { SchoolInfo } from "@/types/admin";

import PublicMenu from "./PublicMenu";

function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [school, setSchool] = useState<SchoolInfo | null>(null);

  useEffect(() => {
    let mounted = true;

    getSchoolInfo()
      .then((data) => {
        if (mounted) setSchool(data);
      })
      .catch((error) => {
        console.error("Failed to load school branding:", error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-5 py-5 text-white sm:px-6 md:px-10 md:py-6">
        <Link
          to="/"
          aria-label="Go to homepage"
          className="max-w-[70%] truncate text-sm font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-75 sm:tracking-[0.25em]"
        >
          {school?.schoolName || "School"}
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          className="inline-flex shrink-0 items-center gap-3 rounded-full border border-white/20 bg-black/20 px-4 py-2.5 text-sm backdrop-blur-md transition hover:bg-white/10 sm:px-5"
        >
          <span>MENU</span>
          <Menu size={18} />
        </button>
      </header>

      {menuOpen && <PublicMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
}

export default PublicHeader;