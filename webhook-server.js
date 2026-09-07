// webhook-server.js
// Escucha los "push" que GitHub manda apenas alguien publica un commit
// en main, y actualiza esta carpeta local al instante (git pull).
//
// Uso:  node webhook-server.js

const http = require("http");
const crypto = require("crypto");
const { exec } = require("child_process");
const path = require("path");

const PORT = 3939;
const SECRET = "e86d80a2bcebff5b34b91f6857acc268e007dae003b7a1a5"; // debe ser IDÉNTICO al secreto que pongas en GitHub
const REPO_PATH = "C:\\Users\\PC\\Downloads\\icefire-web";

function popup(mensaje) {
  const cmd = `powershell -NoProfile -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('${mensaje.replace(/'/g, "''")}', 'Ice and Fire - Webhook')"`;
  exec(cmd);
}

function verifySignature(payload, signatureHeader) {
  if (!signatureHeader) return false;
  const hmac = crypto.createHmac("sha256", SECRET);
  const digest = "sha256=" + hmac.update(payload).digest("hex");
  const a = Buffer.from(digest);
  const b = Buffer.from(signatureHeader);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

const server = http.createServer((req, res) => {
  if (req.method !== "POST" || req.url !== "/webhook") {
    res.writeHead(404);
    res.end("not found");
    return;
  }

  let body = [];
  req.on("data", (chunk) => body.push(chunk));
  req.on("end", () => {
    const raw = Buffer.concat(body);
    const signature = req.headers["x-hub-signature-256"];

    if (!verifySignature(raw, signature)) {
      console.log("[!] Firma inválida — petición rechazada.");
      res.writeHead(401);
      res.end("firma invalida");
      return;
    }

    let payload;
    try {
      payload = JSON.parse(raw.toString("utf8"));
    } catch {
      res.writeHead(400);
      res.end("json invalido");
      return;
    }

    res.writeHead(200);
    res.end("ok");

    const event = req.headers["x-github-event"];
    if (event !== "push") {
      console.log(`[i] Evento ignorado (${event}), solo procesamos "push".`);
      return;
    }
    if (payload.ref !== "refs/heads/main") {
      console.log(`[i] Push a ${payload.ref}, ignorado (solo main).`);
      return;
    }

    console.log("[+] Push detectado en main. Sincronizando...");

    exec(
      "git pull --ff-only origin main",
      { cwd: REPO_PATH },
      (err, stdout, stderr) => {
        if (err) {
          console.error("[!] Error al sincronizar:", stderr || err.message);
          popup(
            "Llego un push nuevo pero no se pudo sincronizar automaticamente (probablemente hay ediciones locales sin guardar). Abre la terminal y corre: git pull"
          );
          return;
        }
        console.log("[+] Sincronizado:\n" + stdout);
        if (stdout.includes("Already up to date")) return;
        popup("Se publico algo nuevo en la pagina y tu carpeta local ya se actualizo automaticamente.");
      }
    );
  });
});

server.listen(PORT, () => {
  console.log(`Servidor de webhook escuchando en http://localhost:${PORT}/webhook`);
  console.log(`Repositorio: ${REPO_PATH}`);
  console.log("Dejalo corriendo — no cierres esta ventana.");
});
