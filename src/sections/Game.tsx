import { useState } from "react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { gameLevels, gameMechanics, gamePurpose } from "../data/content";
import { Gamepad2, Flame } from "lucide-react";

export default function Game() {
  const [level, setLevel] = useState(0);

  return (
    <section id="videojuego" className="relative bg-void-2 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="ice">El videojuego</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Llamas en el Bosque
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">{gamePurpose}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          {/* Level selector */}
          <Reveal className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-2 text-ink">
                <Gamepad2 size={18} className="text-ice-300" />
                <p className="font-display text-sm font-semibold">
                  Protagonista: Alex, bombero
                </p>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                Un verano inusualmente caluroso desata una ola de incendios.
                Alex recorre cinco zonas del bosque, cada una más exigente que
                la anterior.
              </p>

              <div className="mt-6 space-y-2">
                {gameLevels.map((lvl, i) => (
                  <button
                    key={lvl.name}
                    onClick={() => setLevel(i)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                      level === i
                        ? "border-ice-500/40 bg-ice-500/10"
                        : "border-white/10 bg-transparent hover:bg-white/[0.04]"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                        level === i
                          ? "bg-ice-500 text-void"
                          : "bg-white/10 text-ink-muted"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-ink">{lvl.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Level detail + mechanics */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7">
                <p className="text-xs font-semibold uppercase tracking-wide text-ice-300">
                  Nivel {level + 1}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                  {gameLevels[level].name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {gameLevels[level].desc}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                  <Flame size={16} className="text-fire-300" /> Mecánicas de
                  juego
                </h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {gameMechanics.map((m) => (
                    <li key={m} className="text-xs leading-relaxed text-ink-muted">
                      · {m}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-4 text-xs text-ink-faint">
                Capturas del juego y enlace para jugar —{" "}
                <span className="text-ink-muted">próximamente</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
