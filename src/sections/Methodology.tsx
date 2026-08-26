import { useState } from "react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { methodologyPhaseA, methodologyPhaseB } from "../data/content";

function PhaseTrack({
  title,
  subtitle,
  steps,
  tone,
}: {
  title: string;
  subtitle: string;
  steps: { step: string; detail: string }[];
  tone: "fire" | "ice";
}) {
  const [active, setActive] = useState<number | null>(null);
  const accentText = tone === "fire" ? "text-fire-300" : "text-ice-300";
  const activeClasses =
    tone === "fire"
      ? "border-fire-500/50 bg-fire-500/10"
      : "border-ice-500/50 bg-ice-500/10";

  return (
    <div className="flex-1">
      <p className={`text-xs font-semibold uppercase tracking-wide ${accentText}`}>
        {subtitle}
      </p>
      <h3 className="mt-1 font-display text-lg font-semibold text-ink">{title}</h3>

      <div className="mt-6 space-y-3">
        {steps.map((s, i) => (
          <button
            key={s.step}
            onClick={() => setActive(active === i ? null : i)}
            className={`block w-full rounded-xl border p-4 text-left transition-colors ${
              active === i
                ? activeClasses
                : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
            }`}
          >
            <p className="text-sm font-semibold text-ink">{s.step}</p>
            {active === i && (
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                {s.detail}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Methodology() {
  return (
    <section id="metodologia" className="relative bg-void-2 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="fire">Metodología</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Dos frentes, un mismo objetivo
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            Toca cada paso para ver el detalle. El spray se valida en el
            laboratorio; el videojuego, con los propios compañeros de curso.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-col gap-10 rounded-2xl border border-white/10 bg-white/[0.02] p-8 lg:flex-row lg:gap-16">
            <PhaseTrack
              title="Laboratorio del Spray Fire"
              subtitle="Fase A"
              steps={methodologyPhaseA}
              tone="fire"
            />
            <div className="hidden w-px bg-white/10 lg:block" />
            <PhaseTrack
              title="Pilotaje de Llamas en el Bosque"
              subtitle="Fase B"
              steps={methodologyPhaseB}
              tone="ice"
            />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-6 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5 text-sm text-ink-muted">
            <span className="font-semibold text-ink">Resultados: </span>
            las pruebas de combustión y las encuestas pre/post-test están
            diseñadas, pero los datos aún no están consolidados. Esta sección
            se actualizará en cuanto el equipo tenga resultados verificados.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
