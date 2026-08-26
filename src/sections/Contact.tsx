import { useState } from "react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { Mail, Send, CheckCircle2 } from "lucide-react";

const CONTACT_EMAIL = "icefire.loyola@example.com"; // TODO(Joan): reemplazar por el correo real del equipo

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Mensaje desde la web — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contacto" className="relative bg-void-2 px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Eyebrow tone="fire">Contacto</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            ¿Preguntas sobre el proyecto?
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            Escríbenos si eres jurado, docente o simplemente quieres saber
            más sobre Ice and Fire.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="mt-12 space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  Nombre
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink outline-none focus:border-ice-500/50"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  Correo
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink outline-none focus:border-ice-500/50"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                Mensaje
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink outline-none focus:border-ice-500/50"
                placeholder="Cuéntanos qué quieres saber..."
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-fire-500 to-fire-300 px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.02]"
            >
              <Send size={16} /> Enviar mensaje
            </button>

            {sent && (
              <p className="flex items-center gap-2 text-xs text-forest-400">
                <CheckCircle2 size={14} /> Se abrió tu cliente de correo para
                enviar el mensaje.
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-6 flex items-center gap-2 text-xs text-ink-faint">
            <Mail size={14} /> También puedes escribir directamente a{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-ice-300 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
