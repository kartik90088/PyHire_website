import type { ReactNode } from 'react';
import { AlertTriangle, Clock, FileSpreadsheet, FileText, Folder, Mail, Mic, MicOff, Paperclip, Phone, PhoneOff, Search, Star, UserX } from 'lucide-react';
import { Initials } from '../home/shared';

/**
 * Six scenes for the home hero's problem cards (content document §2), one per
 * card: each shows the problem as it looks today. Names, files and figures
 * are illustrative. Decorative — the card text carries the meaning.
 */

function Frame({ title, icon, children, tone = 'bg-white' }: { title: string; icon: ReactNode; children: ReactNode; tone?: string }) {
  return (
    <div className={`h-full w-full rounded-[18px] ${tone} border border-[#E7E3F6] shadow-[0_24px_50px_-26px_rgba(27,22,80,0.45)] overflow-hidden flex flex-col`}>
      <div className="flex items-center gap-2 px-4 h-10 border-b border-[#E7E3F6] bg-[#F8F6FD] text-[12px] font-semibold text-[#514D7A]">
        <span className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-[#D6D1EA]" /><span className="w-2 h-2 rounded-full bg-[#D6D1EA]" /><span className="w-2 h-2 rounded-full bg-[#D6D1EA]" />
        </span>
        <span className="ml-2 flex items-center gap-1.5">{icon}{title}</span>
      </div>
      <div className="flex-1 min-h-0 p-4">{children}</div>
    </div>
  );
}

function EmailScene() {
  const mails = [
    ['Hiring manager', 'RE: RE: JD — Senior React Dev (final v3)', '9:42'],
    ['HR team', 'Updated JD attached, please use this one', 'Yesterday'],
    ['Client · Acme', 'Fwd: Product Manager JD + salary band', 'Mon'],
  ];
  return (
    <Frame title="Inbox · 1,284 unread" icon={<Mail className="w-3.5 h-3.5" />}>
      <div className="flex items-center gap-2 rounded-lg bg-[#F8F6FD] px-3 py-2 text-[12px] text-[#A39EC6]"><Search className="w-3.5 h-3.5" /> Search “JD”… 37 results</div>
      <ul className="mt-3 space-y-2">
        {mails.map(([from, subj, t], i) => (
          <li key={subj} className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${i === 0 ? 'border-[#C4B5FD] bg-[#F3F0FF]' : 'border-[#E7E3F6]'}`}>
            <span className="w-2 h-2 rounded-full bg-[#6D28D9] shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-bold text-[#1B1650]">{from}</p>
              <p className="text-[12px] text-[#514D7A] truncate flex items-center gap-1"><Paperclip className="w-3 h-3 shrink-0" />{subj}</p>
            </div>
            <span className="text-[11px] text-[#A39EC6]">{t}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function DriveScene() {
  const files = ['CV_Rahul.pdf', 'resume (2).pdf', 'CV_final.docx', 'Priya_CV.pdf', 'scan0041.pdf', 'resume (3).pdf'];
  return (
    <Frame title="Shared drive › Hiring › CVs › Old › 2026" icon={<Folder className="w-3.5 h-3.5" />}>
      <div className="flex items-center justify-between text-[12px]"><span className="font-bold text-[#1B1650]">CVs</span><span className="rounded-full bg-amber-50 text-amber-700 px-2 py-0.5 font-semibold">2,431 files · 412 duplicates</span></div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {files.map((f, i) => (
          <div key={f} className="rounded-xl border border-[#E7E3F6] bg-white p-2.5" style={{ transform: `rotate(${(i % 3) - 1}deg)` }}>
            <FileText className={`w-6 h-6 ${f.endsWith('docx') ? 'text-[#6D28D9]' : 'text-[#EA4335]'}`} />
            <p className="mt-1.5 text-[11px] text-[#514D7A] truncate">{f}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function PhoneScene() {
  return (
    <div className="h-full w-full flex items-center justify-center gap-6">
      <div className="w-[190px] h-[290px] rounded-[30px] border-[7px] border-[#1B1650] bg-gradient-to-b from-[#33238A] to-[#1B1650] text-white p-4 flex flex-col items-center shadow-[0_24px_50px_-20px_rgba(27,22,80,0.6)]">
        <span className="h-1.5 w-12 rounded-full bg-white/25" />
        <p className="mt-5 text-[11px] text-white/60">Personal mobile · incoming</p>
        <Initials name="David Ross" size="w-16 h-16 text-[14px]" shape="rounded-full" />
        <p className="mt-2 font-display font-bold text-[15px]">David Ross</p>
        <p className="text-[11px] text-white/60">Candidate · not saved</p>
        <div className="mt-auto flex gap-8">
          <span className="w-11 h-11 rounded-full bg-red-500 flex items-center justify-center"><PhoneOff className="w-5 h-5" /></span>
          <span className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center"><Phone className="w-5 h-5" /></span>
        </div>
      </div>
      <div className="space-y-2.5 w-[170px]">
        {[['No recording', MicOff], ['No notes on record', FileText], ['Gone when they leave', UserX]].map(([t, Icon]) => {
          const I = Icon as typeof Mic;
          return (
            <div key={t as string} className="flex items-center gap-2 rounded-xl bg-white border border-[#E7E3F6] px-3 py-2 text-[12px] font-semibold text-[#1B1650] shadow-sm">
              <I className="w-4 h-4 text-[#5B21B6]" /> {t as string}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WhatsAppScene() {
  const msgs: [string, boolean, string][] = [
    ['Round 2 with Sarah went well 👍', false, '6:12 PM'],
    ['Which Sarah? The designer or PM?', true, '6:30 PM'],
    ['Designer. Send offer?', false, '9:03 PM'],
    ['Wait, what was the score from round 1?', true, '9:15 PM'],
  ];
  return (
    <div className="h-full w-full rounded-[18px] border border-[#E7E3F6] overflow-hidden flex flex-col shadow-[0_24px_50px_-26px_rgba(27,22,80,0.45)]">
      <div className="flex items-center gap-3 px-4 h-12 bg-[#075E54] text-white">
        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-bold">IP</span>
        <span className="leading-tight"><span className="block text-[13px] font-semibold">Interview panel 🔥</span><span className="block text-[10px] text-white/70">7 participants</span></span>
      </div>
      <div className="flex-1 p-4 space-y-2 bg-[#ECE5DD]">
        {msgs.map(([t, me, time]) => (
          <div key={t} className={`max-w-[78%] rounded-xl px-3 py-1.5 text-[12px] shadow-sm ${me ? 'ml-auto bg-[#DCF8C6]' : 'bg-white'}`}>
            {t}<span className="ml-2 text-[9px] text-black/40">{time}</span>
          </div>
        ))}
        <div className="mx-auto w-fit rounded-full bg-white/80 px-3 py-1 text-[10px] text-[#514D7A]">Feedback never reaches the candidate record</div>
      </div>
    </div>
  );
}

function ReportScene() {
  const rows = [['Senior React Dev', '12', 'Interview', '?'], ['Product Manager', '4', 'Offer', '?'], ['Sales Executive', '31', 'Screening', '?'], ['UX Researcher', '7', '—', '?']];
  return (
    <Frame title="Hiring_status_WEEKLY_v14.xlsx" icon={<FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />}>
      <div className="relative">
        <table className="w-full text-[11px]">
          <thead><tr className="bg-emerald-50 text-emerald-800">{['Role', 'Candidates', 'Stage', 'Updated'].map((h) => <th key={h} className="text-left font-semibold px-2 py-1.5 border border-[#E7E3F6]">{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} className="px-2 py-1.5 border border-[#E7E3F6] text-[#514D7A]">{c}</td>)}</tr>)}</tbody>
        </table>
        <div className="absolute right-4 top-12 rotate-[-10deg] rounded-xl border-2 border-red-500 px-3 py-1.5 text-red-600 font-display font-extrabold text-[15px] bg-white/80">OUT OF DATE</div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[12px] text-[#514D7A]"><Clock className="w-3.5 h-3.5" /> Last edited 9 days ago · sent to 6 people</p>
    </Frame>
  );
}

function SlipScene() {
  return (
    <Frame title="Candidate · Priya N." icon={<UserX className="w-3.5 h-3.5" />}>
      <div className="flex items-center gap-3">
        <Initials name="Priya N." size="w-14 h-14 text-[13px]" shape="rounded-full" />
        <div>
          <p className="font-display font-bold text-[16px] text-[#1B1650]">Priya N.</p>
          <p className="text-[12px] text-[#514D7A]">Frontend Engineer · 6 yrs</p>
          <p className="mt-1 flex gap-0.5">{[0, 1, 2, 3, 4].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</p>
        </div>
        <span className="ml-auto rounded-full bg-violet-50 text-violet-700 px-2 py-0.5 text-[11px] font-bold">91% match</span>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-100 px-3 py-2 text-[12px] text-amber-800"><AlertTriangle className="w-4 h-4" /> No follow-up for 14 days</div>
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-3 py-2 text-[12px] text-red-700"><UserX className="w-4 h-4" /> Accepted another offer</div>
      </div>
    </Frame>
  );
}

const SCENES = [EmailScene, DriveScene, PhoneScene, WhatsAppScene, ReportScene, SlipScene];

export function ProblemScene({ index }: { index: number }) {
  const Scene = SCENES[index % SCENES.length];
  return <Scene />;
}
