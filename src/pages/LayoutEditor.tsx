import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, GripVertical, RotateCcw, Save, Copy, Check } from "lucide-react";
import pagesData from "../data/pages.json";
import type { LayoutAlign, LayoutWidth, Page, PageSection } from "../types/cms";
import {
  getLayoutOverrides,
  mergeSectionLayout,
  saveLayoutOverrides,
  type LayoutOverride,
} from "../lib/layoutOverrides";

const widthOptions: { value: LayoutWidth; label: string }[] = [
  { value: "full", label: "Completo" },
  { value: "half", label: "Mitad" },
  { value: "third", label: "Tercio" },
  { value: "quarter", label: "Cuarto" },
];

const alignOptions: { value: LayoutAlign; label: string }[] = [
  { value: "stretch", label: "Estirar" },
  { value: "start", label: "Izquierda" },
  { value: "center", label: "Centro" },
  { value: "end", label: "Derecha" },
];

export default function LayoutEditor() {
  const { slug = "" } = useParams();
  const pages = pagesData.pages as Page[];
  const page = pages.find((item) => item.slug === slug);

  const initialSections = useMemo(
    () =>
      [...(page?.sections ?? [])]
        .filter((item) => item.visible !== false && item.section)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [page],
  );

  const [sections, setSections] = useState<PageSection[]>(initialSections);
  const [overrides, setOverrides] = useState<Record<string, LayoutOverride>>(() =>
    getLayoutOverrides(slug),
  );
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!page) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-3xl font-bold">Página no encontrada</h1>
        <Link className="mt-6 inline-block text-fire-300" to="/">Volver al inicio</Link>
      </div>
    );
  }

  function sectionId(section: PageSection, index: number) {
    return section.id || `${section.section}-${index}`;
  }

  function updateOverride(
    id: string,
    patch: LayoutOverride,
  ) {
    setOverrides((current) => ({
      ...current,
      [id]: {
        ...current[id],
        ...patch,
        layout: {
          ...(current[id]?.layout ?? {}),
          ...(patch.layout ?? {}),
        },
      },
    }));
  }

  function moveSection(sourceId: string, targetId: string) {
    if (sourceId === targetId) return;
    setSections((current) => {
      const next = [...current];
      const from = next.findIndex((item, index) => sectionId(item, index) === sourceId);
      const to = next.findIndex((item, index) => sectionId(item, index) === targetId);
      if (from < 0 || to < 0) return current;
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  function persist() {
    const next: Record<string, LayoutOverride> = { ...overrides };
    sections.forEach((section, index) => {
      const id = sectionId(section, index);
      next[id] = {
        ...next[id],
        order: (index + 1) * 10,
      };
    });
    saveLayoutOverrides(slug, next);
    setOverrides(next);
  }

  async function copyConfig() {
    const output = sections.reduce<Record<string, LayoutOverride>>((acc, section, index) => {
      const id = sectionId(section, index);
      acc[id] = {
        ...overrides[id],
        order: (index + 1) * 10,
      };
      return acc;
    }, {});

    await navigator.clipboard?.writeText(JSON.stringify(output, null, 2));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function reset() {
    window.localStorage.removeItem(`icefire-layout:${slug}`);
    setOverrides({});
    setSections(initialSections);
  }

  return (
    <main className="layout-editor mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="layout-editor-header">
        <div>
          <Link to={`/${slug}`} className="layout-editor-back">
            <ArrowLeft size={16} /> Volver a la página
          </Link>
          <p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-ice-300">
            Editor visual
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{page.name}</h1>
          <p className="mt-3 max-w-2xl text-sm text-ink-muted">
            Arrastra las secciones para cambiar su posición. También puedes
            cambiar su ancho y alineación sin editar el contenido.
          </p>
        </div>

        <div className="layout-editor-actions">
          <button onClick={reset} className="layout-editor-button secondary">
            <RotateCcw size={16} /> Restablecer
          </button>
          <button onClick={copyConfig} className="layout-editor-button secondary">
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copiado" : "Copiar configuración"}
          </button>
          <button onClick={persist} className="layout-editor-button primary">
            <Save size={16} /> Guardar diseño
          </button>
        </div>
      </div>

      <div className="layout-editor-note">
        <strong>Importante:</strong> este editor guarda el diseño en este navegador.
        Los cambios permanentes del proyecto siguen haciéndose desde Decap CMS.
        Puedes usar «Copiar configuración» para trasladar los valores al CMS.
      </div>

      <div className="layout-editor-list">
        {sections.map((section, index) => {
          const id = sectionId(section, index);
          const current = mergeSectionLayout(section, overrides[id]);
          const layout = current.layout ?? {};

          return (
            <article
              key={id}
              draggable
              onDragStart={() => setDraggedId(id)}
              onDragEnd={() => setDraggedId(null)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (draggedId) moveSection(draggedId, id);
                setDraggedId(null);
              }}
              className={`layout-editor-card ${draggedId === id ? "is-dragging" : ""}`}
            >
              <div className="layout-editor-drag" title="Arrastrar sección">
                <GripVertical size={21} />
              </div>

              <div className="layout-editor-index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[.15em] text-ink-faint">
                  {current.section}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-ink">
                  {current.label || current.section}
                </h2>
              </div>

              <div className="layout-editor-controls">
                <label>
                  <span>Ancho</span>
                  <select
                    value={layout.width ?? "full"}
                    onChange={(event) =>
                      updateOverride(id, {
                        layout: { width: event.target.value as LayoutWidth },
                      })
                    }
                  >
                    {widthOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Alineación</span>
                  <select
                    value={layout.align ?? "stretch"}
                    onChange={(event) =>
                      updateOverride(id, {
                        layout: { align: event.target.value as LayoutAlign },
                      })
                    }
                  >
                    {alignOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Desplazar</span>
                  <input
                    type="number"
                    min={0}
                    max={11}
                    value={layout.offset ?? 0}
                    onChange={(event) =>
                      updateOverride(id, {
                        layout: { offset: Number(event.target.value) },
                      })
                    }
                  />
                </label>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
