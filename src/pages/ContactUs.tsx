import React, { useEffect, useState } from 'react';
import { Phone, Mail, Clock, ArrowRight, CheckCircle2, Users, Headset, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSeo } from '../lib/useSeo';
import { absoluteUrl } from '../lib/site';

export function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Every "Book a Demo" and "Request Demo" control on the site routes here, so
     this is the highest-intent page in the funnel — it should not have been
     sharing the home page's title and description. */
  useSeo({
    title: 'Contact Us — Book a PyHire demo | PyHire',
    description:
      'Book a PyHire demo — AI recruitment software for agencies and HR teams. Call +91 9964667676 or email support@veriright.com, Mon–Sat 9:30 AM–7:00 PM IST.',
    canonicalPath: '/contact-us',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact PyHire',
        url: absoluteUrl('/contact-us'),
        mainEntity: {
          '@type': 'Organization',
          '@id': `${absoluteUrl('/')}#organization`,
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            telephone: '+91-9964667676',
            email: 'support@veriright.com',
            areaServed: 'IN',
            availableLanguage: 'en',
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '09:30',
              closes: '19:00',
            },
          },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Contact Us', item: absoluteUrl('/contact-us') },
        ],
      },
    ],
  });

  /* ------------------------------------------------------------------ */
  /* Lead capture                                                        */
  /*                                                                     */
  /* Posts to /api/contact, which nginx proxies to the pyhire-site-api   */
  /* service on 127.0.0.1:8060. That service is the only thing that      */
  /* knows the SMTP credentials — they must never reach the bundle.      */
  /* ------------------------------------------------------------------ */
  const EMPTY = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
  };

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  function update(field: keyof typeof EMPTY, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
    /* Clear a field's error as soon as the visitor starts fixing it — re-running
       the whole validation on every keystroke would flag fields they haven't
       reached yet. */
    setErrors((prev) => (prev[field] ? { ...prev, [field]: '' } : prev));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!form.firstName.trim()) next.firstName = 'Please enter your first name.';
    if (!form.email.trim()) next.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'Please enter a valid email address.';
    if (!form.message.trim()) next.message = 'Please tell us how we can help.';
    if (!form.consent) next.consent = 'Please agree to be contacted so we can reply.';
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      /* Move focus to the first problem so keyboard and screen-reader users are
         not left guessing why nothing was sent. */
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setStatus('submitting');
    setServerError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${response.status})`);
      }
      setStatus('success');
      setForm(EMPTY);
      /* The confirmation replaces the form in place. Someone who filled in a
         long message is scrolled near the submit button, so without this the
         top of the confirmation — the part that says we got it — is above the
         viewport and reads as "nothing happened". */
      requestAnimationFrame(() => {
        document.getElementById('contact-form-panel')?.scrollIntoView({ block: 'center' });
      });
    } catch (error) {
      setStatus('error');
      setServerError(error instanceof Error ? error.message : 'Something went wrong.');
    }
  }

  const fieldClass = (field: string) =>
    `w-full bg-white border ${
      errors[field] ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-violet-500 focus:ring-violet-100'
    } text-slate-900 text-[16px] sm:text-[15px] rounded-xl px-5 py-4 outline-none focus:ring-2 transition-all placeholder:text-slate-500`;

  return (
    <main className="pt-12 bg-[#FAFAFA] min-h-screen font-sans relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-50/60 via-[#FAFAFA]/0 to-[#FAFAFA]/0 pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="absolute top-20 left-10 opacity-40 z-0 hidden lg:block">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="5" r="2" fill="#6D28D9"/>
          <circle cx="20" cy="5" r="2" fill="#6D28D9"/>
          <circle cx="35" cy="5" r="2" fill="#6D28D9"/>
          <circle cx="5" cy="20" r="2" fill="#6D28D9"/>
          <circle cx="20" cy="20" r="2" fill="#6D28D9"/>
          <circle cx="35" cy="20" r="2" fill="#6D28D9"/>
          <circle cx="5" cy="35" r="2" fill="#6D28D9"/>
          <circle cx="20" cy="35" r="2" fill="#6D28D9"/>
          <circle cx="35" cy="35" r="2" fill="#6D28D9"/>
        </svg>
      </div>

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mt-8 mb-8">
          <div className="bg-violet-50 text-violet-600 font-bold text-[12px] px-4 py-1.5 rounded-full uppercase tracking-wide mb-6">
            CONTACT US
          </div>
          <h1 className="text-[3rem] lg:text-[4rem] font-bold text-[#111111] leading-tight tracking-tight mb-4">
            We're here to help you
          </h1>
          <p className="text-[1.125rem] text-[#4B5563] max-w-2xl">
            Have questions about PyHire? Our team is here to help you<br className="hidden sm:block" />
            find the right hiring solutions for your business.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div id="contact-form-panel" className="bg-white rounded-[24px] p-8 md:p-10 shadow-[0_4px_30px_rgb(0,0,0,0.03)] h-full scroll-mt-28">
              
              <div className="mb-8">
                <h2 className="text-[1.75rem] font-bold text-[#111111] mb-2">Send us a message</h2>
                <div className="w-12 h-1 bg-violet-500 rounded-full"></div>
              </div>

              {status === 'success' ? (
                <div
                  role="status"
                  className="rounded-[20px] border border-emerald-200 bg-emerald-50/60 p-8 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[1.35rem] font-bold text-[#111111] mb-2">Thanks &mdash; we've got your message.</h3>
                  <p className="text-[15px] text-slate-600 leading-relaxed max-w-md mx-auto">
                    A member of our team will get back to you within one working day.
                    For anything urgent, call{' '}
                    <a href="tel:+919964667676" className="font-bold text-[#6D28D9] hover:underline">
                      +91 9964667676
                    </a>{' '}
                    (Mon&ndash;Sat, 9:30&nbsp;AM&ndash;7:00&nbsp;PM IST).
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-[15px] font-bold text-[#6D28D9] hover:underline outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-busy={status === 'submitting'}>
                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-[14px] text-red-800 leading-relaxed">
                      We couldn't send your message{serverError ? ` (${serverError})` : ''}. Please try again, or
                      email us directly at{' '}
                      <a href="mailto:support@veriright.com" className="font-bold underline">
                        support@veriright.com
                      </a>
                      .
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="sr-only">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={(e) => update('firstName', e.target.value)}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                      className={fieldClass('firstName')}
                    />
                    {errors.firstName && (
                      <p id="firstName-error" role="alert" className="mt-2 text-[13px] text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="sr-only">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={(e) => update('lastName', e.target.value)}
                      className={fieldClass('lastName')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="sr-only">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={fieldClass('email')}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="mt-2 text-[13px] text-red-600">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">Phone (Optional)</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Phone (Optional)"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className={fieldClass('phone')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="sr-only">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    className={fieldClass('subject')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`${fieldClass('message')} resize-y`}
                  ></textarea>
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-2 text-[13px] text-red-600">{errors.message}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex items-center h-5">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => update('consent', e.target.checked)}
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? 'consent-error' : undefined}
                        className="w-5 h-5 shrink-0 border border-slate-300 rounded bg-white checked:bg-violet-500 checked:border-violet-500 focus:ring-violet-500 cursor-pointer"
                      />
                    </div>
                    <label htmlFor="consent" className="text-[14px] text-slate-600 leading-relaxed cursor-pointer select-none">
                      I agree to receive communications from PyHire about their products and services, and accept the{' '}
                      <Link to="/privacy-policy" className="font-bold text-[#6D28D9] hover:underline">Privacy Policy</Link>.
                    </label>
                  </div>
                  {errors.consent && (
                    <p id="consent-error" role="alert" className="mt-2 text-[13px] text-red-600">{errors.consent}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto px-8 py-4 bg-[#6D28D9] hover:bg-[#ea4a13] disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-xl font-bold text-[16px] transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_rgb(255,90,31,0.3)] hover:-translate-y-0.5 disabled:hover:translate-y-0 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2"
                  >
                    {status === 'submitting' ? (
                      <>Sending<Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /></>
                    ) : (
                      <>Send Message <ArrowRight className="w-5 h-5" aria-hidden="true" /></>
                    )}
                  </button>
                </div>
              </form>
              )}

            </div>
          </div>

          {/* Right Column: Info Cards */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            
            {/* Contact Informations Card */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_30px_rgb(0,0,0,0.03)]">
              <h3 className="text-[1.25rem] font-bold text-[#111111] mb-8">Contact Informations</h3>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 shrink-0 bg-violet-50 rounded-full flex items-center justify-center text-[#6D28D9]">
                    <Phone className="w-5 h-5" fill="currentColor" />
                  </div>
                  <div>
                    <div className="text-[13px] text-slate-500 mb-1">Call us on</div>
                    <a href="tel:+919964667676" className="inline-block py-2.5 -my-2.5 text-[16px] font-bold text-[#111111] hover:text-[#6D28D9] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded">+91 9964667676</a>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-slate-100"></div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 shrink-0 bg-violet-50 rounded-full flex items-center justify-center text-[#6D28D9]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[13px] text-slate-500 mb-1">Reach out</div>
                    <a href="mailto:support@veriright.com" className="inline-block py-2.5 -my-2.5 text-[16px] font-bold text-[#111111] hover:text-[#6D28D9] transition-colors break-all outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] rounded">support@veriright.com</a>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-slate-100"></div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 shrink-0 bg-violet-50 rounded-full flex items-center justify-center text-[#6D28D9]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[13px] text-slate-500 mb-1">Office Hours</div>
                    <div className="text-[16px] font-bold text-[#111111]">Mon–Sat 9:30 AM - 7:00 PM IST</div>
                  </div>
                </div>
              </div>
            </div>

            {/* About PyHire Card */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_30px_rgb(0,0,0,0.03)]">
              <h3 className="text-[1.25rem] font-bold text-[#111111] mb-2">About PyHire</h3>
              <div className="w-8 h-1 bg-violet-500 rounded-full mb-6"></div>
              
              <div className="flex gap-4 mb-6">
                <div className="w-14 h-14 shrink-0 bg-violet-50 rounded-full flex items-center justify-center text-[#6D28D9]">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  PyHire is an AI-powered interview platform that helps you screen, assess, and hire the best talent faster and smarter.
                </p>
              </div>

              <div className="flex flex-col gap-4 pl-1">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6D28D9] flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-[15px] font-semibold text-[#111111]">AI-Powered Interviews</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6D28D9] flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-[15px] font-semibold text-[#111111]">Smart Evaluation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6D28D9] flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-[15px] font-semibold text-[#111111]">Faster Hiring Decisions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#6D28D9] flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-[15px] font-semibold text-[#111111]">Better Candidate Experience</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_4px_30px_rgb(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-8 lg:gap-8 mb-8 lg:mb-6 relative overflow-hidden">
          
          {/* Decorative dots right */}
          <div className="absolute right-10 bottom-10 z-0 opacity-40">
             <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="5" r="2" fill="#6D28D9"/>
              <circle cx="20" cy="5" r="2" fill="#6D28D9"/>
              <circle cx="35" cy="5" r="2" fill="#6D28D9"/>
              <circle cx="5" cy="20" r="2" fill="#6D28D9"/>
              <circle cx="20" cy="20" r="2" fill="#6D28D9"/>
              <circle cx="35" cy="20" r="2" fill="#6D28D9"/>
              <circle cx="5" cy="35" r="2" fill="#6D28D9"/>
              <circle cx="20" cy="35" r="2" fill="#6D28D9"/>
              <circle cx="35" cy="35" r="2" fill="#6D28D9"/>
            </svg>
          </div>

          <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-violet-50 rounded-full scale-125 z-0"></div>
            <div className="absolute top-0 right-0 bg-white shadow-lg rounded-full px-4 py-2 flex gap-1 z-20">
               <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
               <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
               <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
            </div>
            <div className="relative z-10 text-slate-800">
               <Headset className="w-32 h-32 text-slate-800" strokeWidth={1} />
               {/* Decorative orange circles on headset */}
               <div className="absolute top-[45%] left-2 w-6 h-10 border-4 border-[#6D28D9] rounded-full z-20"></div>
               <div className="absolute top-[45%] right-2 w-6 h-10 border-4 border-[#6D28D9] rounded-full z-20"></div>
            </div>
          </div>

          <div className="flex flex-col relative z-10">
            <h2 className="text-[2rem] font-bold text-[#111111] mb-4 leading-tight">Have a project in mind? Let's talk</h2>
            <p className="text-[16px] text-[#4B5563] mb-8 max-w-lg leading-relaxed">
              Whether you have a question, need a demo, or want to discuss your hiring challenges — we'd love to hear from you.
            </p>
            
            {/* A <button> with no handler did nothing when clicked. The intent is
                plainly "call us", so it is a tel: link — which actually dials on
                mobile, where most of these taps happen. */}
            <a
              href="tel:+919964667676"
              className="self-start px-8 py-3.5 bg-[#6D28D9] hover:bg-[#ea4a13] text-white rounded-xl font-bold text-[16px] transition-all flex items-center gap-3 shadow-[0_4px_14px_rgb(255,90,31,0.3)] hover:-translate-y-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9] focus-visible:ring-offset-2"
            >
              <Phone className="w-5 h-5" fill="currentColor" aria-hidden="true" />
              +91 9964667676
            </a>
          </div>
          
        </div>

      </div>
    </main>
  );
}
