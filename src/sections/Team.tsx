import { Link } from "react-router-dom";
import content from "../data/content.json";

export default function Team() {
  const members = (content.team || []).filter((member: any) => member.enabled !== false);

  return (
    <section id="equipo" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h2 className="text-4xl font-bold">Nuestro equipo</h2>
          <p className="mt-3 opacity-80">Conoce a las personas detrás de Ice and Fire.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member: any) => {
            const id = member.id || slugify(member.name);
            return (
              <Link key={id} to={`/equipo/${id}`} className="group overflow-hidden rounded-2xl border border-white/10 transition-transform hover:-translate-y-1">
                {member.photo && <img src={member.photo} alt={member.name} className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105" />}
                <div className="p-5">
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                  <p className="mt-1 opacity-70">{member.role}</p>
                  {member.blurb && <p className="mt-4 line-clamp-3 opacity-80">{member.blurb}</p>}
                  <span className="mt-5 inline-block font-semibold">Ver perfil →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
