export default function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;

  if (!clientId) {
    return res.status(500).json({
      error: "Falta OAUTH_GITHUB_CLIENT_ID"
    });
  }

  const redirectUri =
    `${process.env.OAUTH_BASE_URL}/api/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo"
  });

  res.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`
  );
}