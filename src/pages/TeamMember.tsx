import { Link, useParams } from "react-router-dom";
import content from "../data/content.json";

export default function TeamMember() {
  const { id } = useParams<{ id: string }>();

  const member = content.team.find((person) => {
    const personId = person.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

    return personId === id;
  });

  if (!member) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Integrante no encontrado
          </h1>

          <p className="mb-6">
            El perfil que buscas no existe.
          </p>

          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-lg"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    );
  }

  const extendedMember = member as typeof member & {
    biography?: string;
    autobiography?: string;
    function?: string;
    video?: string;
    gallery?: string[];
  };

  const biography =
    extendedMember.biography ||
    extendedMember.autobiography ||
    member.blurb;

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <Link
          to="/"
          className="inline-block mb-10 opacity-70 hover:opacity-100"
        >
          ← Volver al equipo
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          <div>
            {member.photo && (
              <img
                src={member.photo}
                alt={member.name}
                className="w-full max-w-md mx-auto rounded-2xl object-cover"
              />
            )}
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest opacity-60 mb-2">
              {member.role}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {member.name}
            </h1>

            <h2 className="text-2xl font-semibold mb-3">
              Función
            </h2>

            <p className="leading-relaxed opacity-80">
              {extendedMember.function || member.blurb}
            </p>
          </div>

        </div>

        <div className="mt-16 max-w-4xl">

          <h2 className="text-3xl font-bold mb-5">
            Autobiografía
          </h2>

          <p className="leading-relaxed whitespace-pre-line opacity-80">
            {biography}
          </p>

        </div>

        {extendedMember.video && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6">
              Video
            </h2>

            <div className="aspect-video w-full max-w-4xl">
              <iframe
                className="w-full h-full rounded-2xl"
                src={extendedMember.video}
                title={`Video de ${member.name}`}
                allowFullScreen
              />
            </div>
          </div>
        )}

        {extendedMember.gallery &&
          extendedMember.gallery.length > 0 && (
            <div className="mt-16">

              <h2 className="text-3xl font-bold mb-6">
                Galería
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {extendedMember.gallery.map(
                  (image, index) => (
                    <img
                      key={`${image}-${index}`}
                      src={image}
                      alt={`${member.name} ${index + 1}`}
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                  )
                )}
              </div>

            </div>
          )}

      </div>
    </section>
  );
}