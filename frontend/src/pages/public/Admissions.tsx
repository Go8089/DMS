import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  GraduationCap,
  CalendarDays,
  ClipboardList,
  IndianRupee,
  ShieldCheck,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import PublicPageHero from "@/components/public/PublicPageHero";
import { getAdmissionInfo, getGallery } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { AdmissionInfo, GalleryItem } from "@/types/admin";
import Footer from "@/components/public/Footer";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

function Admissions() {
  const [admissions, setAdmissions] = useState<AdmissionInfo[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    Promise.all([getAdmissionInfo(), getGallery()])
      .then(([admissionData, galleryData]) => {
        setAdmissions(admissionData.filter((item) => item.active));
        setGallery(galleryData);
      })
      .catch((error) => {
        console.error("Failed to load admissions information:", error);
        setLoadError(
          "Unable to load admission information. Please try again.",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const images = getHeroImages(gallery);
  const activeAdmission = admissions[0];

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-md border-2 border-slate-200 border-t-sky-400" />
      </section>
    );
  }

  if (!activeAdmission) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6 text-center text-slate-900">
        <div className="max-w-lg">
          <GraduationCap
            className="mx-auto mb-5 text-sky-400"
            size={48}
          />
          <h1 className="text-3xl font-bold">Admissions</h1>
          <p className="mt-4 leading-7 text-slate-500">
            {loadError || "Admission information is currently unavailable."}
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-md bg-blue-800 hover:bg-blue-900 px-6 py-3 font-semibold"
          >
            Contact Our School
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <PublicPageHero
        eyebrow="Admissions"
        title={activeAdmission.title}
        description={activeAdmission.description}
        images={images}
        animation="zoom"
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="group inline-flex items-center gap-3 rounded-md bg-blue-800 hover:bg-blue-900 px-6 py-3 font-semibold text-slate-900 shadow-sm transition hover:scale-105"
          >
            Admission Enquiry
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          {activeAdmission.brochureUrl && (
            <a
              href={activeAdmission.brochureUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-md border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900  transition hover:border-blue-400 hover:bg-blue-50"
            >
              <FileText size={18} />
              Download Brochure
            </a>
          )}

          {activeAdmission.applicationFormUrl && (
            <a
              href={activeAdmission.applicationFormUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-md border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900  transition hover:border-blue-400 hover:bg-violet-500/10"
            >
              <FileText size={18} />
              Application Form
            </a>
          )}
        </div>
      </PublicPageHero>

      {/* Admission guide */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-800">
            Admission Guide
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Your Journey Starts Here
          </h2>

          <p className="mt-4 leading-7 text-slate-500">
            Explore admission procedures, eligibility, required documents,
            important dates, and fee details. Select the relevant information
            below to learn more about joining our school.
          </p>

          <div className="mt-6 h-1 w-20 rounded-md bg-blue-800" />
        </div>

        <div className="space-y-10">
          {admissions.map((admission, index) => {
            const guideItems = [
              {
                title: "Admission Procedure",
                description: admission.procedure,
                icon: ClipboardList,
                number: "01",
              },
              {
                title: "Eligibility",
                description: admission.eligibility,
                icon: ShieldCheck,
                number: "02",
              },
              {
                title: "Required Documents",
                description: admission.requiredDocuments,
                icon: FileText,
                number: "03",
              },
              {
                title: "Admission Dates",
                description: admission.admissionDates,
                icon: CalendarDays,
                number: "04",
              },
              {
                title: "Fee Details",
                description: admission.feeDetails,
                icon: IndianRupee,
                number: "05",
              },
            ].filter((item) => Boolean(item.description?.trim()));

            return (
              <div
                key={admission.id}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white/70"
              >
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-6 md:px-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-800">
                        Admission Information · {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-2 text-2xl font-bold">
                        {admission.title}
                      </h3>

                      {admission.description && (
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                          {admission.description}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-md border border-blue-200 bg-blue-50 px-5 py-2.5 text-sm font-semibold text-blue-800 transition hover:bg-blue-100 sm:self-center"
                    >
                      Enquire Now <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {guideItems.length > 0 ? (
                  <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 md:p-7">
                    {guideItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <article
                          key={item.title}
                          className="group rounded-lg border border-slate-200 bg-slate-50/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="grid h-11 w-11 place-items-center rounded-xl border border-blue-100 bg-blue-50 text-blue-800 transition group-hover:bg-blue-100">
                              <Icon size={21} />
                            </div>

                            <span className="text-sm font-semibold tracking-wider text-slate-500">
                              {item.number}
                            </span>
                          </div>

                          <h4 className="mt-5 text-lg font-semibold text-slate-900">
                            {item.title}
                          </h4>

                          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-500">
                            {item.description}
                          </p>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <p className="px-6 py-8 text-sm text-slate-500">
                    Detailed admission guidance has not been published for
                    this section yet. Please contact the school for assistance.
                  </p>
                )}

                {(admission.brochureUrl ||
                  admission.applicationFormUrl) && (
                  <div className="flex flex-wrap gap-3 border-t border-slate-200 px-5 py-5 md:px-7">
                    {admission.brochureUrl && (
                      <a
                        href={admission.brochureUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-blue-200 px-4 py-2.5 text-sm font-medium text-blue-800 transition hover:bg-blue-50"
                      >
                        <FileText size={16} />
                        Download Brochure
                      </a>
                    )}

                    {admission.applicationFormUrl && (
                      <a
                        href={admission.applicationFormUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2.5 text-sm font-medium text-blue-800 transition hover:bg-blue-50"
                      >
                        <FileText size={16} />
                        Application Form
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final call to action */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-8 md:p-12">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-md bg-blue-500/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-800">
              Start Your Journey
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Take the First Step Toward Your Future
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              Submit an admission enquiry and share your details with our
              school team. We will get in touch regarding your enquiry.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-7 inline-flex items-center gap-3 rounded-md bg-blue-800 hover:bg-blue-900 px-6 py-3 font-semibold transition hover:scale-105"
            >
              Start Admission Enquiry
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {showForm && (
        <AdmissionEnquiryForm onClose={() => setShowForm(false)} />
      )}
    </main>
  );
}

function AdmissionEnquiryForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    email: "",
    classApplyingFor: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/admissions/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to submit enquiry.");
      }

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit enquiry.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-slate-900/55 px-3 py-4  animate-[fadeIn_.2s_ease-out] sm:px-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="hide-scrollbar relative max-h-[85dvh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10 animate-[slideIn_.25s_ease-out] sm:p-6"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close admission enquiry form"
          className="absolute right-4 top-4 z-10 rounded-md border border-slate-200 bg-slate-50 p-2 text-slate-500 transition hover:bg-blue-50 hover:text-slate-900"
        >
          <X size={18} />
        </button>

        {!success ? (
          <>
            <p className="pr-10 text-xs font-semibold uppercase tracking-[0.25em] text-blue-800">
              Admission Enquiry
            </p>

            <h2 className="mt-2 pr-10 text-2xl font-bold text-slate-900 sm:text-3xl">
              Start Your Enquiry
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Share your details and our school team will contact you.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-5 grid gap-4 sm:grid-cols-2"
            >
              <Input
                label="Student Name"
                value={form.studentName}
                onChange={(value) => updateField("studentName", value)}
                required
              />

              <Input
                label="Parent Name"
                value={form.parentName}
                onChange={(value) => updateField("parentName", value)}
                required
              />

              <Input
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(value) => updateField("phone", value)}
                required
              />

              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) => updateField("email", value)}
                required
              />

              <div className="sm:col-span-2">
                <Input
                  label="Class Applying For"
                  value={form.classApplyingFor}
                  onChange={(value) =>
                    updateField("classApplyingFor", value)
                  }
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="admission-message"
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500"
                >
                  Message <span className="normal-case">(optional)</span>
                </label>

                <textarea
                  id="admission-message"
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  rows={3}
                  className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/10"
                  placeholder="Any questions for our school?"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 sm:col-span-2"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 rounded-md bg-blue-800 hover:bg-blue-900 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2"
              >
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Enquiry <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-md border border-emerald-200 bg-emerald-50">
              <CheckCircle2 size={36} className="text-emerald-700" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              Enquiry Submitted
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Thank you for your interest. The school will get in touch with
              you regarding your admission enquiry.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-md bg-blue-800 hover:bg-blue-900 px-7 py-2.5 text-sm font-semibold text-slate-900 transition hover:scale-105"
            >
              Close
            </button>
          </div>
        )}
      </div>
      <Footer />
      
      <style>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block min-w-0">
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
        {label}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-700 focus:ring-2 focus:ring-blue-700/10"
      />
    </label>
  );
}

export default Admissions;
