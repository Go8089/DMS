import { Mail, MapPin, Phone } from "lucide-react";

const footerLinks = [
  { label: "About Us", href: "#" },
  { label: "Academics", href: "#" },
  { label: "Admissions", href: "#" },
  { label: "Faculty", href: "#faculty" },
  { label: "Facilities", href: "#facilities" },
  { label: "Notices", href: "#notices" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* School */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white font-bold text-gray-900">
                DMV
              </div>

              <div>
                <p className="text-lg font-bold">DMV SCHOOL</p>
                <p className="text-[10px] tracking-[0.2em] text-white/50">
                  EDUCATION • EXCELLENCE
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/50">
              A professional school community focused on learning, growth,
              character and opportunities for every student.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold">Quick Links</h3>

            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/50 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold">Contact</h3>

            <div className="mt-5 space-y-4">
              <div className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-white/60" />
                <p className="text-sm leading-6 text-white/50">
                  School Campus Address
                  <br />
                  City, State, India
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={17} className="text-white/60" />
                <p className="text-sm text-white/50">
                  School phone number
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={17} className="text-white/60" />
                <p className="text-sm text-white/50">
                  School email address
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col justify-between gap-3 text-xs text-white/40 md:flex-row">
            <p>© {new Date().getFullYear()} DMV School. All rights reserved.</p>

            <p>School Information &amp; Administration Portal</p>
          </div>
        </div>
      </div>
    </footer>
  );
}