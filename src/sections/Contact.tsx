import { useState } from "react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { Mail, Send, CheckCircle2, ExternalLink } from "lucide-react";

// Correo oficial del equipo. Todo lo que llega por el formulario o por los
// enlaces de "escribir" en el sitio se dirige aquí.
export const CONTACT_EMAIL = "iceandfirejmmi@gmail.com";

// Construye un link de Gmail (versión web) para redactar un correo.
// Es más confiable que "mailto:" porque no depende de tener un cliente de
// correo configurado en el navegador o el computador/celular.
export function buildGmailComposeUrl(to: string, subject: string, body: string) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function buildMailtoUrl(to: string, subject: string, body: string) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const subject = `Mensaje desde la web — ${name || "Sin nombre"}`;
  const body = `${message}\n\n— ${name} (${email})`;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Intento 1: abrir el cliente de correo del dispositivo (Outlook, Mail, etc.)
    window.location.href = buildMailtoUrl(CONTACT_EMAIL, subject, body);
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

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-fire-500 to-fire-300 px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.02]"
              >
                <Send size={16} /> Enviar mensaje
              </button>

              {/* Respaldo: si "Enviar mensaje" no abrió nada (pasa cuando el
                  dispositivo no tiene un cliente de correo configurado), esto
                  abre Gmail directamente en el navegador con todo ya escrito. */}
              <a
                href={buildGmailComposeUrl(CONTACT_EMAIL, subject, body)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-ink-muted transition-colors hover:border-ice-500/40 hover:text-ink"
              >
                <ExternalLink size={14} /> ¿No se abrió nada? Envíalo desde Gmail
              </a>
            </div>

            {sent && (
              <p className="flex items-center gap-2 text-xs text-forest-400">
                <CheckCircle2 size={14} /> Se abrió (o debería abrirse) tu
                cliente de correo con el mensaje listo para enviar. Si no pasó
                nada, usa el botón "Envíalo desde Gmail" de arriba.
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
