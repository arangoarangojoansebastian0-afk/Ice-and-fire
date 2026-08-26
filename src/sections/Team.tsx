import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { team } from "../data/content";

export default function Team() {
  return (
    <section id="equipo" className="relative bg-void px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow tone="fire">El equipo</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Cinco personas, un mismo propósito
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            Ice (hielo) representa nuestra firmeza y calma frente a los retos;
            Fire (fuego), la pasión con la que trabajamos.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06}>
              <div className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="font-display text-sm font-semibold text-ink">
                    {m.name}
                  </p>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-fire-300">
                    {m.role}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                    {m.blurb}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
