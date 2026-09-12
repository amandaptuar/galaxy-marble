import React from 'react';
import { VIDEO_DATA } from '../data/siteData';

export const VideoShowcase = () => {
  return (
    <section className="video-showcase-section" id="studio-tour">
      <div className="container">
        <div className="section-title-wrap">
          <span className="section-tag" style={{ color: 'var(--color-gold-border)' }}>Behind The Craft</span>
          <h2 className="section-title" style={{ color: '#ffffff' }}>{VIDEO_DATA.title}</h2>
          <p className="section-subtitle" style={{ color: '#cccccc' }}>
            {VIDEO_DATA.subtitle}
          </p>
        </div>

        <div className="video-container">
          <video 
            className="video-player"
            controls
            playsInline
            preload="metadata"
            poster={VIDEO_DATA.poster}
          >
            <source src={VIDEO_DATA.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};
