export const isYouTubeVideo = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

export const getYouTubeEmbedUrl = (url: string): string => {
  if (url.includes('youtu.be')) {
    // Extract video ID from youtu.be URL
    const videoId = url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Handle youtube.com URLs
  const urlObj = new URL(url);
  const videoId = urlObj.searchParams.get('v');
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  return url;
};
