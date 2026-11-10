import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import {
  BellRing, Briefcase, CalendarCheck, CheckCircle2, FileText, Globe, Handshake, Mail, MessageCircle, Phone,
  PhoneCall, ScanSearch, Send, Sparkles, Target, Upload, Users, Copy,
} from 'lucide-react';
import { Initials, useIsDesktop } from './shared';

/**
 * "Everything flows into one place" — a hub in the style of spott.io:
 * candidate events arrive from the left along dotted lines, PyHire sits in
 * the centre, and the results leave to the right. Small dots travel the lines
 * (SVG animateMotion) and the event cards swap every few seconds.
 *
 * Every event is a capability from the PyHire website content document;
 * names, roles and numbers are illustrative sample data, as in the other
 * product mockups. Decorative: the whole figure is aria-hidden.
 */

interface HubEvent {
  icon: ReactNode;
  title: string;
  detail: string;
  person?: string;
  badge?: { text: string; tone: 'orange' | 'green' };
}

const ic = (Icon: typeof Mail) => <Icon className="w-4 h-4" />;

/* Inputs — left side. Three slots, each cycling through its own events. */
const INPUTS: HubEvent[][] = [
  [
    { icon: ic(Globe), title: 'New application', detail: 'Careers page', person: 'Sarah Jenkis' },
    { icon: ic(Briefcase), title: 'Requisition approved', detail: 'Senior React Developer · 2 openings', person: 'Arjun M.' },
  ],
  [
    { icon: ic(Upload), title: 'Bulk upload', detail: '240 CVs · PDF & Word' },
    { icon: ic(MessageCircle), title: 'WhatsApp reply', detail: '“Yes, I’m interested”', person: 'David Ross' },
  ],
  [
    { icon: ic(Handshake), title: 'Vendor submission', detail: '6 candidates for Product Manager' },
    { icon: ic(Mail), title: 'Inbound email', detail: 'CV attached', person: 'Priya N.' },
  ],
];

/* Outputs — right side. */
const OUTPUTS: HubEvent[][] = [
  [
    { icon: ic(CalendarCheck), title: 'Interview scheduled', detail: 'Thu 2:00 PM · panel of 2', person: 'David Ross', badge: { text: 'Reminders set', tone: 'green' } },
    { icon: ic(Sparkles), title: 'Daily AI insight', detail: 'Forecast fill date · Product Manager', badge: { text: '7:00 AM', tone: 'orange' } },
  ],
  [
    { icon: ic(Target), title: 'Match found', detail: 'Senior React Developer', person: 'Sarah Jenkis', badge: { text: '94% match', tone: 'orange' } },
    { icon: ic(CheckCircle2), title: 'Offer accepted', detail: 'Accepted online · joining checks started', person: 'Arjun M.', badge: { text: 'Done', tone: 'green' } },
  ],
  [
    { icon: ic(BellRing), title: 'Follow-up sent', detail: '3 days idle → automatic nudge', person: 'Priya N.', badge: { text: 'Workflow', tone: 'green' } },
    { icon: ic(Send), title: 'Campaign sent', detail: '48 candidates · “I’m interested” links', badge: { text: 'Live', tone: 'orange' } },
  ],
];

/* Small chips beside the hub — what happens in between. */
const CHIPS = [
  [{ icon: ic(ScanSearch), text: 'CV parsed' }, { icon: ic(Copy), text: 'Duplicate caught' }],
  [{ icon: ic(Send), text: 'Email sent' }, { icon: ic(PhoneCall), text: 'Call logged' }],
];

/* Geometry (SVG viewBox 1200 × 560, centre at 600,280). */
const C = { x: 600, y: 280 };
const LEFT_PATHS = [
  'M 120 110 C 330 110, 430 190, 560 262',
  'M 60 280 C 260 270, 420 278, 556 280',
  'M 120 470 C 320 470, 440 380, 562 300',
  'M 250 40 C 380 90, 470 170, 572 250',
  'M 250 525 C 380 480, 480 400, 574 312',
];
const RIGHT_PATHS = [
  'M 640 262 C 760 190, 860 120, 1060 110',
  'M 644 280 C 780 282, 900 282, 1120 280',
  'M 638 300 C 760 380, 880 470, 1060 470',
];
/* Channel tiles at the far left — the channels the content document names
   (email, calls, WhatsApp, SMS) plus documents and team, in channel colours. */
