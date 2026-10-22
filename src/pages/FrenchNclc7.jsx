import React, { useRef } from "react";
import VoiceWave from "@/components/pages/french/VoiceWave";
import { ArrowRight, MessageCircle } from "lucide-react";
import { FRENCH } from "@/config/site";

// French NCLC 7 program page: "NCLC 7 in 7 Points".
// Immigration facts below were checked against IRCC's published
// TCF Canada equivalency chart; keep FRENCH.factsCheckedOn current.

const waLink = (msg) =>
  `https://wa.me/${FRENCH.whatsappE164}?text=${encodeURIComponent(msg)}`;

const ENQUIRY = `Hi The Cheat School, I'm interested in the French ${FRENCH.programName} program (NCLC 7). Please share the next batch details.`;

const tcfScores = [
  { skill: "Listening", fr: "Compréhension orale", score: "458 to 502", scale: "out of 699" },
  { skill: "Reading", fr: "Compréhension écrite", score: "453 to 498", scale: "out of 699" },
  { skill: "Speaking", fr: "Expression orale", score: "10 to 11", scale: "out of 20" },
  { skill: "Writing", fr: "Expression écrite", score: "10 to 11", scale: "out of 20" },
];

const points = [
  {
    n: 1,
    title: "NCLC 7 is Canada's French benchmark that counts",
    body: (
      <>
        <p>
          NCLC (Niveaux de compétence linguistique canadiens) is how Canada measures French. For
          Express Entry, NCLC 7 is the level that unlocks extra points. On the TCF Canada, these are
          the scores IRCC treats as NCLC 7:
        </p>
        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {tcfScores.map((s) => (
            <div key={s.skill} className="border border-black rounded-sm p-4 bg-background">
              <p className="font-primary text-lg font-bold">{s.skill}</p>
              <p className="text-xs text-muted-foreground mb-2">{s.fr}</p>
              <p className="font-primary text-2xl text-primary tabular-nums">{s.score}</p>
              <p className="text-xs text-muted-foreground">{s.scale}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    n: 2,
    title: "It can be worth up to 50 extra CRS points",
    body: (
      <p>
        Express Entry candidates with NCLC 7 in all four French skills can earn up to 50 additional
        CRS points (when their English is CLB 5 or higher), on top of points for a second official
        language. French speakers can also be invited through French language category draws,
        where 2026 cutoffs have fallen below 400.
      </p>
    ),
  },
  {
    n: 3,
    title: "All four skills, or it doesn't count",
    body: (
      <p>
        NCLC 7 has to be reached in listening, reading, speaking and writing. One weak skill cancels
        the bonus. So we track all four from the first week and put extra time where you are
        weakest, usually speaking and writing.
      </p>
    ),
  },
  {
    n: 4,
    title: "Live classes with a teacher, not an app",
    body: (
      <p>
        Apps help you collect words. They don't get you to NCLC 7. You learn in live, instructor
        led French classes on a fixed schedule, so you speak from day one and get corrected in
        real time.
      </p>
    ),
  },
  {
    n: 5,
    title: "Built around the TCF Canada",
    body: (
      <p>
        You practise the exact task types the TCF Canada uses. Listening and reading drills under
        time pressure, and speaking and writing tasks marked against the same 20 point scale the
        examiners use, so you know your level before test day.
      </p>
    ),
  },
  {
    n: 6,
    title: "Accountability, the Cheat School way",
    body: (
      <p>
        Most people quit French in month two. You get daily practice targets, regular speaking
        check ins and a coach who follows up when you go quiet. Same system we use in every
        Cheat School program: fixed deadlines, visible progress, nobody drifts.
      </p>
    ),
  },
  {
    n: 7,
    title: "One package, one goal",
    body: (
      <p>
        No tiers, no upsells. One program with one target: NCLC 7 in all four skills. Message us
        for fees and the next batch dates.
      </p>
    ),
  },
];

const FrenchNclc7 = () => {
  const heroRef = useRef(null);
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden bg-dark-grey text-foreground pt-36 pb-24 md:pt-44 md:pb-32 px-4 sm:px-6 border-b border-black">
        <VoiceWave hostRef={heroRef} />
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-foreground/60 font-secondary mb-4">
              French for Express Entry
            </p>
            <h1 className="font-primary font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none">
              NCLC <span className="text-primary">7</span> in 7 Points
            </h1>
            <p className="mt-6 text-lg md:text-xl text-foreground/80 font-secondary max-w-xl">
              Everything you need to know about reaching NCLC 7 in French, and how our{" "}
              {FRENCH.programName} gets you there.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={waLink(ENQUIRY)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 bg-primary text-white font-semibold font-secondary rounded-lg hover:bg-[#d63820] transition-colors inline-flex items-center gap-2">
                Ask About the Next Batch <ArrowRight className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={() => document.getElementById("point-1")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="px-7 py-4 border border-black text-foreground bg-background font-semibold font-secondary rounded-lg hover:-translate-y-0.5 transition-transform cursor-pointer">
                Read the 7 Points
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px bg-black border border-black rounded-sm overflow-hidden shadow-md">
            {[
              ["Up to 50", "extra CRS points"],
              ["4 of 4", "skills at NCLC 7"],
              ["Live", "instructor led classes"],
              [FRENCH.nextBatch || "Now", FRENCH.nextBatch ? "next batch" : "enrolling"],
            ].map(([big, small]) => (
              <div key={small} className="bg-background p-5">
                <p className="font-primary text-3xl font-bold">{big}</p>
                <p className="text-sm text-muted-foreground font-secondary">{small}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 7 points */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-background">
        <ol className="max-w-4xl mx-auto flex flex-col">
          {points.map((p) => (
            <li
              key={p.n}
              id={`point-${p.n}`}
              className="scroll-mt-32 grid grid-cols-[3.5rem_1fr] md:grid-cols-[6rem_1fr] gap-4 md:gap-8 py-10 border-b border-black/15 last:border-0">
              <span className="font-primary font-bold text-5xl md:text-7xl text-primary leading-none tabular-nums">
                {p.n}
              </span>
              <div className="min-w-0 font-secondary text-base md:text-lg text-foreground/80 leading-relaxed">
                <h2 className="font-primary font-bold text-2xl md:text-4xl text-foreground mb-3 leading-tight">
                  {p.title}
                </h2>
                {p.body}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-4xl mx-auto bg-primary text-white rounded-xl p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div>
            <h2 className="font-primary text-3xl md:text-4xl font-bold">Ready to start?</h2>
            <p className="font-secondary text-white/90 mt-2">
              Message us on WhatsApp. We'll check your current level and share the next batch dates.
            </p>
          </div>
          <a
            href={waLink(ENQUIRY)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-semibold font-secondary hover:bg-gray-50 transition-colors">
            <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-4 sm:px-6 pb-20">
        <p className="max-w-4xl mx-auto text-xs text-muted-foreground font-secondary leading-relaxed">
          The Cheat School is an independent training provider and is not affiliated with
          Immigration, Refugees and Citizenship Canada (IRCC) or the organisers of the TCF Canada.
          Score equivalencies and CRS points reflect IRCC's published rules as of{" "}
          {FRENCH.factsCheckedOn}; IRCC can change them at any time, and has consulted on the
          French bonus points in 2026. We do not guarantee any test score, invitation to apply or
          immigration outcome. Always confirm current rules on canada.ca.
        </p>
      </section>
    </div>
  );
};

export default FrenchNclc7;
