import React, { useRef, useState } from 'react';
import { websiteData } from '../data/websiteData';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

export default function BrandPartners() {
  const { partnersSection } = websiteData;
  const partners = partnersSection.partners;

  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollPartners = (direction) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 280 * direction, behavior: 'smooth' });
    }
  };

  return (
    <section id="brand-partners-section" className="apx-partners-section">
      <div className="apx-container">
        <div className="apx-partners-header">
          <div className="apx-partners-titles">
            <span className="apx-eyebrow">
              <ShieldCheck size={13} />
              <span>{partnersSection.altHeading}</span>
            </span>
            <h2 className="apx-section-title">{partnersSection.heading}</h2>
            <p className="apx-section-sub">{partnersSection.subheading}</p>
          </div>

          <div className="apx-partners-nav-btns">
            <button
              type="button"
              className="apx-partner-ctrl"
              onClick={() => scrollPartners(-1)}
              aria-label="Previous Partner Brands"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="apx-partner-ctrl"
              onClick={() => scrollPartners(1)}
              aria-label="Next Partner Brands"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Continuous Marquee */}
        <div
          className={`apx-marquee-container ${isPaused ? 'is-paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="apx-marquee-track" ref={trackRef}>
            {[...partners, ...partners].map((partner, idx) => (
              <div
                key={idx}
                className="apx-partner-card"
              >
                <div className="apx-partner-img-wrap">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="apx-partner-logo"
                    loading="lazy"
                    onError={(e) => {
                      if (partner.remoteImage && e.target.src !== partner.remoteImage) {
                        e.target.src = partner.remoteImage;
                      }
                    }}
                  />
                </div>
                <span className="apx-partner-title">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
