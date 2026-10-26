import React, { useState, useEffect, useRef } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { websiteData } from '../data/websiteData';
import SectionToolbar from './SectionToolbar';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';

export default function HeroSlideshow() {
  const { config } = useCustomizer();
  const c = config.heroSlideshow;
  const slides = websiteData.heroSlides;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, c.autoplaySpeed || 4500);
    }
    return () => clearInterval(timerRef.current);
  }, [currentIndex, isPaused, c.autoplaySpeed]);

  const layoutVariants = [
    { id: 'original', label: 'Full Width (Live Site)' },
    { id: 'splitHero', label: 'Split + Thumbnails' },
    { id: 'framedCard', label: 'Framed Luxury Card' }
  ];

  const currentSlide = slides[currentIndex];

  return (
    <section
      id="hero-slideshow-section"
      className={`hero-slideshow-wrap layout-${c.layout}`}
      style={{
        backgroundColor: c.bg || '#111111',
        '--hero-accent': c.accent || '#ff932f',
        '--hero-text': c.textColor || '#ffffff'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SectionToolbar
        sectionKey="heroSlideshow"
        sectionName="Hero Slideshow"
        layoutOptions={layoutVariants}
      />

      {/* ================= LAYOUT 1: ORIGINAL FULL WIDTH ================= */}
      {c.layout === 'original' && (
        <div className="slideshow-container full-width-layout">
          <div className="slides-track">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`slide-item ${idx === currentIndex ? 'active' : ''}`}
                aria-hidden={idx !== currentIndex}
              >
                <img
                  src={slide.url}
                  alt={slide.alt || 'Apex Marble Slabs'}
                  className="slide-image"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    if (slide.remoteUrl && e.target.src !== slide.remoteUrl) {
                      e.target.src = slide.remoteUrl;
                    }
                  }}
                />
                <div
                  className="slide-overlay"
                  style={{
                    backgroundColor: `rgba(0, 0, 0, ${c.overlayOpacity ?? 0.35})`
                  }}
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {c.showArrows && (
            <>
              <button
                type="button"
                className="slideshow-arrow prev-arrow"
                onClick={prevSlide}
                aria-label="Previous Slide"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                type="button"
                className="slideshow-arrow next-arrow"
                onClick={nextSlide}
                aria-label="Next Slide"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Slide Indicator Dots */}
          {c.showIndicators && (
            <div className="slideshow-dots">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`dot-btn ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  style={{
                    backgroundColor: idx === currentIndex ? c.accent : 'rgba(255, 255, 255, 0.45)'
                  }}
                />
              ))}
            </div>
          )}

          {/* Floating Slide Counter Badge */}
          <div className="slide-counter-badge">
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="counter-slash">/</span>
            <span>{String(totalSlides).padStart(2, '0')}</span>
          </div>
        </div>
      )}

      {/* ================= LAYOUT 2: SPLIT HERO + THUMBNAIL REEL ================= */}
      {c.layout === 'splitHero' && (
        <div className="slideshow-container split-hero-layout">
          <div className="split-hero-grid">
            {/* Main Stage View */}
            <div className="split-main-stage">
              <div className="main-image-wrap">
                <img
                  src={currentSlide.url}
                  alt={currentSlide.alt}
                  className="main-stage-img"
                  onError={(e) => {
                    if (currentSlide.remoteUrl && e.target.src !== currentSlide.remoteUrl) {
                      e.target.src = currentSlide.remoteUrl;
                    }
                  }}
                />
                <div
                  className="stage-gradient-overlay"
                  style={{ backgroundColor: `rgba(0, 0, 0, ${c.overlayOpacity ?? 0.4})` }}
                />

                <div className="stage-caption-content">
                  <div className="stage-chip" style={{ backgroundColor: c.accent, color: '#fff' }}>
                    <Sparkles size={12} />
                    <span>Curated Selection</span>
                  </div>
                  <h2>{currentSlide.title}</h2>
                  <p>{currentSlide.subtitle}</p>

                  <div className="stage-action-btns">
                    <a
                      href="https://www.apexmarbleinc.com/slabs"
                      target="_top"
                      className="stage-primary-btn"
                      style={{ backgroundColor: c.accent, color: '#ffffff' }}
                    >
                      Browse Slabs
                    </a>
                    <a
                      href="https://www.apexmarbleinc.com/contact#quote"
                      target="_top"
                      className="stage-secondary-btn"
                    >
                      Request Quote
                    </a>
                  </div>
                </div>

                <div className="stage-controls">
                  <button type="button" onClick={prevSlide} className="mini-arrow-btn">
                    <ChevronLeft size={20} />
                  </button>
                  <span className="mini-counter">
                    {currentIndex + 1} / {totalSlides}
                  </span>
                  <button type="button" onClick={nextSlide} className="mini-arrow-btn">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Carousel Sidebar */}
            <div className="split-thumbnails-sidebar">
              <div className="sidebar-header">
                <h3>Slab Showcase Gallery</h3>
                <span className="badge-count">{totalSlides} Slabs</span>
              </div>
              <div className="thumbnails-scroll-list">
                {slides.map((s, idx) => (
                  <div
                    key={s.id}
                    className={`thumb-card ${idx === currentIndex ? 'active-thumb' : ''}`}
                    onClick={() => goToSlide(idx)}
                    style={{
                      borderColor: idx === currentIndex ? c.accent : 'transparent'
                    }}
                  >
                    <img src={s.url} alt={s.title} className="thumb-img" />
                    <div className="thumb-info">
                      <span className="thumb-num">0{idx + 1}</span>
                      <h4>{s.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= LAYOUT 3: FRAMED LUXURY CARD ================= */}
      {c.layout === 'framedCard' && (
        <div className="slideshow-container framed-card-layout">
          <div className="framed-card-box">
            <div className="framed-image-holder">
              <img
                src={currentSlide.url}
                alt={currentSlide.alt}
                className="framed-img"
                onError={(e) => {
                  if (currentSlide.remoteUrl && e.target.src !== currentSlide.remoteUrl) {
                    e.target.src = currentSlide.remoteUrl;
                  }
                }}
              />
              <div
                className="framed-overlay"
                style={{ backgroundColor: `rgba(0,0,0,${c.overlayOpacity ?? 0.3})` }}
              />

              {/* Glass Info Bar */}
              <div className="glass-info-bar">
                <div className="glass-info-text">
                  <span className="glass-kicker" style={{ color: c.accent }}>
                    APEX MARBLE COLLECTION
                  </span>
                  <h3>{currentSlide.title}</h3>
                  <p>{currentSlide.subtitle}</p>
                </div>

                <div className="glass-info-actions">
                  <button
                    type="button"
                    className="glass-nav-btn"
                    onClick={prevSlide}
                    aria-label="Previous"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    className="glass-nav-btn"
                    onClick={nextSlide}
                    aria-label="Next"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
              </div>
            </div>

            {/* Linear Progress Bar */}
            <div className="framed-progress-track">
              <div
                className="framed-progress-bar"
                style={{
                  width: `${((currentIndex + 1) / totalSlides) * 100}%`,
                  backgroundColor: c.accent
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
