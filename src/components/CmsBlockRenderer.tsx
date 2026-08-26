import type { CmsBlock } from "../types/cms";

// Load all JSON files in src/data/reusable/ dynamically
const reusableModules = import.meta.glob("../data/reusable/*.json", { eager: true }) as Record<
  string,
  { default: CmsBlock & { id: string } }
>;

const reusableBlocksMap: Record<string, CmsBlock> = {};
for (const path in reusableModules) {
  const block = reusableModules[path].default;
  if (block && block.id) {
    reusableBlocksMap[block.id] = block;
  }
}

function youtubeId(url: string) {
  if (!url) return "";
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^?&/]+)/
  );
  return match?.[1] || url;
}

interface CmsBlockRendererProps {
  block: CmsBlock;
  visited?: Set<string>;
}

export default function CmsBlockRenderer({ block, visited = new Set() }: CmsBlockRendererProps) {
  if (!block || !block.type) return null;

  switch (block.type) {
    case "reusable": {
      const blockId = block.reusableBlockId;
      if (!blockId) return null;

      if (visited.has(blockId)) {
        console.warn(`Referencia circular detectada para el bloque reutilizable: ${blockId}`);
        return (
          <div className="rounded-xl border border-fire-500/20 bg-fire-500/5 p-4 text-xs text-fire-400">
            [Error: Referencia circular detectada para &quot;{blockId}&quot;]
          </div>
        );
      }

      const referencedBlock = reusableBlocksMap[blockId];
      if (!referencedBlock) {
        return (
          <div className="rounded-xl border border-dashed border-white/10 p-4 text-xs text-ink-muted">
            [Bloque reutilizable no encontrado: &quot;{blockId}&quot;]
          </div>
        );
      }

      const nextVisited = new Set(visited);
      nextVisited.add(blockId);
      return <CmsBlockRenderer block={referencedBlock} visited={nextVisited} />;
    }

    case "text":
      return (
        <article className="prose prose-invert max-w-4xl">
          {block.title && <h2>{block.title}</h2>}
          {block.text && (
            <p className="whitespace-pre-line">{block.text}</p>
          )}
        </article>
      );

    case "image":
      if (!block.image) return null;
      return (
        <figure>
          <img
            src={block.image}
            alt={block.alt || block.title || ""}
            className="max-h-[700px] w-full rounded-2xl object-contain"
          />
          {block.title && (
            <figcaption className="mt-3 text-center opacity-70">
              {block.title}
            </figcaption>
          )}
        </figure>
      );

    case "video": {
      if (!block.url && !block.title) return null;
      const id = youtubeId(block.url || "");

      return (
        <section>
          {block.title && (
            <h2 className="mb-5 text-2xl font-bold">{block.title}</h2>
          )}
          {id && (
            <div className="aspect-video overflow-hidden rounded-2xl">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${id}`}
                title={block.title || "Video"}
                allowFullScreen
              />
            </div>
          )}
          {block.description && (
            <p className="mt-3 opacity-70">{block.description}</p>
          )}
        </section>
      );
    }

    case "button":
      if (!block.href) return null;
      return (
        <a
          href={block.href}
          target={block.newTab ? "_blank" : undefined}
          rel={block.newTab ? "noreferrer" : undefined}
          className="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
        >
          {block.title || block.text || "Abrir"}
        </a>
      );

    case "gallery": {
      const images = block.images || [];
      if (images.length === 0) return null;
      return (
        <section>
          {block.title && (
            <h2 className="mb-6 text-2xl font-bold">{block.title}</h2>
          )}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="aspect-square w-full rounded-xl object-cover"
              />
            ))}
          </div>
        </section>
      );
    }

    case "embed":
      if (!block.url) return null;
      return (
        <section>
          {block.title && (
            <h2 className="mb-5 text-2xl font-bold">{block.title}</h2>
          )}
          <iframe
            src={block.url}
            className="w-full rounded-2xl border border-white/10"
            style={{ height: block.height || 500 }}
            title={block.title || "Contenido embebido"}
          />
        </section>
      );

    case "cards": {
      const cards = block.cards || [];
      if (cards.length === 0) return null;
      return (
        <section>
          {block.title && (
            <h2 className="mb-6 text-2xl font-bold">{block.title}</h2>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <a
                key={i}
                href={card.href || "#"}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
              >
                {card.image && (
                  <img
                    src={card.image}
                    alt=""
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-5">
                  {card.title && (
                    <h3 className="text-xl font-bold">{card.title}</h3>
                  )}
                  {card.text && (
                    <p className="mt-2 opacity-70">{card.text}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>
      );
    }

    default:
      return null;
  }
}
