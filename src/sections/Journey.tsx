import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { evolutionStory, ideasConsidered } from "../data/content";

export default function Journey() {
  return (
    <section className="relative bg-void-2 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="ice">Cómo llegamos aquí</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            El proyecto no nació así. Lo construimos por partes.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-4">
          {evolutionStory.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div
                  className="absolute -top-3 left-6 h-6 w-6 rounded-full border border-white/10 text-center text-[11px] font-semibold leading-6"
                  style={{
                    background:
                      i % 2 === 0
                        ? "linear-gradient(135deg,#5EC4E0,#2d7fa0)"
                        : "linear-gradient(135deg,#FF5A2A,#c23a12)",
                    color: "#0B1220",
                  }}
                >
                  {i + 1}
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-7">
            <h3 className="font-display text-base font-semibold text-ink">
              Antes del spray, el equipo evaluó otras alternativas
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {ideasConsidered.map((idea) => (
                <div
                  key={idea.name}
                  className={`rounded-xl border p-4 ${
                    idea.chosen
                      ? "border-fire-500/40 bg-fire-500/[0.06]"
                      : "border-white/10 bg-white/[0.02] opacity-70"
                  }`}
                >
                  <p className="text-sm font-semibold text-ink">
                    {idea.name}
                    {idea.chosen && (
                      <span className="ml-2 rounded-full bg-fire-500/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-fire-300">
                        Elegida
                      </span>
                    )}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                    {idea.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
