export default function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;

  if (!clientId) {
    return res.status(500).send(
      "Falta OAUTH_GITHUB_CLIENT_ID."
    );
  }

  const baseUrl =
    process.env.OAUTH_BASE_URL ||
    "https://iceandfire-psi.vercel.app";

  const redirectUri = `${baseUrl}/api/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo",
  });

  const githubUrl =
    `https://github.com/login/oauth/authorize?${params.toString()}`;

  res.writeHead(302, {
    Location: githubUrl,
  });

  res.end();
}