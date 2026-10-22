import React from "react";
import { Link } from "react-router-dom";
import { Lightbulb, ArrowRight } from "lucide-react";

// Renders a local cheat sheet article (see src/content/articles.js).
const ArticleBody = ({ blocks }) => (
  <div className="font-secondary text-foreground">
    {blocks.map((b, i) => {
      if (b.h2) return <h2 key={i} className="text-3xl font-primary font-bold text-secondary mt-10 mb-4 leading-tight">{b.h2}</h2>;
      if (b.h3) return <h3 key={i} className="text-2xl font-primary font-semibold text-secondary mt-8 mb-3">{b.h3}</h3>;
      if (b.p) return <p key={i} className="text-lg leading-relaxed text-foreground/90 mb-6">{b.p}</p>;
      if (b.ul)
        return (
          <ul key={i} className="list-disc list-outside ml-6 mb-6 space-y-2">
            {b.ul.map((li, j) => <li key={j} className="text-lg leading-relaxed text-foreground/90">{li}</li>)}
          </ul>
        );
      if (b.ol)
        return (
          <ol key={i} className="list-decimal list-outside ml-6 mb-6 space-y-2">
            {b.ol.map((li, j) => <li key={j} className="text-lg leading-relaxed text-foreground/90">{li}</li>)}
          </ol>
        );
      if (b.table)
        return (
          <div key={i} className="overflow-x-auto mb-8 border border-black rounded-sm">
            <table className="w-full text-left text-base">
              <thead className="bg-black text-white font-primary">
                <tr>{b.table.head.map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {b.table.rows.map((row, r) => (
                  <tr key={r} className={r % 2 ? "bg-light-grey" : "bg-background"}>
                    {row.map((cell, c) => (
                      <td key={c} className={`px-4 py-3 align-top ${c === 0 ? `font-semibold text-primary ${cell.length < 14 ? "whitespace-nowrap" : ""}` : "text-foreground/90"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      if (b.tip)
        return (
          <div key={i} className="flex gap-4 border-l-4 border-primary bg-light-grey rounded-r-lg p-5 my-8">
            <Lightbulb className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <p className="text-lg leading-relaxed"><strong className="font-primary">Cheat code: </strong>{b.tip}</p>
          </div>
        );
      if (b.cta)
        return (
          <div key={i} className="mt-10 bg-primary text-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-lg font-medium">{b.cta.text}</p>
            <Link to={b.cta.to} className="shrink-0 inline-flex items-center gap-2 bg-white text-primary px-5 py-3 rounded-lg font-semibold hover:gap-3 transition-all">
              {b.cta.label} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        );
      return null;
    })}
  </div>
);

export default ArticleBody;
