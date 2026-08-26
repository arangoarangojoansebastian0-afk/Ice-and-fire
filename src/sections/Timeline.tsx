import { useState } from "react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { timeline } from "../data/content";

export default function Timeline() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="bitacoras" className="relative bg-void-2 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="ice">Bitácoras</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Un año de trabajo, mes a mes
          </h2>
        </Reveal>

        {/* Desktop: horizontal line */}
        <div className="mt-16 hidden lg:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-5 h-px bg-white/10" />
            <div className="grid grid-cols-8 gap-3">
              {timeline.map((t, i) => (
                <button
                  key={t.month}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="group flex flex-col items-center gap-3 text-center"
                >
                  <span
                    className={`relative z-10 h-2.5 w-2.5 rounded-full border-2 transition-colors ${
                      open === i
                        ? "border-fire-500 bg-fire-500"
                        : "border-white/30 bg-void-2 group-hover:border-ice-300"
                    }`}
                  />
                  <span className="text-xs font-medium text-ink-muted group-hover:text-ink">
                    {t.month}
                  </span>
                </button>
              ))}
            </div>
          </div>
          {open !== null && (
            <Reveal className="mt-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm leading-relaxed text-ink-muted">
                <span className="mr-2 font-semibold text-ink">
                  {timeline[open].month}:
                </span>
                {timeline[open].text}
              </div>
            </Reveal>
          )}
        </div>

        {/* Mobile: vertical stack */}
        <div className="mt-10 flex flex-col gap-2 lg:hidden">
          {timeline.map((t, i) => (
            <div key={t.month} className="rounded-xl border border-white/10 bg-white/[0.03]">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-ink">{t.month}</span>
                <span
                  className={`h-2 w-2 rounded-full ${
                    open === i ? "bg-fire-500" : "bg-white/20"
                  }`}
                />
              </button>
              {open === i && (
                <p className="px-5 pb-4 text-xs leading-relaxed text-ink-muted">
                  {t.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
