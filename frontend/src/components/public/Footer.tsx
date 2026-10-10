import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

function Footer(){
    return(
        <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Join our school community
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Learn about admission procedures or get in touch with us.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Admissions <ArrowRight size={15} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <Phone size={15} /> Contact us
            </Link>
          </div>
        </div>
      </section>

    );
}

export default Footer;