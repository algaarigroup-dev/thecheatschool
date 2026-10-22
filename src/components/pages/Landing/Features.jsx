import React from "react";
import { X, Check } from "lucide-react";

// Homepage section: how The Cheat School differs from a typical course.
// Every point here is backed by how the programs actually run
// (see the course pages for the schedule and deliverables).
const rows = [
  {
    topic: "How you learn",
    typical: "Recorded lectures you watch alone",
    ours: "Live classes, then you apply it the same week on a real project",
  },
  {
    topic: "What you finish with",
    typical: "A certificate",
    ours: "A portfolio of project deliverables and internship documentation",
  },
  {
    topic: "Proof of skill",
    typical: "Nothing anyone can see",
    ours: "Weekly LinkedIn posts and video updates that build a public track record",
  },
  {
    topic: "Accountability",
    typical: "Finish whenever, or never",
    ours: "Daily reflection videos, weekly coach feedback and fixed deadlines",
  },
  {
    topic: "Communication skills",
    typical: "Assumed, not taught",
    ours: "1:1 coaching, mock client meetings, CV and interview prep",
  },
  {
    topic: "Certificate",
    typical: "Given for attending",
    ours: "Earned only when every deliverable is submitted",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-primary">
            A TYPICAL COURSE <span className="text-primary">VS</span> THE CHEAT SCHOOL
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-secondary">
            College teaches you the theory. Online courses teach it again. We make
            you use it, show it and explain it.
          </p>
        </div>

        {/* Desktop: three column comparison */}
        <div className="hidden md:block border border-black rounded-sm overflow-hidden shadow-md">
          <div className="grid grid-cols-[1fr_1.2fr_1.6fr] bg-black text-white font-primary text-lg">
            <div className="px-6 py-4"></div>
            <div className="px-6 py-4 text-white/60">Typical course</div>
            <div className="px-6 py-4 bg-primary">The Cheat School</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.topic}
              className={`grid grid-cols-[1fr_1.2fr_1.6fr] font-secondary ${i % 2 ? "bg-dark-grey" : "bg-background"}`}>
              <div className="px-6 py-5 font-primary text-lg font-bold">{r.topic}</div>
              <div className="px-6 py-5 text-muted-foreground flex gap-3 items-start">
                <X className="w-5 h-5 shrink-0 mt-0.5 text-foreground/40" />
                <span>{r.typical}</span>
              </div>
              <div className="px-6 py-5 flex gap-3 items-start border-l-4 border-primary">
                <Check className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
                <span className="text-foreground">{r.ours}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: one card per topic */}
        <div className="md:hidden flex flex-col gap-4">
          {rows.map((r) => (
            <div key={r.topic} className="border border-black rounded-sm p-5 shadow-md bg-background">
              <h3 className="font-primary text-xl font-bold mb-3">{r.topic}</h3>
              <div className="flex gap-3 items-start text-sm text-muted-foreground font-secondary mb-3">
                <X className="w-4 h-4 shrink-0 mt-0.5 text-foreground/40" />
                <span>{r.typical}</span>
              </div>
              <div className="flex gap-3 items-start text-sm font-secondary pl-3 border-l-4 border-primary">
                <Check className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                <span>{r.ours}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
