import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const contactItems = [
  {
    icon: MapPin,
    label: "ADDRESS",
    value: "School address will be added here.",
  },
  {
    icon: Phone,
    label: "PHONE",
    value: "School phone number will be added here.",
  },
  {
    icon: Mail,
    label: "EMAIL",
    value: "School email address will be added here.",
  },
];

export default function ContactScreen() {
  return (
    <section className="h-full w-full overflow-hidden bg-[#e9e5dc] px-8 py-24 text-gray-900 lg:px-16">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col justify-center">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          {/* LEFT */}
          <div className="animate-content-in">
            <p className="text-xs font-semibold tracking-[0.3em] text-gray-400">
              GET IN TOUCH
            </p>

            <h1 className="mt-5 text-6xl font-bold leading-none md:text-7xl lg:text-8xl">
              Let's
              <br />
              <span className="text-gray-400">Connect.</span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-gray-500">
              Have a question about the school, admissions or any other
              information? Get in touch with us.
            </p>

            <div className="mt-8 space-y-4">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white">
                      <Icon size={16} />
                    </div>

                    <div>
                      <p className="text-[9px] font-semibold tracking-[0.2em] text-gray-400">
                        {item.label}
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid gap-3">
            {/* Map */}
            <div className="relative h-52 overflow-hidden rounded-2xl bg-gray-900">
              <div className="absolute inset-0 opacity-30">
                <div className="h-full w-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]" />
              </div>

              <div className="relative flex h-full items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg">
                    <MapPin size={20} />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-white">
                    DMV School
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    School Location
                  </p>
                </div>
              </div>

              <button className="absolute bottom-4 right-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-900 transition hover:bg-gray-200">
                Open in Maps
              </button>
            </div>

            {/* Enquiry */}
            <div className="rounded-2xl bg-gray-900 p-6 text-white">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.25em] text-white/40">
                    ENQUIRY
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    Send Us a Message
                  </h2>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-white/45">
                    Contact form and admission enquiry functionality will be
                    connected to the school backend.
                  </p>
                </div>

                <button className="group flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
                  Contact Us
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}