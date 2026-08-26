import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import {
  sprayIngredients,
  sprayWhy,
  sprayHow,
  sprayAdvantages,
  sprayLimitations,
} from "../data/content";
import { Droplets, Leaf, ShieldCheck, AlertTriangle } from "lucide-react";

export default function Spray() {
  return (
    <section id="spray" className="relative overflow-hidden bg-void px-6 py-28 lg:px-10">
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-fire-500/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="fire">El prototipo</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Spray Fire, la primera barrera
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            Un retardante natural pensado para actuar antes de que el fuego
            empiece a extenderse.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Left: concept card */}
          <Reveal className="lg:col-span-2">
            <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8">
              <Droplets size={28} className="text-fire-300" />
              <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
                ¿Qué es?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Un spray ignífugo natural, biodegradable y no tóxico, formulado
                para retardar la combustión de vegetación seca, madera y
                plástico sin dañar el ecosistema.
              </p>

              <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-fire-300">
                Ingredientes
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {sprayIngredients.map((ing) => (
                  <span
                    key={ing}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-ink"
                  >
                    {ing}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-4 text-xs leading-relaxed text-ink-faint">
                Espacio reservado para foto del prototipo físico —{" "}
                <span className="text-ink-muted">
                  [información faltante: fotos de laboratorio]
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right: why / how / advantages / limitations */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h4 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
                  <Leaf size={16} className="text-forest-400" /> ¿Por qué se
                  creó?
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {sprayWhy}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h4 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
                  <Droplets size={16} className="text-ice-300" /> ¿Cómo
                  funciona?
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {sprayHow}
                </p>
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.15}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                    <ShieldCheck size={16} className="text-forest-400" />{" "}
                    Ventajas
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {sprayAdvantages.map((a) => (
                      <li key={a} className="text-xs leading-relaxed text-ink-muted">
                        · {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                    <AlertTriangle size={16} className="text-fire-300" />{" "}
                    Limitaciones
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {sprayLimitations.map((a) => (
                      <li key={a} className="text-xs leading-relaxed text-ink-muted">
                        · {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
