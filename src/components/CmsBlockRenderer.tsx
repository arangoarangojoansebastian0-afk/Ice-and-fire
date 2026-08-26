type Block = {
  type?: string;
  title?: string;
  text?: string;
  image?: string;
  alt?: string;
  url?: string;
  description?: string;
  href?: string;
  newTab?: boolean;
  images?: string[];
  height?: number;
  cards?: Array<{title?: string; text?: string; image?: string; href?: string}>;
};

function youtubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^?&/]+)/);
  return match?.[1] || url;
}

export default function CmsBlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return <article className="prose prose-invert max-w-4xl"><h2>{block.title}</h2><p className="whitespace-pre-line">{block.text}</p></article>;

    case "image":
      return <figure><img src={block.image} alt={block.alt || block.title || ""} className="max-h-[700px] w-full rounded-2xl object-contain" />{block.title && <figcaption className="mt-3 text-center opacity-70">{block.title}</figcaption>}</figure>;

    case "video": {
      const id = youtubeId(block.url || "");
      return <section><h2 className="mb-5 text-2xl font-bold">{block.title}</h2><div className="aspect-video overflow-hidden rounded-2xl"><iframe className="h-full w-full" src={`https://www.youtube.com/embed/${id}`} title={block.title || "Video"} allowFullScreen /></div>{block.description && <p className="mt-3 opacity-70">{block.description}</p>}</section>;
    }

    case "button":
      return <a href={block.href} target={block.newTab ? "_blank" : undefined} rel={block.newTab ? "noreferrer" : undefined} className="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-black hover:scale-105 transition">{block.title || block.text || "Abrir"}</a>;

    case "gallery":
      return <section><h2 className="mb-6 text-2xl font-bold">{block.title}</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{(block.images || []).map((src, i) => <img key={i} src={src} alt="" className="aspect-square w-full rounded-xl object-cover" />)}</div></section>;

    case "embed":
      return <section><h2 className="mb-5 text-2xl font-bold">{block.title}</h2><iframe src={block.url} className="w-full rounded-2xl border border-white/10" style={{height: block.height || 500}} title={block.title || "Contenido embebido"} /></section>;

    case "cards":
      return <section><h2 className="mb-6 text-2xl font-bold">{block.title}</h2><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{(block.cards || []).map((card, i) => <a key={i} href={card.href || "#"} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition">{card.image && <img src={card.image} alt="" className="h-48 w-full object-cover" />}<div className="p-5"><h3 className="text-xl font-bold">{card.title}</h3><p className="mt-2 opacity-70">{card.text}</p></div></a>)}</div></section>;

    default:
      return null;
  }
}
