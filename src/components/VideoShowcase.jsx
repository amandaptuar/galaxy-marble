import React, { useState } from 'react';
import { Play, Sparkles, Film, Clock, CheckCircle2, RotateCcw } from 'lucide-react';
import { VIDEO_DATA } from '../data/siteData';

export const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeClipId, setActiveClipId] = useState(VIDEO_DATA.clips?.[0]?.id || VIDEO_DATA.youtubeId || 'du9_Kn2y2VA');

  const currentClip = VIDEO_DATA.clips?.find(c => c.id === activeClipId) || {
    title: VIDEO_DATA.title,
    duration: VIDEO_DATA.duration
  };

  const handleSelectClip = (clipId) => {
    setActiveClipId(clipId);
    setIsPlaying(true);
  };

  return (
    <section className="video-showcase-section" id="studio-tour">
      <div className="container">
        <div className="section-title-wrap">
          <div className="brand-pill" style={{ margin: '0 auto 12px', background: 'rgba(212, 175, 55, 0.15)', borderColor: 'var(--color-gold-border)' }}>
            <Sparkles size={12} className="text-gold" />
            <span style={{ color: 'var(--color-gold)' }}>Behind The Master Atelier</span>
          </div>
          <h2 className="section-title" style={{ color: '#ffffff' }}>{VIDEO_DATA.title}</h2>
          <p className="section-subtitle" style={{ color: '#cbd5e1', maxWidth: 680, margin: '0 auto' }}>
            {VIDEO_DATA.subtitle}
          </p>
        </div>

        {/* Video Cinema Container */}
        <div className="video-cinema-card">
          {!isPlaying ? (
            <div className="video-poster-stage" onClick={() => setIsPlaying(true)}>
              {/* AI-Generated Master Sculptor Atelier Poster */}
              <img 
                src={VIDEO_DATA.poster || '/marble-video-poster.jpg'} 
                alt="Galaxy Marble Master Atelier" 
                className="video-poster-img"
              />
              <div className="video-poster-scrim" />

              {/* Glowing Interactive Play Button */}
              <div className="video-play-center-btn">
                <div className="play-ripple" />
                <div className="play-icon-circle">
                  <Play size={32} fill="#0f172a" color="#0f172a" style={{ marginLeft: 4 }} />
                </div>
                <span className="play-prompt-text">Watch Master Artisan Documentary</span>
              </div>

              {/* Bottom Badges */}
              <div className="video-poster-meta">
                <div className="meta-badge-item">
                  <Film size={13} className="text-gold" />
                  <span>4K Cinema Documentary</span>
                </div>
                <div className="meta-badge-item">
                  <Clock size={13} className="text-gold" />
                  <span>{VIDEO_DATA.duration || '04:18 min'}</span>
                </div>
                <div className="meta-badge-item">
                  <CheckCircle2 size={13} className="text-gold" />
                  <span>Makrana & Carrara Atelier</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="video-responsive-iframe-wrap">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeClipId}?autoplay=1&rel=0&modestbranding=1&color=white`}
                title={currentClip.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-embedded-iframe"
              />
              <button 
                className="btn-close-video-overlay" 
                onClick={() => setIsPlaying(false)}
                title="Return to poster cover"
              >
                <RotateCcw size={14} />
                <span>Show Cover</span>
              </button>
            </div>
          )}

          {/* Documentary Chapters & Clips Row */}
          {VIDEO_DATA.clips && VIDEO_DATA.clips.length > 0 && (
            <div className="video-chapters-bar">
              <span className="chapters-label">
                <Film size={14} className="text-gold" />
                <span>Documentary Chapters:</span>
              </span>
              <div className="chapters-list">
                {VIDEO_DATA.clips.map((clip, idx) => {
                  const isActive = activeClipId === clip.id;
                  return (
                    <button
                      key={clip.id}
                      type="button"
                      className={`chapter-pill-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleSelectClip(clip.id)}
                    >
                      <span className="chapter-num">{idx + 1}</span>
                      <span className="chapter-name">{clip.title}</span>
                      <span className="chapter-duration">({clip.duration})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
