import React from "react";
import { Plus } from "lucide-react";
import { FRENCH_FAQ } from "@/content/french-faq";

// Native <details> keeps every answer in the page HTML, so search engines
// and AI crawlers read all of them even when collapsed.
const FrenchFaq = () => (
  <section id="french-faq" className="scroll-mt-32 px-4 sm:px-6 py-16 md:py-20 bg-background">
    <div className="max-w-4xl mx-auto">
      <p className="text-sm tracking-[0.3em] uppercase text-foreground/60 font-secondary mb-3">Questions</p>
      <h2 className="font-primary font-bold text-4xl md:text-5xl leading-tight mb-8">
        NCLC 7 and TCF Canada, answered
      </h2>
      <div className="flex flex-col border-t border-black">
        {FRENCH_FAQ.map(({ q, a }, i) => (
          <details key={q} className="group border-b border-black" open={i < 2}>
            <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h3 className="font-primary text-xl md:text-2xl font-bold">{q}</h3>
              <Plus className="w-6 h-6 shrink-0 text-primary transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="pb-6 pr-10 text-base md:text-lg text-foreground/80 font-secondary leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FrenchFaq;
