import React, { useMemo, useState } from "react";
import { MessageCircle, Check, X } from "lucide-react";

// Interactive TCF Canada -> NCLC checker.
// Bands from IRCC's language test equivalency chart (TCF Canada).
// Each band is [minimum score, NCLC level], highest first.
const SKILLS = [
  {
    key: "listening", label: "Listening", fr: "Compréhension orale", max: 699, step: 1,
    bands: [[549, 10], [523, 9], [503, 8], [458, 7], [398, 6], [369, 5], [331, 4]],
  },
  {
    key: "reading", label: "Reading", fr: "Compréhension écrite", max: 699, step: 1,
    bands: [[549, 10], [524, 9], [499, 8], [453, 7], [406, 6], [375, 5], [342, 4]],
  },
  {
    key: "speaking", label: "Speaking", fr: "Expression orale", max: 20, step: 1,
    bands: [[16, 10], [14, 9], [12, 8], [10, 7], [7, 6], [6, 5], [4, 4]],
  },
  {
    key: "writing", label: "Writing", fr: "Expression écrite", max: 20, step: 1,
    bands: [[16, 10], [14, 9], [12, 8], [10, 7], [7, 6], [6, 5], [4, 4]],
  },
];

const TARGET = 7;
const nclcFor = (skill, score) => {
  for (const [min, level] of skill.bands) if (score >= min) return level;
  return 0; // below NCLC 4
};
const minFor = (skill, level) => skill.bands.find(([, l]) => l === level)[0];

// Example scores so the tool shows a realistic result before anyone touches it.
const EXAMPLE = { listening: 470, reading: 440, speaking: 9, writing: 11 };

