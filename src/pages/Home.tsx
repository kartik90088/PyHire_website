import {
  MCta, MFaq, MJourney, MMarquee, MModules, MOrbit, MProblem, MVideo, MWorkspaces,
} from "../components/medic/MSections";
import { MPlans, MTour } from "../components/medic/MHome2";
import { WhyChoose } from "../components/home/WhyChoose";
import { useSeo } from "../lib/useSeo";

/**
 * Home — PyCore family layout (section order and visual system as on
 * pymedic.com), with PyHire's logo colours and copy from the PyHire website
 * content document (14 October 2026). The earlier Equip-style sections in
 * components/home are kept but no longer rendered here.
 *
 * The top section is "The problem" (MProblem as the hero, 2026-11-02);
 * MHero is kept but no longer rendered.
 *
 * Still not rendered, per the document: customer logos and named customer
 * quotes / measured results ("to be supplied", "do not publish estimates").
 */
export function Home() {
  useSeo({
    title: "PyHire — AI Applicant Tracking System for Indian Teams",
    description:
      "Hire faster from one place: AI matching, interviews, offer letters, client and vendor management. Start a 15-day free trial.",
    canonicalPath: "/",
  });

  return (
    <main className="font-inter text-[#1B1650] bg-[#FBFAFF]">
      <MProblem />
      <MMarquee />
      <MJourney />
      <MModules />
      <MTour />
      <MWorkspaces />
      <WhyChoose />
      <MOrbit />
      <MPlans />
      <MFaq />
      <MVideo />
      <MCta />
    </main>
  );
}
