import { useState } from "react";
import Gallery from "./Gallery";
import BancoImagenes from "./BancoImagenes";

const tabs = [
  { id: "equipo", label: "Fotos del equipo" },
  { id: "banco", label: "Banco de imágenes" },
] as const;

export default function GaleriaTabs() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("equipo");

  return (
    <div>
      <div role="tablist" aria-label="Galería" className="mb-8 flex gap-2 border-b border-white/10">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`-mb-px min-h-11 border-b-2 px-4 text-sm font-medium transition-colors ${
              tab === t.id ? "border-fire-400 text-ink" : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "equipo" ? <Gallery /> : <BancoImagenes />}
      </div>
    </div>
  );
}
