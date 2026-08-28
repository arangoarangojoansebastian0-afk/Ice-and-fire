import React from 'react';
import { isYouTubeVideo, getYouTubeEmbedUrl } from '../lib/video';
import { getContent } from '../lib/content';

const Welcome: React.FC = () => {
  const content = getContent();
  
  const renderVideo = (videoUrl?: string) => {
    if (!videoUrl) return null;
    
    if (isYouTubeVideo(videoUrl)) {
      const embedUrl = getYouTubeEmbedUrl(videoUrl);
      return (
        <div className="video-container">
          <iframe
            src={embedUrl}
            title="Video del equipo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    
    return (
      <div className="video-container">
        <video controls width="100%" height="auto">
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
      </div>
    );
  };

  const renderContextTier = (tier: { scope: string; text: string }) => (
    <div key={tier.scope} className="context-tier">
      <h3 className="context-tier-title">{tier.scope}</h3>
      <p className="context-tier-text">{tier.text}</p>
    </div>
  );

  return (
    <section id="welcome" className="welcome-section">
      <div className="container">
        <div className="welcome-content">
          <div className="welcome-text">
            <h1 className="welcome-title">{content.home?.title || "Bienvenidos al proyecto Ice and Fire"}</h1>
            <p className="welcome-description">
              {content.home?.description || "Ciencia, tecnología y educación para prevenir incendios forestales."}
            </p>
            
            <div className="research-question">
              <h2>Pregunta de investigación</h2>
              <p>{content.researchQuestion}</p>
            </div>
            
            <div className="context-section">
              <h2>Contexto del proyecto</h2>
              <div className="context-tiers">
                {content.contextTiers.map(renderContextTier)}
              </div>
            </div>
          </div>
          
          <div className="welcome-video">
            {renderVideo(content.team[0]?.video)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;