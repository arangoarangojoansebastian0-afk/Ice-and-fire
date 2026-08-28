const YOUTUBE_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

function isValidYouTubeId(id: string): boolean {
  return YOUTUBE_ID_RE.test(id);
}

export const isYouTubeVideo = (url: string): boolean => {
  if (!url) return false;
  return url.includes("youtube.com") || url.includes("youtu.be");
};

// Convierte cualquier URL de YouTube (watch, youtu.be, shorts, embed, o con
// parámetros extra como ?list=... o ?t=30s) en una URL de tipo /embed/ID.
// Si no logra reconocer el formato, devuelve la URL original sin cambios.
export const getYouTubeEmbedUrl = (url: string): string => {
  if (!url) return url;

  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  try {
    if (url.includes("youtu.be/")) {
      const parsed = new URL(url);
      const id = parsed.pathname.replace(/^\//, "");
      if (isValidYouTubeId(id)) return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes("youtube.com/shorts/")) {
      const parsed = new URL(url);
      const id = parsed.pathname.replace("/shorts/", "").replace(/^\//, "");
      if (isValidYouTubeId(id)) return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes("youtube.com/watch")) {
      const parsed = new URL(url);
      const id = parsed.searchParams.get("v");
      if (id && isValidYouTubeId(id)) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    // URL mal formada: seguimos abajo y devolvemos el valor original.
  }

  if (isValidYouTubeId(url)) {
    return `https://www.youtube.com/embed/${url}`;
  }

  return url;
};
