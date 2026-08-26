import { useState } from "react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { bigNumbers, causes, consequences, contextTiers } from "../data/content";
import { Flame } from "lucide-react";

export default function Problem() {
  const [tier, setTier] = useState(0);

  return (
    <section id="problema" className="relative bg-void px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="fire">El problema</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            El fuego no empieza solo. Casi siempre, lo empezamos nosotros.
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            En las laderas y cerros tutelares de Medellín, un descuido —una
            botella, una colilla, una fogata mal apagada— puede convertirse en
            una emergencia que dura días.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 flex flex-wrap gap-2">
            {contextTiers.map((c, i) => (
              <button
                key={c.scope}
                onClick={() => setTier(i)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  tier === i
                    ? "bg-fire-500 text-void"
                    : "border border-white/10 text-ink-muted hover:bg-white/5"
                }`}
              >
                {c.scope}
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm leading-relaxed text-ink-muted">
              {contextTiers[tier].text}
            </p>
            <p className="mt-3 text-xs uppercase tracking-wide text-ink-faint">
              {contextTiers[tier].source}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {bigNumbers.map((n, i) => (
            <Reveal key={n.value} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 backdrop-blur">
                <p className="font-display text-5xl font-semibold text-fire-300">
                  {n.value}
                </p>
                <p className="mt-3 text-sm text-ink-muted">{n.label}</p>
                <p className="mt-4 text-xs uppercase tracking-wide text-ink-faint">
                  {n.source}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h3 className="font-display text-xl font-semibold text-ink">
              ¿Por qué pasa?
            </h3>
            <ul className="mt-5 space-y-4">
              {causes.map((c) => (
                <li key={c} className="flex gap-3 text-sm text-ink-muted">
                  <Flame size={16} className="mt-0.5 shrink-0 text-fire-500" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-display text-xl font-semibold text-ink">
              ¿Qué provoca?
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {consequences.map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-sm font-semibold text-ink">{c.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                    {c.text}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-wide text-ink-faint">
                    {c.source}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
