import { useState } from "react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import {
  researchQuestion,
  generalObjective,
  specificObjectives,
  antecedents,
  justification,
  interdependence,
  conceptualFramework,
} from "../data/content";

const tabs = ["Pregunta", "Objetivos", "Justificación", "Marco conceptual", "Antecedentes"] as const;
type Tab = (typeof tabs)[number];

export default function Research() {
  const [tab, setTab] = useState<Tab>("Pregunta");

  return (
    <section id="investigacion" className="relative bg-void px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="ice">Investigación científica</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            La base detrás de cada decisión del proyecto
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  tab === t
                    ? "bg-ice-500 text-void"
                    : "border border-white/10 text-ink-muted hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            {tab === "Pregunta" && (
              <blockquote className="text-balance font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
                “{researchQuestion}”
              </blockquote>
            )}

            {tab === "Objetivos" && (
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ice-300">
                    Objetivo general
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {generalObjective}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ice-300">
                    Objetivos específicos
                  </p>
                  <ul className="mt-3 space-y-3">
                    {specificObjectives.map((o, i) => (
                      <li key={i} className="flex gap-3 text-sm text-ink-muted">
                        <span className="mt-0.5 shrink-0 text-ice-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tab === "Justificación" && (
              <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                <div className="space-y-4">
                  {justification.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ink-muted">{p}</p>
                  ))}
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-ice-300">Dos fases que se necesitan entre sí</p>
                  {interdependence.map((x) => (
                    <div key={x.title} className="rounded-xl border border-white/10 p-4">
                      <p className="text-sm font-semibold text-ink">{x.title}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{x.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "Marco conceptual" && (
              <div className="space-y-8">
                {conceptualFramework.map((g) => (
                  <div key={g.group}>
                    <p className="text-sm font-semibold text-ice-300">{g.group}</p>
                    <div className="mt-3 grid gap-4 md:grid-cols-2">
                      {g.items.map((it) => (
                        <div key={it.title} className="rounded-xl border border-white/10 p-4">
                          <p className="text-sm font-semibold text-ink">{it.title}</p>
                          <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">{it.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "Antecedentes" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {antecedents.map((a) => (
                  <div key={a.author} className="rounded-xl border border-white/10 p-4">
                    <p className="text-sm font-semibold text-ink">{a.author}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                      {a.note}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
