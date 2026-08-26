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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(400).send(
        `GitHub OAuth error: ${data.error_description || data.error}`
      );
    }

    const token = data.access_token;

    const content = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Autenticación</title>
</head>
<body>
<script>
  const receiveMessage = () => {
    window.opener.postMessage(
      'authorization:github:success:${token}',
      window.location.origin
    );

    window.close();
  };

  receiveMessage();
</script>
</body>
</html>
`;

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(content);

  } catch (error) {
    console.error(error);

    res.status(500).send(
      "No se pudo completar la autenticación con GitHub."
    );
  }
}