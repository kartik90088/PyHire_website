import { Clock, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { legalLinks, mainLinks, productLinks, resourceLinks } from "../data/navigation";

/* Footer in the PyCore family layout (shared with PyMedic): brand and contact
   on the left, divided link columns, legal row underneath.
   Newsletter signup removed 2026-08-26 (it stored nothing). Social icons are
   omitted until real profile URLs exist — add them to organizationSchema()'s
   `sameAs` at the same time. */

const columns = [
  { heading: "Product", links: productLinks },
  { heading: "Company", links: mainLinks },
  { heading: "Resources", links: resourceLinks },
];

const contact = [
  { icon: Mail, value: "support@veriright.com", href: "mailto:support@veriright.com" },
  { icon: Phone, value: "+91 9964667676", href: "tel:+919964667676" },
  { icon: Clock, value: "Mon–Sat, 9:30 AM – 7:00 PM IST" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-[#E7E3F6] font-inter">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.9fr_0.8fr] lg:gap-0 lg:divide-x divide-[#E7E3F6]">
          <div className="lg:pr-10">
            <img src="/pyhire-logo.webp" alt="PyHire" width={400} height={123} className="h-10 w-auto" loading="lazy" decoding="async" />
            <p className="mt-4 text-[15px] text-[#514D7A]">The AI-powered applicant tracking system</p>
            <h2 className="mt-8 font-display font-bold text-[16px] text-[#1B1650]">Contact Us</h2>
            <ul className="mt-4 space-y-3">
              {contact.map(({ icon: Icon, value, href }) => (
                <li key={value} className="flex items-center gap-3 text-[15px] text-[#1B1650]">
                  <span className="w-8 h-8 rounded-full bg-[#EEEAFE] text-[#5B21B6] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </span>
                  {href ? (
                    <a href={href} className="hover:text-[#5B21B6] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded">
                      {value}
                    </a>
                  ) : (
                    <span>{value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {columns.map(({ heading, links }) => (
            <nav key={heading} aria-label={heading} className="lg:px-10">
              <h2 className="font-display font-bold text-[16px] text-[#1B1650]">{heading}</h2>
              <ul className="mt-5 space-y-3.5">
                {links.map(({ path, label }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="text-[15px] text-[#514D7A] hover:text-[#1B1650] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[#E7E3F6] flex flex-col md:flex-row items-center justify-between gap-4 text-[14px]">
          <div className="flex items-center divide-x divide-[#E7E3F6]">
            {legalLinks.map(({ path, label }) => (
              <Link key={path} to={path} className="px-4 first:pl-0 text-[#1B1650] hover:text-[#5B21B6] transition-colors">
                {label}
              </Link>
            ))}
          </div>
          <p className="text-[#514D7A]">© 2026 PyHire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
