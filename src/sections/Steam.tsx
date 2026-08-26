import { useState } from "react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { steam, steamHIntro } from "../data/content";

export default function Steam() {
  const [active, setActive] = useState(0);

  return (
    <section id="steam" className="relative bg-void px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="forest">Modelo STEAM+H</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Seis disciplinas, un solo proyecto
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">{steamHIntro}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {steam.map((s, i) => (
              <button
                key={s.letter}
                onClick={() => setActive(i)}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-5 transition-colors ${
                  active === i
                    ? "border-forest-400/50 bg-forest-600/10"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
              >
                <span
                  className={`font-display text-3xl font-bold ${
                    active === i ? "text-forest-400" : "text-ink-muted"
                  }`}
                >
                  {s.letter}
                </span>
                <span className="text-[11px] uppercase tracking-wide text-ink-faint">
                  {s.es}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-forest-400">
              {steam[active].word} · {steam[active].es}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
              {steam[active].text}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
