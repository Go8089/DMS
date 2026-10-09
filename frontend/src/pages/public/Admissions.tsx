import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  GraduationCap,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import PublicPageHero from "@/components/public/PublicPageHero";
import PublicCard from "@/components/public/PublicCard";
import { getAdmissionInfo, getGallery } from "@/api/public";
import { getHeroImages } from "@/components/public/PublicTheme";
import type { AdmissionInfo, GalleryItem } from "@/types/admin";

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
        setLoadError("Unable to load admission information. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const images = getHeroImages(gallery);
  const activeAdmission = admissions[0];

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#030817]">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-blue-400/20 border-t-sky-400" />
      </section>
    );
  }

  if (!activeAdmission) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#030817] px-6 text-center text-white">
        <div className="max-w-lg">
          <GraduationCap
            className="mx-auto mb-5 text-sky-400"
            size={48}
          />
          <h1 className="text-3xl font-bold">Admissions</h1>
          <p className="mt-4 leading-7 text-slate-400">
            {loadError ||
              "Admission information is currently unavailable."}
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-6 py-3 font-semibold"
          >
            Contact Our School
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030817] text-white">
      <PublicPageHero
        eyebrow="Admissions"
        title={activeAdmission.title}
        description={activeAdmission.description}
        images={images}
        animation="zoom"
        heightClass="min-h-[600px]"
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:scale-105"
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
              className="inline-flex items-center gap-3 rounded-full border border-blue-300/30 bg-[#081329]/70 px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-sky-400/60 hover:bg-blue-500/10"
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
              className="inline-flex items-center gap-3 rounded-full border border-violet-300/30 bg-[#081329]/70 px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-violet-400/60 hover:bg-violet-500/10"
            >
              <FileText size={18} />
              Application Form
            </a>
          )}
        </div>
      </PublicPageHero>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-300">
            Admission Guide
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Everything You Need to Know
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            Review the admission procedure, eligibility, required documents,
            important dates, and fee details before applying.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PublicCard
            title="Admission Procedure"
            description={activeAdmission.procedure || "Contact the school for details about the admission process."}
            eyebrow="01 · Application"
          />

          <PublicCard
            title="Eligibility"
            description={activeAdmission.eligibility || "Contact the school to confirm eligibility requirements."}
            eyebrow="02 · Requirements"
          />

          <PublicCard
            title="Required Documents"
            description={activeAdmission.requiredDocuments || "Contact the school for the required document checklist."}
            eyebrow="03 · Documentation"
          />

          <PublicCard
            title="Admission Dates"
            description={activeAdmission.admissionDates || "Contact the school for current admission dates."}
            eyebrow="04 · Important Dates"
          />

          <PublicCard
            title="Fee Details"
            description={activeAdmission.feeDetails || "Contact the school for current fee information."}
            eyebrow="05 · Fees"
          />

          <PublicCard
            title="Need Assistance?"
            description="Have questions about the admission process? Contact our school team for guidance."
            eyebrow="06 · Support"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-white"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </PublicCard>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-r from-[#081329] to-[#11103a] p-8 md:p-12">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">
              Start Your Journey
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Take the First Step Toward Your Future
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Submit an admission enquiry and share your details with our
              school team. We will get in touch regarding your enquiry.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-6 py-3 font-semibold transition hover:scale-105"
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
        err instanceof Error
          ? err.message
          : "Failed to submit enquiry.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-[#020617]/85 px-4 py-6 backdrop-blur-xl animate-[fadeIn_.25s_ease-out]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-blue-400/25 bg-[#071126] p-6 shadow-2xl shadow-blue-950/50 animate-[slideIn_.3s_ease-out] md:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close admission enquiry form"
          className="absolute right-5 top-5 rounded-full border border-blue-300/20 bg-white/5 p-2 text-slate-400 transition hover:bg-blue-500/20 hover:text-white"
        >
          <X size={20} />
        </button>

        {!success ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              Admission Enquiry
            </p>

            <h2 className="mt-3 pr-10 text-3xl font-bold text-white">
              Start Your Enquiry
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Fill in the details below and our school team can follow up
              with you.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-7 grid gap-5 md:grid-cols-2"
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

              <Input
                label="Class Applying For"
                value={form.classApplyingFor}
                onChange={(value) =>
                  updateField("classApplyingFor", value)
                }
                required
              />

              <div className="md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Message
                </label>

                <textarea
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  rows={4}
                  className="mt-2 w-full resize-y rounded-2xl border border-blue-300/20 bg-[#030817] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/10"
                  placeholder="Write your message..."
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-400/20 bg-red-950/30 px-4 py-3 text-sm text-red-300 md:col-span-2"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 md:col-span-2"
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
          <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
              <CheckCircle2 size={44} className="text-emerald-300" />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white">
              Enquiry Submitted
            </h2>

            <p className="mt-3 max-w-md leading-7 text-slate-400">
              Thank you for your interest. The school will get in touch with
              you regarding your admission enquiry.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-7 rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-7 py-3 font-semibold text-white transition hover:scale-105"
            >
              Close
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(18px); }
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
    <label>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-blue-300/20 bg-[#030817] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/10"
      />
    </label>
  );
}

export default Admissions;
