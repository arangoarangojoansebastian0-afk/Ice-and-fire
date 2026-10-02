import { useMemo, useState } from "react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { timeline } from "../data/content";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const DEFAULT_YEAR = 2026; // bitácoras sin "year" se asumen de este año
const BASE_YEARS = [2025, 2026]; // siempre se muestran, aunque estén vacíos

const norm = (s: string) =>
  s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

type Entry = { month: string; text: string; year?: number | string };

export default function Timeline() {
  const entries = timeline as Entry[];

  // year -> índice de mes (0-11) -> textos
  const byYear = useMemo(() => {
    const map = new Map<number, Map<number, string[]>>();
    for (const e of entries) {
      const year = Number(e.year) || DEFAULT_YEAR;
      const m = MONTHS.findIndex((x) => norm(x) === norm(e.month));
      if (m < 0) continue;
      if (!map.has(year)) map.set(year, new Map());
      const months = map.get(year)!;
      months.set(m, [...(months.get(m) ?? []), e.text]);
    }
    return map;
  }, [entries]);

  const years = useMemo(
    () => Array.from(new Set([...BASE_YEARS, ...byYear.keys()])).sort((a, b) => a - b),
    [byYear],
  );

  const [year, setYear] = useState<number>(
    years.includes(DEFAULT_YEAR) ? DEFAULT_YEAR : years[years.length - 1],
  );
  const [open, setOpen] = useState<number | null>(null);

  const months = byYear.get(year) ?? new Map<number, string[]>();
  const count = months.size;

  return (
    <section id="bitacoras" className="relative bg-void-2 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Eyebrow tone="ice">Bitácoras</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Nuestro trabajo, año por año y mes a mes
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-2" role="tablist" aria-label="Año">
            {years.map((y) => (
              <button
                key={y}
                role="tab"
                aria-selected={year === y}
                onClick={() => {
                  setYear(y);
                  setOpen(null);
                }}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  year === y
                    ? "bg-ice-500 text-void"
                    : "border border-white/10 text-ink-muted hover:bg-white/5"
                }`}
              >
                {y}
              </button>
            ))}
            <span className="ml-2 text-xs text-ink-faint">
              {count === 0
                ? "Sin bitácoras registradas"
                : `${count} ${count === 1 ? "mes registrado" : "meses registrados"}`}
            </span>
          </div>

          <ol className="mt-6 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            {MONTHS.map((name, i) => {
              const texts = months.get(i);
              const isOpen = open === i;
              return (
                <li key={name}>
                  {texts ? (
                    <>
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/[0.04]"
                      >
                        <span className="text-sm font-semibold text-ink">
                          {name} <span className="font-normal text-ink-faint">{year}</span>
                        </span>
                        <span
                          className={`h-2.5 w-2.5 rounded-full transition-colors ${
                            isOpen ? "bg-fire-500" : "bg-ice-300"
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <div className="space-y-2 px-5 pb-5 text-sm leading-relaxed text-ink-muted">
                          {texts.map((t, k) => (
                            <p key={k}>{t}</p>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-between px-5 py-4">
                      <span className="text-sm text-ink-faint">{name}</span>
                      <span className="text-xs text-ink-faint">Sin registro</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
