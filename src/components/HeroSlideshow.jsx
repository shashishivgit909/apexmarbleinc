import React, { useState, useEffect, useRef } from 'react';
import { websiteData } from '../data/websiteData';
import { ChevronLeft, ChevronRight, ArrowUpRight, Compass, Layers, Award } from 'lucide-react';

export default function HeroSlideshow() {
  const slides = websiteData.heroSlides;
  const { company } = websiteData;

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
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 5000);
    }
    return () => clearInterval(timerRef.current);
  }, [currentIndex, isPaused, totalSlides]);

  const currentSlide = slides[currentIndex];

  return (
    <section
      id="hero-slideshow-section"
      className="hero-architectural-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hero-stage-wrapper">
        {/* Background Slides */}
        <div className="hero-slides-backdrop">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`hero-slide-frame ${idx === currentIndex ? 'is-active' : ''}`}
              aria-hidden={idx !== currentIndex}
            >
              <img
                src={slide.url}
                alt={slide.alt || slide.title}
                className="hero-slide-img"
                loading={idx === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  if (slide.remoteUrl && e.target.src !== slide.remoteUrl) {
                    e.target.src = slide.remoteUrl;
                  }
                }}
              />
              <div className="hero-warm-scrim" />
            </div>
          ))}
        </div>

        {/* Main Architectural Editorial Overlay */}
        <div className="hero-editorial-container">
          <div className="hero-editorial-grid">
            <div className="hero-copy-block">
              <div className="hero-kicker-pill">
                <span className="kicker-dot" />
                <span>SILICON VALLEY’S PREMIER NATURAL STONE GALLERY</span>
              </div>

              <h1 className="hero-display-title">
                {currentSlide.title}
              </h1>

              <p className="hero-display-subtitle">
                {currentSlide.subtitle}. Hand-selected marble, quartzite, granite, quartz, and
                architectural porcelain slabs imported directly from the world’s finest quarries.
              </p>

              <div className="hero-cta-group">
                <a
                  href="#materials-showcase-section"
                  className="btn-stone-primary"
                >
                  <span>Explore Slab Collection</span>
                  <ArrowUpRight size={17} />
                </a>
                <a
                  href={company.quoteUrl}
                  className="btn-stone-outline"
                >
                  <span>Schedule Showroom Visit</span>
                </a>
              </div>

              {/* Architectural Pillar Highlights */}
              <div className="hero-trust-strip">
                <div className="trust-pillar">
                  <Award size={18} className="trust-pillar-icon" />
                  <div>
                    <strong>18+ Years</strong>
                    <span>Bay Area Excellence</span>
                  </div>
                </div>
                <div className="trust-pillar">
                  <Layers size={18} className="trust-pillar-icon" />
                  <div>
                    <strong>250+ Varieties</strong>
                    <span>Full Slabs In Stock</span>
                  </div>
                </div>
                <div className="trust-pillar">
                  <Compass size={18} className="trust-pillar-icon" />
                  <div>
                    <strong>Direct Import</strong>
                    <span>Premier World Quarries</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Slide Preview Card & Controls */}
            <div className="hero-gallery-controller">
              <div className="controller-glass-card">
                <div className="controller-top-row">
                  <span className="controller-label">FEATURED SURFACE</span>
                  <span className="controller-counter">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                  </span>
                </div>

                <div className="controller-active-info">
                  <h2>{currentSlide.title}</h2>
                  <p>{currentSlide.subtitle}</p>
                </div>

                {/* Filmstrip Thumbnails */}
                <div className="controller-thumbs-row" role="tablist" aria-label="Slide Previews">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={idx === currentIndex}
                      aria-label={`View slide ${idx + 1}: ${s.title}`}
                      className={`hero-thumb-btn ${idx === currentIndex ? 'is-selected' : ''}`}
                      onClick={() => goToSlide(idx)}
                    >
                      <img
                        src={s.url}
                        alt={s.title}
                        onError={(e) => {
                          if (s.remoteUrl && e.target.src !== s.remoteUrl) {
                            e.target.src = s.remoteUrl;
                          }
                        }}
                      />
                    </button>
                  ))}
                </div>

                <div className="controller-nav-bar">
                  <div className="controller-progress-track">
                    <div
                      className="controller-progress-fill"
                      style={{ inlineSize: `${((currentIndex + 1) / totalSlides) * 100}%` }}
                    />
                  </div>
                  <div className="controller-arrows">
                    <button
                      type="button"
                      onClick={prevSlide}
                      className="controller-arrow-btn"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      className="controller-arrow-btn"
                      aria-label="Next Slide"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
