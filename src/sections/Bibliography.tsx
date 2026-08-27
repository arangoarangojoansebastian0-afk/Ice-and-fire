import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { references } from "../data/content";

export default function Bibliography() {
  return (
    <section id="bibliografia" className="relative bg-void px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Eyebrow tone="ice">Fuentes</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Bibliografía
          </h2>
          <p className="mt-4 max-w-3xl text-ink-muted">
            Fuentes científicas, institucionales y educativas utilizadas como
            respaldo para el desarrollo del proyecto Ice and Fire.
          </p>
        </Reveal>

        <ol className="mt-10 space-y-4">
          {references.map((reference, index) => (
            <Reveal key={`${index}-${reference}`} delay={Math.min(index * 0.02, 0.2)}>
              <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-ink-muted">
                <span className="mr-2 font-semibold text-ink">{index + 1}.</span>
                {reference}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
