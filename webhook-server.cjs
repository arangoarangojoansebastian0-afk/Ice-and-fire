// webhook-server.cjs
// Recibe los "push" de GitHub y actualiza automáticamente
// la carpeta local mediante git pull.

const http = require("http");
const crypto = require("crypto");
const { exec } = require("child_process");

const PORT = 3939;

// DEBE SER EXACTAMENTE EL MISMO SECRET CONFIGURADO EN GITHUB
const SECRET = "e86d80a2bcebff5b34b91f6857acc268e007dae003b7a1a5";

const REPO_PATH = "C:\\Users\\PC\\Downloads\\icefire-web";

function popup(mensaje) {
  const mensajeSeguro = mensaje.replace(/'/g, "''");

  const cmd =
    `powershell -NoProfile -Command ` +
    `"Add-Type -AssemblyName PresentationFramework; ` +
    `[System.Windows.MessageBox]::Show('${mensajeSeguro}', 'Ice and Fire - Webhook')"`;


  exec(cmd);
}

function verifySignature(payload, signatureHeader) {
  if (!signatureHeader) {
    return false;
  }

  const hmac = crypto.createHmac("sha256", SECRET);

  const digest =
    "sha256=" +
    hmac.update(payload).digest("hex");

  const a = Buffer.from(digest);
  const b = Buffer.from(signatureHeader);

  if (a.length !== b.length) {
    return false;
  }

  return crypto.timingSafeEqual(a, b);
}

const server = http.createServer((req, res) => {

  // Solo aceptamos POST /webhook
  if (req.method !== "POST" || req.url !== "/webhook") {
    res.writeHead(404);
    res.end("not found");
    return;
  }

  const body = [];

  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {

    const raw = Buffer.concat(body);

    const signature =
      req.headers["x-hub-signature-256"];

    // Verificar firma de GitHub
    if (!verifySignature(raw, signature)) {

      console.log(
        "[!] Firma invalida - peticion rechazada."
      );

      res.writeHead(401);
      res.end("firma invalida");

      return;
    }

    // Convertir JSON
    let payload;

    try {
      payload = JSON.parse(raw.toString("utf8"));
    } catch {

      res.writeHead(400);
      res.end("json invalido");

      return;
    }

    // Responder inmediatamente a GitHub
    res.writeHead(200);
    res.end("ok");

    const event =
      req.headers["x-github-event"];

    // Solo procesamos eventos push
    if (event !== "push") {

      console.log(
        `[i] Evento ignorado (${event}), solo procesamos "push".`
      );

      return;
    }

    // Solo procesamos main
    if (payload.ref !== "refs/heads/main") {

      console.log(
        `[i] Push a ${payload.ref}, ignorado (solo main).`
      );

      return;
    }

    console.log(
      "[+] Push detectado en main. Sincronizando..."
    );

    // Actualizar repositorio
    exec(
      "git pull --ff-only origin main",
      {
        cwd: REPO_PATH
      },
      (err, stdout, stderr) => {

        if (err) {

          console.error(
            "[!] Error al sincronizar:",
            stderr || err.message
          );

          popup(
            "Llego un push nuevo pero no se pudo sincronizar automaticamente. " +
            "Probablemente hay cambios locales sin guardar. " +
            "Abre la terminal y ejecuta: git pull"
          );

          return;
        }

        console.log(
          "[+] Sincronizado:\n" + stdout
        );

        // Git no tuvo que hacer nada
        if (
          stdout.includes("Already up to date") ||
          stdout.includes("Already up-to-date")
        ) {
          return;
        }

        popup(
          "Se publico algo nuevo en la pagina y tu carpeta local " +
          "ya se actualizo automaticamente."
        );
      }
    );
  });
});

server.listen(PORT, () => {

  console.log(
    `Servidor de webhook escuchando en http://localhost:${PORT}/webhook`
  );

  console.log(
    `Repositorio: ${REPO_PATH}`
  );

  console.log(
    "Dejalo corriendo - no cierres esta ventana."
  );
});