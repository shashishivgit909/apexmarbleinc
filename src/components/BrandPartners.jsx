import React, { useRef, useState, useEffect } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { websiteData } from '../data/websiteData';
import SectionToolbar from './SectionToolbar';
import { ChevronLeft, ChevronRight, ExternalLink, ShieldCheck } from 'lucide-react';

export default function BrandPartners() {
  const { config } = useCustomizer();
  const c = config.partners;
  const { partnersSection } = websiteData;
  const partners = partnersSection.partners;

  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  const layoutVariants = [
    { id: 'original', label: 'Infinite Marquee (Live Site)' },
    { id: 'brandGrid', label: 'Multi-Col Brand Grid' },
    { id: 'cardCarousel', label: 'Spotlight Carousel' }
  ];

  // Manual scroll function matching the live site's moveManual logic
  const moveManual = (direction) => {
    if (trackRef.current) {
      const moveAmount = 240 * direction;
      trackRef.current.scrollBy({ left: moveAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="brand-partners-section"
      className={`partners-section-wrap layout-${c.layout}`}
      style={{
        backgroundColor: c.bg,
        '--partner-heading': c.headingColor,
        '--partner-text': c.textColor,
        '--partner-accent': c.accent,
        '--partner-card-bg': c.cardBg
      }}
    >
      <SectionToolbar
        sectionKey="partners"
        sectionName="Brand Partners Section"
        layoutOptions={layoutVariants}
      />

      {/* Background image overlay */}
      <div
        className="partners-bg-image"
        style={{
          backgroundImage: `url(${partnersSection.backgroundImage})`
        }}
      >
        <div
          className="partners-bg-overlay"
          style={{ backgroundColor: c.bg, opacity: 0.88 }}
        />
      </div>

      <div className="partners-content-container">
        <div className="partners-header">
          <div className="partners-chip" style={{ color: c.accent }}>
            <ShieldCheck size={14} />
            <span>GLOBAL SURFACE LEADERS</span>
          </div>
          <h2 className="partners-main-heading" style={{ color: c.headingColor }}>
            {partnersSection.heading}
          </h2>
          <p className="partners-subheading" style={{ color: c.textColor }}>
            {partnersSection.subheading}
          </p>
        </div>

        {/* ================= LAYOUT 1: ORIGINAL INFINITE MARQUEE ================= */}
        {c.layout === 'original' && (
          <div className="partners-marquee-container">
            <button
              type="button"
              className="partner-nav-arrow prev-btn"
              onClick={() => moveManual(-1)}
              aria-label="Scroll Left"
            >
              <ChevronLeft size={28} />
            </button>

            <div
              className={`marquee-viewport ${isPaused ? 'paused' : ''}`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="marquee-track" ref={trackRef}>
                {/* Double the list for seamless infinite loop */}
                {[...partners, ...partners].map((p, idx) => (
                  <div key={idx} className="partner-item">
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="partner-link"
                    >
                      <div className="partner-img-box">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="partner-logo-img"
                          onError={(e) => {
                            if (p.remoteImage && e.target.src !== p.remoteImage) {
                              e.target.src = p.remoteImage;
                            }
                          }}
                        />
                      </div>
                      <span className="partner-name" style={{ color: c.textColor }}>
                        {p.name}
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="partner-nav-arrow next-btn"
              onClick={() => moveManual(1)}
              aria-label="Scroll Right"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        )}

        {/* ================= LAYOUT 2: MULTI-COLUMN BRAND GRID ================= */}
        {c.layout === 'brandGrid' && (
          <div className="partners-grid-layout">
            <div className="partners-tiles-grid">
              {partners.map((p, idx) => (
                <a
                  key={idx}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-tile-card"
                  style={{ backgroundColor: c.cardBg }}
                >
                  <div className="brand-tile-media">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="brand-tile-img"
                      onError={(e) => {
                        if (p.remoteImage && e.target.src !== p.remoteImage) {
                          e.target.src = p.remoteImage;
                        }
                      }}
                    />
                  </div>
                  <div className="brand-tile-footer">
                    <span style={{ color: c.textColor }}>{p.name}</span>
                    <ExternalLink size={14} className="tile-ext-icon" style={{ color: c.accent }} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ================= LAYOUT 3: SPOTLIGHT CAROUSEL ================= */}
        {c.layout === 'cardCarousel' && (
          <div className="partners-spotlight-layout">
            <div className="spotlight-scroll-row">
              {partners.map((p, idx) => (
                <div
                  key={idx}
                  className="spotlight-brand-card"
                  style={{ backgroundColor: c.cardBg }}
                >
                  <div className="spotlight-logo-area">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="spotlight-logo"
                      onError={(e) => {
                        if (p.remoteImage && e.target.src !== p.remoteImage) {
                          e.target.src = p.remoteImage;
                        }
                      }}
                    />
                  </div>
                  <h4 style={{ color: c.headingColor }}>{p.name}</h4>
                  <p style={{ color: c.textColor }}>Certified Distributor & Fabricator</p>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spotlight-visit-btn"
                    style={{ color: c.accent }}
                  >
                    <span>Visit Partner Website</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
