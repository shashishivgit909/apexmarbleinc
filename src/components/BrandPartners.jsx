import React, { useRef, useState } from 'react';
import { websiteData } from '../data/websiteData';
import { ChevronLeft, ChevronRight, ShieldCheck, ExternalLink } from 'lucide-react';

export default function BrandPartners() {
  const { partnersSection } = websiteData;
  const partners = partnersSection.partners;

  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const moveManual = (direction) => {
    if (trackRef.current) {
      const moveAmount = 260 * direction;
      trackRef.current.scrollBy({ left: moveAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="brand-partners-section" className="partners-architectural-section">
      <div className="section-container">
        <div className="section-editorial-header">
          <div className="editorial-kicker">
            <ShieldCheck size={14} />
            <span>AUTHORIZED &amp; CERTIFIED DISTRIBUTOR</span>
          </div>
          <h2 className="editorial-heading">{partnersSection.heading}</h2>
          <p className="editorial-subheading">{partnersSection.subheading}</p>
        </div>

        {/* Interactive Architectural Marquee */}
        <div className="partners-marquee-shell">
          <button
            type="button"
            className="marquee-arrow-btn"
            onClick={() => moveManual(-1)}
            aria-label="Previous Partners"
          >
            <ChevronLeft size={22} />
          </button>

          <div
            className={`partners-marquee-viewport ${isPaused ? 'is-paused' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="partners-marquee-track" ref={trackRef}>
              {[...partners, ...partners].map((partner, idx) => (
                <a
                  key={idx}
                  href={partner.href}
                  className="partner-stone-tile"
                >
                  <div className="partner-logo-stage">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="partner-brand-img"
                      loading="lazy"
                      onError={(e) => {
                        if (partner.remoteImage && e.target.src !== partner.remoteImage) {
                          e.target.src = partner.remoteImage;
                        }
                      }}
                    />
                  </div>
                  <div className="partner-tile-meta">
                    <span className="partner-tile-name">{partner.name}</span>
                    <ExternalLink size={12} className="partner-ext-icon" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="marquee-arrow-btn"
            onClick={() => moveManual(1)}
            aria-label="Next Partners"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
