import React, { useState, useRef } from "react";
import { Search, Sparkles, Send, ChevronRight, HelpCircle, User, Users, UsersRound, Puzzle, Shield, Clock, GitBranch, CalendarDays } from "lucide-react";
import { FAQContact } from "./FAQContact";

/* Exported so Home can emit it as FAQPage structured data — the same nine
   answers the on-page search box serves, without duplicating the copy. */
export const knowledgeBase = [
  {
    id: "q1",
    question: "What is PyHire?",
    answer: "PyHire is an AI-powered Recruitment Operating System that helps recruitment agencies, staffing firms, and HR teams manage the complete hiring lifecycle—from job creation and candidate sourcing to interviews, offers, analytics, and hiring—all within one intelligent platform.",
    icon: <HelpCircle className="w-5 h-5" strokeWidth={2} />
  },
  {
    id: "q2",
    question: "How does AI candidate matching work?",
    answer: "PyHire uses AI to analyse job descriptions and candidate profiles, automatically matching applicants based on skills, experience, qualifications, and relevance, helping recruiters identify the best-fit candidates faster.",
    icon: <User className="w-5 h-5" strokeWidth={2} />
  },
  {
    id: "q3",
    question: "Does PyHire support staffing agencies?",
    answer: "Absolutely. PyHire includes client management, vendor management, recruiter collaboration, interview management, and advanced hiring analytics designed specifically for staffing agencies.",
    icon: <Users className="w-5 h-5" strokeWidth={2} />
  },
  {
    id: "q4",
    question: "Can I manage multiple recruiters and clients?",
    answer: "Yes. PyHire supports multi-user collaboration with role-based access, allowing recruitment teams to securely manage recruiters, hiring managers, clients, and recruitment workflows.",
    icon: <UsersRound className="w-5 h-5" strokeWidth={2} />
  },
  {
    id: "q5",
    question: "Does PyHire integrate with HR systems?",
    answer: "Yes. PyHire is designed to integrate with commonly used HR, recruitment, communication, and business applications.",
    icon: <Puzzle className="w-5 h-5" strokeWidth={2} />
  },
  {
    id: "q6",
    question: "Is my recruitment data secure?",
    answer: "Yes. PyHire uses enterprise-grade security, role-based access, audit trails, encrypted data storage, and compliance-ready workflows to protect recruitment and candidate information.",
    icon: <Shield className="w-5 h-5" strokeWidth={2} />
  },
  {
    id: "q7",
    question: "How long does implementation take?",
    answer: "Most organizations can get started quickly with assistance from our onboarding team, ensuring a smooth implementation process.",
    icon: <Clock className="w-5 h-5" strokeWidth={2} />
  },
  {
    id: "q8",
    question: "Can I customize hiring workflows?",
    answer: "Yes. PyHire offers customizable hiring workflows to match your exact recruitment process, from screening stages to offer management.",
    icon: <GitBranch className="w-5 h-5" strokeWidth={2} />
  },
  {
    id: "q9",
    question: "How do I book a demo?",
    answer: "Simply click Book a Demo anywhere on the website to schedule a personalised walkthrough of PyHire.",
    icon: <CalendarDays className="w-5 h-5" strokeWidth={2} />
  }
];

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAnswer, setActiveAnswer] = useState<{ question: string; answer: string } | null>(null);
  const [noMatch, setNoMatch] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const query = searchQuery.toLowerCase().trim();
    // Simple matching logic
    const match = knowledgeBase.find(q => 
      q.question.toLowerCase().includes(query) || 
      q.answer.toLowerCase().includes(query)
    );

    if (match) {
      setActiveAnswer({ question: match.question, answer: match.answer });
      setNoMatch(false);
      setTimeout(() => {
        answerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else {
      setActiveAnswer(null);
      setNoMatch(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleQuestionClick = (q: typeof knowledgeBase[0]) => {
    setSearchQuery(q.question);
    setActiveAnswer({ question: q.question, answer: q.answer });
    setNoMatch(false);
    setTimeout(() => {
      answerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  return (
    <section className="pt-10 lg:pt-10 relative overflow-hidden bg-white">
      {/* Premium Radial Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] sm:w-[120vw] lg:w-[100vw] max-w-[1600px] h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F5F9FF]/90 via-violet-50/40 to-white/0 pointer-events-none"></div>
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[600px] bg-[#F5F9FF]/80 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <h2 className="text-center text-[2.5rem] lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] tracking-tight mb-6 mt-8">
          Ask Anything About PyHire
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[1.125rem] text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8">
          Learn how PyHire automates recruitment, streamlines hiring workflows, improves recruiter productivity, and helps you hire top talent faster with AI.
        </p>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-6 relative">
          <div className="flex items-center bg-white rounded-full p-2 sm:p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 transition-shadow hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] focus-within:shadow-[0_12px_40px_rgb(249,115,22,0.15)] focus-within:border-violet-200">
            <div className="pl-4 pr-3 text-[#6D28D9]">
              <Search className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about PyHire (e.g. 'AI candidate matching', 'integrations')..." 
              className="flex-1 bg-transparent border-none outline-none text-slate-700 text-[16px] sm:text-[17px] placeholder:text-slate-400 min-w-0 py-2.5"
            />
            <button 
              onClick={handleSearch}
              className="hidden sm:flex items-center gap-2 bg-[#6D28D9] hover:bg-[#5B21B6] text-white px-7 py-3.5 rounded-full font-bold text-[15px] transition-colors shadow-sm ml-2"
            >
              Ask AI
              <Send className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <button 
              onClick={handleSearch}
              className="sm:hidden flex items-center justify-center bg-[#6D28D9] hover:bg-[#5B21B6] text-white w-12 h-12 rounded-full transition-colors shadow-sm ml-2 shrink-0"
            >
              <Send className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Answer Panel */}
        <div 
          className={`max-w-4xl mx-auto transition-all duration-300 ease-in-out ${activeAnswer || noMatch ? 'opacity-100 mb-8 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}
          ref={answerRef}
        >
          {noMatch ? (
            <div className="bg-white rounded-[24px] p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-[1.25rem] font-bold text-slate-900 mb-2">Sorry, I couldn't find an exact answer.</h3>
              <p className="text-slate-600 text-[15px]">Please try rephrasing your question or explore our suggested questions below.</p>
            </div>
          ) : activeAnswer ? (
            <div className="bg-white rounded-[24px] p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(249,115,22,0.1)] border border-violet-50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#6D28D9]"></div>
              
              {/* Question */}
              <div className="flex gap-4 mb-6 relative">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#F6F3FF] flex items-center justify-center text-[#6D28D9] shadow-sm">
                  <User className="w-5 h-5" strokeWidth={2} />
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-[17px] sm:text-[19px] text-slate-900 leading-snug">
                    {activeAnswer.question}
                  </h3>
                </div>
              </div>
              
              {/* Answer */}
              <div className="flex gap-4 relative">
                <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-[#6D28D9] to-[#5B21B6] flex items-center justify-center text-white shadow-md">
                  <Sparkles className="w-5 h-5" strokeWidth={2} />
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-slate-700 text-[15px] sm:text-[16px] leading-relaxed">
                    {activeAnswer.answer}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Suggested Questions */}
        <div className="max-w-5xl mx-auto">
          <div className="text-[12px] font-bold text-slate-500 tracking-wider uppercase mb-6 ml-2">
            Suggested Questions
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
            {knowledgeBase.map((q) => (
              <div 
                key={q.id} 
                onClick={() => handleQuestionClick(q)}
                className={`bg-white rounded-[20px] p-5 flex items-center gap-4 cursor-pointer shadow-[0_4px_20px_rgb(0,0,0,0.03)] border transition-all group hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgb(249,115,22,0.08)] ${activeAnswer?.question === q.question ? 'border-violet-200 bg-violet-50/30' : 'border-slate-50'}`}
              >
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#F5F9FF] flex items-center justify-center text-[#6D28D9]">
                  {q.icon}
                </div>
                <div className={`flex-1 text-[15px] font-bold leading-snug pr-2 transition-colors ${activeAnswer?.question === q.question ? 'text-[#6D28D9]' : 'text-slate-800 group-hover:text-[#6D28D9]'}`}>
                  {q.question}
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform ${activeAnswer?.question === q.question ? 'text-[#6D28D9] translate-x-1' : 'text-slate-300 group-hover:text-[#6D28D9] group-hover:translate-x-1'}`} strokeWidth={2.5} />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Embed the FAQContact section directly to inherit the background glow */}
      <div className="relative z-10 w-full mt-4">
        <FAQContact />
      </div>

    </section>
  );
}
