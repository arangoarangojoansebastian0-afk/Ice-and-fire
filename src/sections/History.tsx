import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { teamHistory } from "../data/content";
import { Snowflake, Flame } from "lucide-react";

export default function History() {
  return (
    <section id="historia" className="relative overflow-hidden bg-void-2 px-6 py-28 lg:px-10">
      <div className="pointer-events-none absolute -left-32 top-10 h-[380px] w-[380px] rounded-full bg-ice-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="ice">Nuestra historia</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            De una tarea de clase a un proyecto que nos define
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {teamHistory.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                <div className="absolute right-6 top-6 text-white/5">
                  {i % 2 === 0 ? <Snowflake size={40} /> : <Flame size={40} />}
                </div>
                <h3 className="relative font-display text-lg font-semibold text-ink">
                  {h.title}
                </h3>
                <p className="relative mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
                  {h.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
