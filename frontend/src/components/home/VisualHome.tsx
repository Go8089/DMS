import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

import AchievementsScreen from "./section/AchievementsScreen";
import NoticesScreen from "./section/NoticesScreen";
import EventsScreen from "./section/EventsScreen";
import AboutScreen from "./section/AboutScreen";
import AcademicsScreen from "./section/AcademicsScreen";
import AdmissionsScreen from "./section/AdmissionsScreen";
import FacultyScreen from "./section/FacultyScreen";
import FacilitiesScreen from "./section/FacilitiesScreen";
import GalleryScreen from "./section/GalleryScreen";
import ContactScreen from "./section/ContactScreen";

type Section =
  | "home"
  | "about"
  | "academics"
  | "admissions"
  | "faculty"
  | "notices"
  | "events"
  | "achievements"
  | "gallery"
  | "facilities"
  | "contact";

const tiles: {
  id: Section;
  title: string;
  image: string;
}[] = [
  {
    id: "about",
    title: "Our Story",
    image: "/images/school-campus-2.webp",
  },
  {
    id: "academics",
    title: "Academics",
    image: "/images/school-classroom.webp",
  },
  {
    id: "achievements",
    title: "Achievements",
    image: "/images/school-achievement.webp",
  },
  {
    id: "events",
    title: "Events",
    image: "/images/school-event.webp",
  },

  {
  id: "facilities",
  title: "Facilities",
  image: "/images/facility-library.jpg",
},


  {
    id: "gallery",
    title: "School Life",
    image: "/images/school-activity.jpg",
  },
];

const menuItems: {
  id: Section;
  label: string;
}[] = [
  { id: "about", label: "About Us" },
  { id: "academics", label: "Academics" },
  { id: "admissions", label: "Admissions" },
  { id: "faculty", label: "Faculty" },
  { id: "facilities", label: "Facilities" },
  { id: "notices", label: "Notices" },
  { id: "events", label: "Events" },
  { id: "achievements", label: "Achievements" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];



export default function VisualHome() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const openSection = (section: Section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  const goHome = () => {
    setActiveSection("home");
    setMenuOpen(false);
  };

if (activeSection === "academics") {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#151515]">
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goHome={goHome}
      />

      {menuOpen && (
        <MenuOverlay
          onSelect={openSection}
          onHome={goHome}
        />
      )}

      <AcademicsScreen />

      <button
        onClick={goHome}
        className="absolute bottom-7 left-8 z-50 flex items-center gap-2 text-sm text-white/50 transition hover:text-white lg:left-12"
      >
        <ArrowLeft size={17} />
        Back to Home
      </button>
    </main>
  );
}


  if (activeSection === "about") {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#f3f0e9]">
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goHome={goHome}
      />

      {menuOpen && (
        <MenuOverlay
          onSelect={openSection}
          onHome={goHome}
        />
      )}

      <AboutScreen />

      <button
        onClick={goHome}
        className="absolute bottom-7 left-8 z-50 flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 lg:left-12"
      >
        <ArrowLeft size={17} />
        Back to Home
      </button>
    </main>
  );
}

  if (activeSection === "notices") {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#f4f2ed]">
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goHome={goHome}
      />

      {menuOpen && (
        <MenuOverlay
          onSelect={openSection}
          onHome={goHome}
        />
      )}

      <NoticesScreen />

      <button
        onClick={goHome}
        className="absolute bottom-7 left-8 z-50 flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 lg:left-12"
      >
        <ArrowLeft size={17} />
        Back to Home
      </button>
    </main>
  );
}

if (activeSection === "events") {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#151515]">
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goHome={goHome}
      />

      {menuOpen && (
        <MenuOverlay
          onSelect={openSection}
          onHome={goHome}
        />
      )}

      <EventsScreen />

      <button
        onClick={goHome}
        className="absolute bottom-7 left-8 z-50 flex items-center gap-2 text-sm text-white/50 transition hover:text-white lg:left-12"
      >
        <ArrowLeft size={17} />
        Back to Home
      </button>
    </main>
  );
}

  /*
   * ACHIEVEMENTS SCREEN
   */
  if (activeSection === "achievements") {
    return (
      <main className="relative h-screen w-full overflow-hidden bg-[#111] text-white">
        <SiteHeader
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          goHome={goHome}
        />

        {menuOpen && (
          <MenuOverlay
            onSelect={openSection}
            onHome={goHome}
          />
        )}

        <AchievementsScreen />

        <button
          onClick={goHome}
          className="absolute bottom-7 left-8 z-50 flex items-center gap-2 text-sm text-white/50 transition hover:text-white lg:left-12"
        >
          <ArrowLeft size={17} />
          Back to Home
        </button>
      </main>
    );
  }


  if (activeSection === "admissions") {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#eeeae2]">
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goHome={goHome}
      />

      {menuOpen && (
        <MenuOverlay
          onSelect={openSection}
          onHome={goHome}
        />
      )}

      <AdmissionsScreen />

      <button
        onClick={goHome}
        className="absolute bottom-7 left-8 z-50 flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 lg:left-12"
      >
        <ArrowRight size={17} className="rotate-180" />
        Back to Home
      </button>
    </main>
  );
}

