import { useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion, type Transition } from 'motion/react';
import { BarChart3, Check, Clock, Layers, Mail, MessageCircle, MessageSquareText, MessagesSquare, Phone, TrendingUp } from 'lucide-react';
import { DEMO_PATH } from '../../lib/routes';
import { Eyebrow, Initials, PrimaryButton, SectionHeading } from './shared';

/**
 * "Why teams choose PyHire" — copy verbatim from the PyHire website content
 * document, section 2. Each card carries a small looping illustration of its
 * point. Loops run only while the section is on screen; reduced-motion
 * visitors and the prerenderer get the settled final frame.
 */

/** Loop helper: keyframes repeat while `on`, otherwise jump to the last frame. */
function loop(on: boolean, duration: number, delay = 0, repeatDelay = 1.6): Transition {
  return on
    ? { duration, delay, repeat: Infinity, repeatDelay, ease: [0.22, 1, 0.36, 1] }
    : { duration: 0 };
}
const last = <T,>(frames: T[]) => frames[frames.length - 1];

/* 1 — Shortlists in minutes: match scores fill, best candidate first. */
function ShortlistViz({ on }: { on: boolean }) {
  const rows = [
    { name: 'Sarah Jenkis', score: 94 },
    { name: 'David Ross', score: 81 },
    { name: 'Priya N.', score: 67 },
  ];
  return (
    <div className="space-y-2">
      {rows.map((row, i) => {
        const width = ['0%', `${row.score}%`, `${row.score}%`];
        return (
          <div key={row.name} className="flex items-center gap-2">
            <Initials name={row.name} size="w-6 h-6 text-[9px]" shape="rounded-full" />
            <div className="flex-1 h-2 rounded-full bg-violet-100 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${i === 0 ? 'bg-[#6D28D9]' : 'bg-violet-300'}`}
                initial={false}
                animate={{ width: on ? width : last(width) }}
                transition={{ ...loop(on, 2.2, i * 0.25), times: [0, 0.45, 1] }}
              />
            </div>
            <span className={`w-9 text-right text-[11px] font-bold ${i === 0 ? 'text-violet-700' : 'text-slate-500'}`}>{row.score}%</span>
          </div>
        );
      })}
    </div>
  );
}

