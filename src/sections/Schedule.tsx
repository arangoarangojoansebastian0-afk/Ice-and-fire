import { useState } from "react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { schedule } from "../data/content";
import { CalendarDays } from "lucide-react";

export default function Schedule() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="cronograma" className="relative bg-void-2 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="forest">Cronograma</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Agosto – noviembre de 2026
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            Catorce hitos, cada uno con su entregable y su responsable dentro
            del equipo.
          </p>
        </Reveal>

        <div className="mt-14 space-y-3">
          {schedule.map((s, i) => (
            <Reveal key={s.date} delay={Math.min(i * 0.03, 0.4)}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`block w-full rounded-2xl border p-5 text-left transition-colors ${
                  open === i
                    ? "border-forest-400/40 bg-forest-600/[0.08]"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <CalendarDays size={16} className="shrink-0 text-forest-400" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                      {s.date}
                    </span>
                    <span className="text-sm font-semibold text-ink">
                      {s.phase}
                    </span>
                  </div>
                  <span className="text-xs text-ink-muted">{s.owner}</span>
                </div>

                {open === i && (
                  <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                        Actividad
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                        {s.activity}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                        Entregable
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                        {s.deliverable}
                      </p>
                    </div>
                  </div>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