if (activeSection === "faculty") {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#e9e5dc]">
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goHome={goHome}
      />

      {menuOpen && (
        <MenuOverlay
          onSelect={openSection}
          onHome={goHome}
        />
      )}

      <FacultyScreen />

      <button
        onClick={goHome}
        className="absolute bottom-7 left-8 z-50 flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 lg:left-12"
      >
        <ArrowRight size={17} className="rotate-180" />
        Back to Home
      </button>
    </main>
  );
}

if (activeSection === "facilities") {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#111]">
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goHome={goHome}
      />

      {menuOpen && (
        <MenuOverlay
          onSelect={openSection}
          onHome={goHome}
        />
      )}

      <FacilitiesScreen />

      <button
        onClick={goHome}
        className="absolute bottom-7 left-8 z-50 flex items-center gap-2 text-sm text-white/50 transition hover:text-white lg:left-12"
      >
        <ArrowRight size={17} className="rotate-180" />
        Back to Home
      </button>
    </main>
  );
}

if (activeSection === "gallery") {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#eeeae3]">
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goHome={goHome}
      />

      {menuOpen && (
        <MenuOverlay
          onSelect={openSection}
          onHome={goHome}
        />
      )}

      <GalleryScreen />

      <button
        onClick={goHome}
        className="absolute bottom-7 left-8 z-50 flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 lg:left-12"
      >
        <ArrowRight size={17} className="rotate-180" />
        Back to Home
      </button>
    </main>
  );
 }

 if (activeSection === "contact") {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#e9e5dc]">
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goHome={goHome}
      />

      {menuOpen && (
        <MenuOverlay
          onSelect={openSection}
          onHome={goHome}
        />
      )}

      <ContactScreen />

      <button
        onClick={goHome}
        className="absolute bottom-7 left-8 z-50 flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 lg:left-12"
      >
        <ArrowRight size={17} className="rotate-180" />
        Back to Home
      </button>
    </main>
  );
}
 
 

  /*
   * OTHER SECTIONS
   */

  /*
   * HOME
   */
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black text-white">
      <img
        src="/images/school-campus.avif"
        alt="DMV School campus"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />

      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goHome={goHome}
      />

      {menuOpen && (
        <MenuOverlay
          onSelect={openSection}
          onHome={goHome}
        />
      )}

      <div className="relative z-10 flex h-full items-center px-8 lg:px-16">
        <div className="max-w-3xl animate-content-in">
          <p className="mb-5 text-sm font-semibold tracking-[0.3em] text-white/70">
            WELCOME TO DMV SCHOOL
          </p>

          <h1 className="text-5xl font-bold leading-[1.05] md:text-7xl lg:text-8xl">
            Empowering
            <br />
            Minds.
            <br />
            <span className="text-white/60">
              Building Futures.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-white/75 md:text-lg">
            A nurturing environment where students learn, grow,
            discover and achieve their potential.
          </p>

          <button
            onClick={() => openSection("admissions")}
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Admissions
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>

      {/* Image navigation */}
      <div className="absolute bottom-7 right-8 z-20 flex gap-3 lg:right-12">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => openSection(tile.id)}
            className="group relative h-28 w-40 overflow-hidden rounded-xl border border-white/20 transition duration-500 hover:-translate-y-2 hover:w-48"
          >
            <img
              src={tile.image}
              alt={tile.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/20" />

            <div className="absolute bottom-3 left-4">
              <p className="text-sm font-semibold">
                {tile.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}

/*
 * HEADER
 */
function SiteHeader({
  menuOpen,
  setMenuOpen,
  goHome,
}: {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  goHome: () => void;
}) {
  return (
    <header className="absolute left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-6 lg:px-12">
      <button
        onClick={goHome}
        className="flex items-center gap-3"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white font-bold text-black">
          DMV
        </div>

        <div className="text-left">
          <p className="text-lg font-bold leading-none">
            DMV SCHOOL
          </p>

          <p className="mt-1 text-[9px] tracking-[0.2em] text-white/70">
            EDUCATION • EXCELLENCE
          </p>
        </div>
      </button>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="group flex items-center gap-3 rounded-full border border-white/30 bg-black/20 px-5 py-3 backdrop-blur-md transition hover:bg-white hover:text-black"
      >
        <span className="text-sm font-semibold">MENU</span>

        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}

/*
 * MENU
 */
function MenuOverlay({
  onSelect,
  onHome,
}: {
  onSelect: (section: Section) => void;
  onHome: () => void;
}) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/90 px-8 backdrop-blur-xl animate-menu-in">
      <div className="w-full max-w-5xl">
        <button
          onClick={onHome}
          className="mb-8 text-sm text-white/50 transition hover:text-white"
        >
          Home
        </button>

        <div className="grid gap-x-16 md:grid-cols-2">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="group flex items-center justify-between border-b border-white/10 py-5 text-left transition hover:px-3"
            >
              <div className="flex items-center gap-5">
                <span className="text-xs text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-2xl font-medium md:text-3xl">
                  {item.label}
                </span>
              </div>

              <ArrowRight
                size={22}
                className="text-white/40 transition-transform group-hover:translate-x-2 group-hover:text-white"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}