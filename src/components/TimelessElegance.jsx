import React from 'react';
import { websiteData } from '../data/websiteData';
import { Sparkles, ArrowUpRight, Check } from 'lucide-react';

export default function TimelessElegance() {
  const { timelessSection } = websiteData;

  const highlights = timelessSection.highlights || [
    'Direct Quarry Selection',
    'Heat & Scratch Resistance',
    'Custom Precision Fabrication',
    'San Jose Showroom Stock'
  ];

  return (
    <section id="timeless-elegance-section" className="apx-timeless-section">
      <div className="apx-container apx-timeless-inner">
        <div className="apx-timeless-split">
          <div className="apx-timeless-card">
            <span className="apx-eyebrow">
              <Sparkles size={13} />
              <span>{timelessSection.subheading}</span>
            </span>

            <h2 className="apx-section-title apx-timeless-title">
              {timelessSection.heading}
            </h2>

            <p className="apx-timeless-body">
              {timelessSection.description}
            </p>

            <ul className="apx-timeless-list">
              {highlights.map((item, idx) => (
                <li key={idx} className="apx-timeless-item">
                  <span className="apx-check-badge">
                    <Check size={13} className="apx-check-icon" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="apx-timeless-action">
              <a
                href="#main-site-footer"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('main-site-footer');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="apx-btn-primary"
              >
                <span>{timelessSection.ctaText}</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className="apx-timeless-visual">
            <img
              src={timelessSection.backgroundImage}
              alt={timelessSection.heading}
              className="apx-timeless-img"
              loading="lazy"
              onError={(e) => {
                if (timelessSection.remoteBackgroundImage && e.target.src !== timelessSection.remoteBackgroundImage) {
                  e.target.src = timelessSection.remoteBackgroundImage;
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