const NclcChecker = ({ whatsappE164 }) => {
  const [scores, setScores] = useState(EXAMPLE);
  const [touched, setTouched] = useState(false);
  const [englishClb5, setEnglishClb5] = useState(true);

  const results = useMemo(
    () =>
      SKILLS.map((s) => {
        const level = nclcFor(s, scores[s.key]);
        const gap = level >= TARGET ? 0 : minFor(s, TARGET) - scores[s.key];
        return { ...s, score: scores[s.key], level, gap };
      }),
    [scores]
  );

  const passed = results.filter((r) => r.level >= TARGET).length;
  const allPassed = passed === 4;
  const bonus = allPassed ? (englishClb5 ? 50 : 25) : 0;
  const short = results.filter((r) => r.gap > 0);

  const set = (key, raw, max) => {
    const n = Math.max(0, Math.min(max, Math.round(Number(raw) || 0)));
    setScores((s) => ({ ...s, [key]: n }));
    setTouched(true);
  };

  const message = [
    "Hi The Cheat School, I checked my TCF Canada scores on your site:",
    ...results.map((r) => `${r.label}: ${r.score} (NCLC ${r.level || "below 4"})`),
    allPassed
      ? "I'm at NCLC 7 in all four skills. I'd like help keeping it or going higher."
      : `I need to reach NCLC 7 in ${short.map((r) => r.label.toLowerCase()).join(", ")}. Can you help?`,
  ].join("\n");

  return (
    <section id="nclc-checker" className="scroll-mt-32 px-4 sm:px-6 py-16 md:py-20 bg-dark-grey border-y border-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm tracking-[0.3em] uppercase text-foreground/60 font-secondary mb-3">Free tool</p>
        <h2 className="font-primary font-bold text-4xl md:text-5xl leading-tight">
          Check your TCF scores
        </h2>
        <p className="mt-3 text-base md:text-lg text-foreground/80 font-secondary max-w-2xl">
          Move the sliders to your TCF Canada results, or a recent mock test. See your NCLC level in each
          skill and exactly how far you are from NCLC 7.
          {!touched && <span className="text-muted-foreground"> The scores shown are an example.</span>}
        </p>

        <div className="mt-10 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
          {/* Inputs */}
          <div className="flex flex-col gap-4">
            {results.map((r) => {
              const pct = (r.score / r.max) * 100;
              const targetPct = (minFor(r, TARGET) / r.max) * 100;
              const ok = r.level >= TARGET;
              return (
                <div key={r.key} className="bg-background border border-black rounded-sm p-4 md:p-5">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <label htmlFor={`tcf-${r.key}`} className="font-primary text-xl font-bold">
                      {r.label} <span className="text-xs font-secondary font-normal text-muted-foreground">{r.fr}</span>
                    </label>
                    <span
                      className={`text-xs font-secondary font-semibold px-2 py-1 rounded-sm ${ok ? "bg-black text-white" : "bg-primary/10 text-primary"}`}>
                      {r.level ? `NCLC ${r.level}` : "Below NCLC 4"}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="relative flex-1">
                      <input
                        id={`tcf-${r.key}`}
                        type="range"
                        min={0}
                        max={r.max}
                        step={r.step}
                        value={r.score}
                        onChange={(e) => set(r.key, e.target.value, r.max)}
                        className="nclc-range w-full"
                        style={{ "--fill": `${pct}%` }}
                        aria-describedby={`tcf-${r.key}-note`}
                      />
                      {/* NCLC 7 marker */}
                      <span
                        aria-hidden="true"
                        className="absolute -top-1 h-5 w-0.5 bg-black pointer-events-none"
                        style={{ left: `${targetPct}%` }}
                      />
                    </div>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={r.max}
                      value={r.score}
                      onChange={(e) => set(r.key, e.target.value, r.max)}
                      aria-label={`${r.label} score`}
                      className="w-20 border border-black rounded-sm px-2 py-1 text-right font-primary text-lg tabular-nums bg-background"
                    />
                  </div>
                  <p id={`tcf-${r.key}-note`} className="mt-2 text-sm font-secondary text-muted-foreground">
                    {ok
                      ? `Above the NCLC 7 line (${minFor(r, TARGET)}+ out of ${r.max}).`
                      : `${r.gap} ${r.max === 20 ? (r.gap === 1 ? "point" : "points") : "points"} short of NCLC 7 (needs ${minFor(r, TARGET)} out of ${r.max}).`}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Result */}
          <div className="lg:sticky lg:top-32 bg-background border-2 border-black rounded-sm p-6 shadow-md" aria-live="polite">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-secondary">Your result</p>
            <p className="mt-2 font-primary font-bold text-5xl tabular-nums">
              {passed}<span className="text-foreground/40"> / 4</span>
            </p>
            <p className="font-secondary text-sm text-muted-foreground">skills at NCLC 7 or higher</p>

            <ul className="mt-4 flex flex-col gap-2 font-secondary text-sm">
              {results.map((r) => (
                <li key={r.key} className="flex items-center gap-2">
                  {r.level >= TARGET
                    ? <Check className="w-4 h-4 text-foreground" />
                    : <X className="w-4 h-4 text-primary" />}
                  <span className="flex-1">{r.label}</span>
                  <span className="tabular-nums text-muted-foreground">NCLC {r.level || "<4"}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-5 border-t border-black/15">
              <fieldset>
                <legend className="text-sm font-secondary font-semibold mb-2">Your English (IELTS, CELPIP or PTE)</legend>
                <div className="grid grid-cols-2 gap-2 text-sm font-secondary">
                  {[
                    [true, "CLB 5 or higher"],
                    [false, "CLB 4 or lower"],
                  ].map(([val, label]) => (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={englishClb5 === val}
                      onClick={() => setEnglishClb5(val)}
                      className={`px-3 py-2 rounded-sm border border-black cursor-pointer transition-colors ${englishClb5 === val ? "bg-black text-white" : "bg-background hover:bg-light-grey"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground font-secondary">French bonus</p>
              <p className={`font-primary font-bold text-4xl tabular-nums ${allPassed ? "text-primary" : "text-foreground/40"}`}>
                +{bonus} CRS
              </p>
              <p className="mt-1 text-sm font-secondary text-foreground/80">
                {allPassed
                  ? "You qualify for the additional French points, as long as these are official TCF Canada results."
                  : short.length === 1
                    ? `One skill away. Get ${short[0].label.toLowerCase()} to NCLC 7 and this becomes +${englishClb5 ? 50 : 25}.`
                    : `Reach NCLC 7 in ${short.length} more skills to unlock +${englishClb5 ? 50 : 25}.`}
              </p>
            </div>

            <a
              href={`https://wa.me/${whatsappE164}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-lg font-semibold font-secondary hover:bg-[#d63820] transition-colors">
              <MessageCircle className="w-5 h-5" />
              {allPassed ? "Send my result to a coach" : "Get a plan for my weak skills"}
            </a>
            <p className="mt-2 text-xs text-muted-foreground font-secondary text-center">
              Opens WhatsApp with your scores filled in.
            </p>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground font-secondary max-w-3xl">
          Levels use IRCC's TCF Canada equivalency chart. This is an estimate, not an official assessment.
          Mock test scores can differ from the real exam.
        </p>
      </div>
    </section>
  );
};

export default NclcChecker;
