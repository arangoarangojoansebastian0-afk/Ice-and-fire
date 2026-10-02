import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { interconnection as ic, phases } from "../data/content";
import { Gamepad2, Flame, ArrowRightLeft } from "lucide-react";

function Flow({ label, items, tone }: { label: string; items: string[]; tone: "ice" | "fire" }) {
  const c = tone === "ice" ? "border-ice-500/40 text-ice-300" : "border-fire-500/40 text-fire-300";
  return (
    <div className={`rounded-2xl border bg-white/[0.03] p-6 ${c.split(" ")[0]}`}>
      <p className={`text-sm font-semibold ${c.split(" ")[1]}`}>{label}</p>
      <ul className="mt-4 space-y-3">
        {items.map((t) => (
          <li key={t} className="text-sm leading-relaxed text-ink-muted">{t}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Interconnection() {
  return (
    <section id="interconexion" className="relative bg-void-2 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="ice">Fases interdependientes</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {ic.title}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-muted">{ic.intro}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 rounded-xl border border-ice-500/40 bg-ice-500/10 p-4">
                <Gamepad2 className="shrink-0 text-ice-300" />
                <div>
                  <p className="font-display text-base font-semibold text-ink">{phases[0].name}</p>
                  <p className="text-xs text-ink-muted">{phases[0].text}</p>
                </div>
              </div>
              <Flow label={ic.gameToSpray.label} items={ic.gameToSpray.items} tone="ice" />
            </div>

            <div className="flex items-center justify-center text-ink-faint">
              <ArrowRightLeft size={28} className="rotate-90 lg:rotate-0" aria-hidden="true" />
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 rounded-xl border border-fire-500/40 bg-fire-500/10 p-4">
                <Flame className="shrink-0 text-fire-300" />
                <div>
                  <p className="font-display text-base font-semibold text-ink">{phases[1].name}</p>
                  <p className="text-xs text-ink-muted">{phases[1].text}</p>
                </div>
              </div>
              <Flow label={ic.sprayToGame.label} items={ic.sprayToGame.items} tone="fire" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-3xl text-balance font-display text-xl leading-snug text-ink">
            {ic.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