const SIDE_ICONS = [
  { icon: Mail, x: 6, y: 16, tone: 'bg-[#EA4335] text-white' },
  { icon: Phone, x: 2, y: 47, tone: 'bg-[#6D28D9] text-white' },
  { icon: MessageCircle, x: 8, y: 80, tone: 'bg-[#25D366] text-white' },
  { icon: FileText, x: 20, y: 4, tone: 'bg-white text-slate-500 border border-black/5' },
  { icon: Users, x: 4, y: 96, tone: 'bg-white text-slate-500 border border-black/5' },
];

function useTicker(ms: number, enabled: boolean) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [ms, enabled]);
  return tick;
}

function EventCard({ event }: { event: HubEvent }) {
  return (
    <div className="inline-flex flex-col gap-1 rounded-2xl bg-white border border-black/[0.06] px-4 py-3 shadow-[0_12px_30px_-14px_rgba(17,17,17,0.25)] max-w-[calc(100vw-2rem)] sm:max-w-none sm:whitespace-nowrap">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-semibold text-[#1B1650]">
        <span className="text-[#6D28D9]">{event.icon}</span>
        {event.title}
        {event.person && (
          <span className="flex items-center gap-1.5 font-normal text-slate-500">
            <span className="text-slate-300">·</span>
            <Initials name={event.person} size="w-6 h-6 text-[9px]" shape="rounded-full" />
            {event.person}
          </span>
        )}
        {event.badge && (
          <span
            className={`ml-1 rounded-full px-2 py-0.5 text-[12px] font-semibold ${
              event.badge.tone === 'orange' ? 'bg-violet-50 text-violet-700' : 'bg-emerald-50 text-emerald-700'
            }`}
          >
            {event.badge.text}
          </span>
        )}
      </div>
      <div className="text-[13px] text-slate-500">{event.detail}</div>
    </div>
  );
}

/** One slot that swaps between its events. */
function Slot({ events, tick, offset, className }: { events: HubEvent[]; tick: number; offset: number; className: string }) {
  const index = Math.floor((tick + offset) / 2) % events.length;
  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <EventCard event={events[index]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Chip({ items, tick, className }: { items: { icon: ReactNode; text: string }[]; tick: number; className: string }) {
  const item = items[tick % items.length];
  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={item.text}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-white border border-black/[0.06] px-3 py-1.5 text-[12px] font-medium text-slate-600 shadow-sm whitespace-nowrap"
        >
          <span className="text-[#6D28D9] [&_svg]:w-3.5 [&_svg]:h-3.5">{item.icon}</span>
          {item.text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function HubMark({ pulse }: { pulse: boolean }) {
  return (
    <div className="relative">
      {pulse && (
        <motion.span
          className="absolute inset-0 rounded-[28px] border border-violet-300"
          animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <div className="relative w-[112px] h-[112px] rounded-[28px] bg-white border border-black/[0.06] shadow-[0_18px_40px_-16px_rgba(17,17,17,0.3)] flex items-center justify-center">
        <img src="/pyhire-mark.png" alt="" className="w-14 h-14 object-contain" />
      </div>
    </div>
  );
}

function DesktopHub({ animate }: { animate: boolean }) {
  const tick = useTicker(1700, animate);

  return (
    <div className="relative h-[560px] w-full max-w-[1200px] mx-auto">
      {/* Rings and glow — faded at the edges so the outer rings dissolve rather than clip */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]">
        <div className="absolute w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(109,40,217,0.10),transparent_65%)]" />
        {[220, 340, 470, 620, 780].map((d) => (
          <div key={d} className="absolute rounded-full border border-slate-200/70" style={{ width: d, height: d }} />
        ))}
      </div>

      {/* Lines and travelling dots */}
      <svg viewBox="0 0 1200 560" className="absolute inset-0 w-full h-full" fill="none">
        <defs>
          <linearGradient id="hub-in" x1="0" x2="1">
            <stop offset="0" stopColor="#cbd5e1" stopOpacity="0.4" />
            <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="hub-out" x1="0" x2="1">
            <stop offset="0" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="1" stopColor="#cbd5e1" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {LEFT_PATHS.map((d, i) => (
          <path key={`l${i}`} id={`hub-l${i}`} d={d} stroke="url(#hub-in)" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
        ))}
        {RIGHT_PATHS.map((d, i) => (
          <path key={`r${i}`} id={`hub-r${i}`} d={d} stroke="url(#hub-out)" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
        ))}
        {animate &&
          [...LEFT_PATHS.map((_, i) => `hub-l${i}`), ...RIGHT_PATHS.map((_, i) => `hub-r${i}`)].map((id, i) => (
            <circle key={id} r="3.5" fill="#6D28D9">
              <animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} begin={`${(i * 0.45) % 2.4}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath href={`#${id}`} />
              </animateMotion>
            </circle>
          ))}
      </svg>

      {/* Faint channel icons at the far left */}
      {SIDE_ICONS.map(({ icon: Icon, x, y, tone }, i) => (
        <span
          key={i}
          className={`absolute w-12 h-12 rounded-2xl flex items-center justify-center shadow-[0_10px_24px_-12px_rgba(17,17,17,0.35)] ${tone} ${i < 3 ? '' : 'opacity-70'}`}
          style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <Icon className="w-5 h-5" />
        </span>
      ))}

      {/* Centre */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <HubMark pulse={animate} />
      </div>
      <Chip items={CHIPS[0]} tick={tick} className="absolute left-[56%] top-[56%]" />
      <Chip items={CHIPS[1]} tick={tick + 1} className="absolute left-[60%] top-[32%]" />

      {/* Event cards */}
      <Slot events={INPUTS[0]} tick={tick} offset={0} className="absolute left-[12%] top-[10%]" />
      <Slot events={INPUTS[1]} tick={tick} offset={1} className="absolute left-[4%] top-[43%]" />
      <Slot events={INPUTS[2]} tick={tick} offset={2} className="absolute left-[14%] top-[76%]" />
      <Slot events={OUTPUTS[0]} tick={tick} offset={1} className="absolute right-[3%] top-[10%]" />
      <Slot events={OUTPUTS[1]} tick={tick} offset={0} className="absolute right-[0%] top-[43%]" />
      <Slot events={OUTPUTS[2]} tick={tick} offset={2} className="absolute right-[3%] top-[76%]" />
    </div>
  );
}

/** Phones and tablets: one input, the hub, one output, stacked. */
function CompactHub({ animate }: { animate: boolean }) {
  const tick = useTicker(1700, animate);
  const line = (
    <div className="relative h-14 w-px border-l-2 border-dashed border-violet-200">
      {animate && (
        <motion.span
          className="absolute -left-[5px] w-2 h-2 rounded-full bg-[#6D28D9]"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  );
  return (
    <div className="relative flex flex-col items-center py-4">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[200, 300, 400].map((d) => (
          <div key={d} className="absolute rounded-full border border-slate-200/70" style={{ width: d, height: d }} />
        ))}
      </div>
      <div className="relative h-[72px] flex items-end">
        <Slot events={INPUTS.flat()} tick={tick} offset={0} className="relative" />
      </div>
      {line}
      <HubMark pulse={animate} />
      {line}
      <div className="relative h-[72px]">
        <Slot events={OUTPUTS.flat()} tick={tick} offset={1} className="relative" />
      </div>
    </div>
  );
}

export function HubFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  /* Stable snapshot for the prerenderer; still for reduced motion; paused off-screen. */
  const animate = inView && !reduce && typeof navigator !== 'undefined' && !navigator.webdriver;

  return (
    <section className="bg-white py-6 lg:py-8 overflow-hidden">
      <div ref={ref} aria-hidden="true" className="px-4">
        {isDesktop ? <DesktopHub animate={animate} /> : <CompactHub animate={animate} />}
      </div>
    </section>
  );
}
