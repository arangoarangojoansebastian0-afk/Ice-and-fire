import { Link } from "react-router-dom";
import content from "../data/content.json";

function createId(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export default function Team() {
  return (
    <section id="equipo" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestro equipo
          </h2>

          <p className="max-w-2xl mx-auto opacity-70">
            Conoce a las personas que hacen parte de Ice and Fire.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {content.team.map((member) => {
            const id = createId(member.name);

            return (
              <Link
                key={id}
                to={`/equipo/${id}`}
                className="group block rounded-2xl overflow-hidden transition-transform hover:-translate-y-2"
              >

                {member.photo && (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full aspect-square object-cover"
                  />
                )}

                <div className="p-6">

                  <p className="text-sm uppercase tracking-widest opacity-60 mb-2">
                    {member.role}
                  </p>

                  <h3 className="text-2xl font-bold mb-3">
                    {member.name}
                  </h3>

                  <p className="opacity-70 line-clamp-3">
                    {member.blurb}
                  </p>

                  <div className="mt-5 font-semibold">
                    Ver perfil →
                  </div>

                </div>

              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}