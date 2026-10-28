import React, { useEffect, useState } from "react";

// Desktop only: a fixed rail of the 7 points that highlights the one being
// read and jumps to any point on click. Hidden until the points are on screen.
const PointsRail = ({ points }) => {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const items = points.map((p) => document.getElementById(`point-${p.n}`)).filter(Boolean);
    const list = document.getElementById("seven-points");
    if (!items.length || !list) return;

    const onPoint = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.id.replace("point-", "")));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    items.forEach((el) => onPoint.observe(el));

    const onList = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: "-30% 0px -30% 0px",
    });
    onList.observe(list);

    return () => {
      onPoint.disconnect();
      onList.disconnect();
    };
  }, [points]);

  const go = (n) =>
    document.getElementById(`point-${n}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav
      aria-label="The 7 points"
      className={`hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-1 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      {points.map((p) => {
        const on = p.n === active;
        const done = p.n < active;
        return (
          <button
            key={p.n}
            type="button"
            onClick={() => go(p.n)}
            aria-current={on ? "step" : undefined}
            className="group flex items-center gap-3 py-1 cursor-pointer text-left">
            <span
              className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-sm border font-primary font-bold text-sm tabular-nums transition-colors ${
                on ? "bg-primary border-primary text-white" : done ? "bg-black border-black text-white" : "bg-background border-black/30 text-foreground/50 group-hover:border-black group-hover:text-foreground"
              }`}>
              {p.n}
            </span>
            <span
              className={`max-w-[11rem] text-xs font-secondary leading-tight transition-all ${
                on ? "opacity-100 text-foreground" : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-muted-foreground"
              }`}>
              {p.short}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default PointsRail;
