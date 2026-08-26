import { useState } from "react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { antecedents, references } from "../data/content";
import { ChevronDown, BookOpen } from "lucide-react";

export default function Antecedents() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="antecedentes" className="relative bg-void px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="ice">Antecedentes</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Nos apoyamos en ciencia real
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            Cada afirmación de este sitio está respaldada por una fuente
            académica u oficial. Estos son algunos de los antecedentes más
            relevantes para el proyecto.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {antecedents.map((a, i) => (
            <Reveal key={a.author} delay={i * 0.05}>
              <div className="flex h-full gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <BookOpen size={16} className="mt-1 shrink-0 text-ice-300" />
                <div>
                  <p className="text-sm font-semibold text-ink">{a.author}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                    {a.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <button
            onClick={() => setShowAll((v) => !v)}
            className="mt-8 flex items-center gap-2 text-sm font-medium text-ice-300 hover:text-ice-100"
          >
            <ChevronDown
              size={16}
              className={`transition-transform ${showAll ? "rotate-180" : ""}`}
            />
            {showAll ? "Ocultar bibliografía completa" : "Ver bibliografía completa (19 fuentes)"}
          </button>

          {showAll && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <ol className="list-decimal space-y-3 pl-5">
                {references.map((r) => (
                  <li key={r} className="text-xs leading-relaxed text-ink-muted">
                    {r}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
