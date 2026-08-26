import { Link, useParams } from "react-router-dom";
import content from "../data/content.json";

export default function TeamMember() {
  const { id } = useParams<{ id: string }>();
  const member = content.team?.find((item: any) => (item.id || slugify(item.name)) === id);

  if (!member) {
    return (
      <section className="min-h-screen px-6 py-24 text-white">
        <h1 className="text-4xl font-bold">Integrante no encontrado</h1>
        <Link to="/" className="mt-6 inline-block underline">Volver al inicio</Link>
      </section>
    );
  }

  const gallery = member.gallery || [];

  return (
    <section className="min-h-screen px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="mb-8 inline-block opacity-80 hover:opacity-100">← Volver</Link>

        <div className="grid gap-10 md:grid-cols-[320px_1fr]">
          <div>
            {member.photo && (
              <img src={member.photo} alt={member.name} className="w-full rounded-2xl object-cover" />
            )}
            <h1 className="mt-5 text-4xl font-bold">{member.name}</h1>
            <p className="mt-2 text-xl opacity-80">{member.role}</p>
          </div>

          <div className="space-y-8">
            {member.video && (
              <div>
                <h2 className="mb-3 text-2xl font-bold">Video</h2>
                <div className="aspect-video overflow-hidden rounded-2xl">
                  <iframe
                    src={youtubeEmbed(member.video)}
                    title={`Video de ${member.name}`}
                    className="h-full w-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {member.biography && (
              <div>
                <h2 className="mb-3 text-2xl font-bold">Autobiografía</h2>
                <div className="whitespace-pre-line leading-7 opacity-90">{member.biography}</div>
              </div>
            )}

            {member.function && (
              <div>
                <h2 className="mb-3 text-2xl font-bold">Función en el proyecto</h2>
                <p className="leading-7 opacity-90">{member.function}</p>
              </div>
            )}

            {gallery.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">Galería</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {gallery.map((image: any, index: number) => {
                    const src = typeof image === "string" ? image : image.image;
                    return <img key={index} src={src} alt={`${member.name} ${index + 1}`} className="aspect-square w-full rounded-xl object-cover" />;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function youtubeEmbed(value: string) {
  if (value.includes("youtube.com/embed/")) return value;
  const match = value.match(/(?:v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/);
  const id = match?.[1] || value;
  return `https://www.youtube.com/embed/${id}`;
}