/* 2 — Every channel, one timeline: channels land on a single thread. */
function ChannelViz({ on }: { on: boolean }) {
  /* Channel colours match the hub's channel tiles. */
  const channels = [
    { Icon: Mail, tone: 'bg-[#EA4335]' },
    { Icon: MessageSquareText, tone: 'bg-[#6D28D9]' },
    { Icon: MessageCircle, tone: 'bg-[#25D366]' },
    { Icon: Phone, tone: 'bg-[#6D28D9]' },
  ];
  return (
    <div className="relative h-full flex items-center">
      <div className="absolute left-2 right-2 top-1/2 h-px bg-violet-200" />
      <div className="relative w-full flex justify-between px-1">
        {channels.map(({ Icon, tone }, i) => {
          const y = [-26, 0, 0];
          const opacity = [0, 1, 1];
          return (
            <motion.span
              key={i}
              className={`w-9 h-9 rounded-xl ${tone} text-white shadow-[0_6px_14px_-6px_rgba(17,17,17,0.4)] flex items-center justify-center`}
              initial={false}
              animate={{ y: on ? y : last(y), opacity: on ? opacity : last(opacity) }}
              transition={{ ...loop(on, 2.4, i * 0.3, 1.2), times: [0, 0.3, 1] }}
            >
              <Icon className="w-4 h-4" />
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

/* 3 — From requisition to joining day: progress runs through the stages. */
function PipelineViz({ on }: { on: boolean }) {
  const stages = ['Requisition', 'Interview', 'Offer', 'Joined'];
  const fill = ['0%', '100%', '100%'];
  return (
    <div className="relative pt-3">
      <div className="absolute left-[12.5%] right-[12.5%] top-[22px] h-1 rounded-full bg-violet-100 overflow-hidden">
        <motion.div
          className="h-full bg-[#6D28D9] rounded-full"
          initial={false}
          animate={{ width: on ? fill : last(fill) }}
          transition={{ ...loop(on, 3, 0, 1.4), times: [0, 0.7, 1], ease: 'linear' }}
        />
      </div>
      <div className="relative grid grid-cols-4">
        {stages.map((stage, i) => {
          const bg = ['#ffffff', '#ffffff', '#6D28D9', '#6D28D9'];
          const at = (i / (stages.length - 1)) * 0.7;
          return (
            <div key={stage} className="flex flex-col items-center gap-2">
              <motion.span
                className="w-5 h-5 rounded-full border-2 border-[#6D28D9] flex items-center justify-center text-white"
                initial={false}
                animate={{ backgroundColor: on ? bg : last(bg) }}
                transition={{ ...loop(on, 3, 0, 1.4), times: [0, Math.max(at - 0.01, 0), at, 1], ease: 'linear' }}
              >
                <Check className="w-3 h-3" strokeWidth={3} />
              </motion.span>
              <span className="text-[10px] font-semibold text-slate-600">{stage}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 4 — Numbers you can act on: a live bar chart with the latest bar highlighted. */
function ChartViz({ on }: { on: boolean }) {
  const bars = [38, 52, 44, 63, 58, 82];
  return (
    <div className="relative h-full flex items-end gap-1.5 px-1">
      {bars.map((h, i) => {
        const height = ['8%', `${h}%`, `${h}%`];
        const latest = i === bars.length - 1;
        return (
          <motion.span
            key={i}
            className={`flex-1 rounded-t-md ${latest ? 'bg-[#6D28D9]' : 'bg-violet-200'}`}
            initial={false}
            animate={{ height: on ? height : last(height) }}
            transition={{ ...loop(on, 2.2, i * 0.12), times: [0, 0.5, 1] }}
          />
        );
      })}
      <motion.span
        className="absolute right-0 -top-1 inline-flex items-center gap-1 rounded-full bg-white border border-violet-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 shadow-sm"
        initial={false}
        animate={{ opacity: on ? [0, 0, 1, 1] : 1, y: on ? [6, 6, 0, 0] : 0 }}
        transition={{ ...loop(on, 2.2, 0.8), times: [0, 0.5, 0.65, 1] }}
      >
        <TrendingUp className="w-3 h-3" /> On track
      </motion.span>
    </div>
  );
}

const reasons: { title: string; desc: string; icon: typeof Clock; viz: (on: boolean) => ReactNode }[] = [
  {
    title: 'Shortlists in minutes.',
    desc: 'Upload CVs in bulk and PyHire reads them, matches every candidate against your open roles and shows a score with the skills that match and the ones that are missing.',
    icon: Clock,
    viz: (on) => <ShortlistViz on={on} />,
  },
  {
    title: 'Every channel, one timeline.',
    desc: 'Email, SMS, WhatsApp and calls are sent and logged in one place, so anyone can pick up a candidate where a colleague left off.',
    icon: MessagesSquare,
    viz: (on) => <ChannelViz on={on} />,
  },
  {
    title: 'From requisition to joining day.',
    desc: 'Approvals, interviews, evaluation forms, offer letters, documents and joining checks follow one pipeline — nothing is tracked on the side.',
    icon: Layers,
    viz: (on) => <PipelineViz on={on} />,
  },
  {
    title: 'Numbers you can act on.',
    desc: 'Live dashboards show where each role stands, which recruiter or vendor is delivering, and what will slip next week.',
    icon: BarChart3,
    viz: (on) => <ChartViz on={on} />,
  },
];

export function WhyChoose() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const on = inView && !reduce && typeof navigator !== 'undefined' && !navigator.webdriver;

  return (
    <section className="relative bg-white py-12 lg:py-16 overflow-hidden">

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>Why PyHire</Eyebrow>
            <SectionHeading className="mt-4">Why teams choose PyHire</SectionHeading>
          </div>
          <PrimaryButton to={DEMO_PATH} className="self-start md:self-auto">Book a demo</PrimaryButton>
        </div>

        <ul ref={ref} className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map(({ title, desc, icon: Icon, viz }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-[32px] bg-[#EAE5FF] p-6 flex flex-col hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(91,33,182,0.45)] transition-all duration-300"
            >
              <div aria-hidden="true" className="relative h-[136px] rounded-[22px] bg-white/60 border border-white px-4 pb-3 pt-7">
                <span className="absolute -top-3 -left-3 w-10 h-10 rounded-2xl bg-white text-[#5B21B6] shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
                  <Icon className="w-5 h-5" />
                </span>
                <div className="h-full flex flex-col justify-center">{viz(on)}</div>
              </div>
              <h3 className="mt-6 font-display font-bold text-[1.5rem] leading-[1.15] tracking-[-0.02em] text-[#1B1650]">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#514D7A]">{desc}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
