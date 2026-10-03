import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
} from "lucide-react";

const admissionSteps = [
  {
    number: "01",
    title: "Enquiry",
    text: "Submit an admission enquiry to get information about the admission process.",
  },
  {
    number: "02",
    title: "Eligibility",
    text: "Check the eligibility requirements for the relevant class.",
  },
  {
    number: "03",
    title: "Documents",
    text: "Prepare the required documents and supporting information.",
  },
  {
    number: "04",
    title: "Application",
    text: "Complete and submit the admission application according to school guidelines.",
  },
];

const admissionInfo = [
  {
    icon: CheckCircle2,
    title: "Eligibility",
    text: "Class-wise eligibility requirements and admission criteria.",
  },
  {
    icon: FileText,
    title: "Required Documents",
    text: "Documents and certificates required during admission.",
  },
  {
    icon: CalendarDays,
    title: "Important Dates",
    text: "Admission dates, deadlines and other important timelines.",
  },
  {
    icon: ClipboardList,
    title: "Fees & Forms",
    text: "Fee information, forms and admission-related documents.",
  },
];

export default function AdmissionsScreen() {
  return (
    <section className="h-full w-full overflow-hidden bg-[#eeeae2] px-8 py-24 text-gray-900 lg:px-16">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col justify-center">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          {/* LEFT */}
          <div className="animate-content-in">
            <p className="text-xs font-semibold tracking-[0.3em] text-gray-400">
              JOIN DMV SCHOOL
            </p>

            <h1 className="mt-5 text-6xl font-bold leading-none md:text-7xl lg:text-8xl">
              Begin Your
              <br />
              <span className="text-gray-400">Journey.</span>
            </h1>

            <p className="mt-7 max-w-md text-sm leading-7 text-gray-500">
              Find the information you need to understand the admission
              process and begin your application.
            </p>

            <button className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-700">
              Admission Enquiry
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* RIGHT */}
          <div className="space-y-3">
            {/* Process */}
            <article className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-gray-400">
                ADMISSION PROCESS
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {admissionSteps.map((step) => (
                  <div
                    key={step.number}
                    className="rounded-xl border border-gray-200 p-4 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <span className="text-xs font-bold text-gray-300">
                      {step.number}
                    </span>

                    <h2 className="mt-2 text-lg font-semibold">
                      {step.title}
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Information */}
            <div className="grid gap-3 sm:grid-cols-2">
              {admissionInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="group rounded-2xl border border-gray-200 bg-white/70 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white">
                      <Icon size={16} />
                    </div>

                    <h2 className="mt-5 text-lg font-semibold">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}