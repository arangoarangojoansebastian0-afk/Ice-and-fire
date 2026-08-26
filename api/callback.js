export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Falta el código de autorización.");
  }

  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).send(
      "Faltan las variables de entorno de GitHub."
    );
  }

  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(400).send(
        `GitHub OAuth error: ${
          data.error_description || data.error
        }`
      );
    }

    const payload = {
      token: data.access_token,
      provider: "github",
    };

    const message = `authorization:github:success:${JSON.stringify(payload)}`;

    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Autenticación completada</title>
</head>
<body>
<script>
(function() {
  const message = ${JSON.stringify(message)};

  function sendMessage(event) {
    if (!window.opener) {
      return;
    }

    window.opener.postMessage(
      message,
      event ? event.origin : "*"
    );

    window.removeEventListener("message", sendMessage);
  }

  window.addEventListener("message", sendMessage, false);

  if (window.opener) {
    window.opener.postMessage(
      "authorizing:github",
      "*"
    );

    window.opener.postMessage(
      message,
      "*"
    );
  }
})();
</script>

<p>Autenticación completada. Puedes cerrar esta ventana.</p>
</body>
</html>
`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);

  } catch (error) {
    console.error(error);

    res.status(500).send(
      "No se pudo completar la autenticación con GitHub."
    );
  }
}