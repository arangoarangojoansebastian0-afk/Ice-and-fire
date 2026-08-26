import { Link, useParams } from "react-router-dom";
import content from "../data/content.json";

function slugify(name: string) {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
}

export default function TeamMember() {
  const { id } = useParams();
  const member = content.team.find((p) => slugify(p.name) === id);

  if (!member) return <div className="px-6 py-32 text-center"><h1 className="text-4xl font-bold">Integrante no encontrado</h1><Link className="mt-6 inline-block" to="/equipo">← Volver al equipo</Link></div>;

  const extra = member as typeof member & {
    biography?: string;
    autobiography?: string;
    function?: string;
    video?: string;
    gallery?: string[];
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Link to="/equipo" className="opacity-70 hover:opacity-100">← Volver al equipo</Link>
      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <div>{member.photo && <img src={member.photo} alt={member.name} className="w-full rounded-3xl object-cover" />}</div>
        <div>
          <p className="text-sm uppercase tracking-widest opacity-60">{member.role}</p>
          <h1 className="mt-2 text-5xl font-bold">{member.name}</h1>
          <h2 className="mt-10 text-2xl font-bold">Función</h2>
          <p className="mt-3 whitespace-pre-line opacity-80">{extra.function || member.blurb}</p>
          <h2 className="mt-10 text-2xl font-bold">Autobiografía</h2>
          <p className="mt-3 whitespace-pre-line opacity-80">{extra.biography || extra.autobiography || member.blurb}</p>
        </div>
      </div>
      {extra.video && <div className="mt-16"><h2 className="mb-5 text-3xl font-bold">Video</h2><div className="aspect-video"><iframe className="h-full w-full rounded-2xl" src={extra.video.includes("youtube") ? extra.video.replace("watch?v=", "embed/") : extra.video} title={member.name} allowFullScreen /></div></div>}
      {extra.gallery?.length ? <div className="mt-16"><h2 className="mb-6 text-3xl font-bold">Galería</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{extra.gallery.map((src, i) => <img key={i} src={src} alt="" className="aspect-square rounded-xl object-cover" />)}</div></div> : null}
    </section>
  );
}
