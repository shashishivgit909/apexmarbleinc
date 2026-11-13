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
      <div
        className="apx-timeless-backdrop"
        style={{ backgroundImage: `url(${timelessSection.backgroundImage})` }}
      >
        <div className="apx-timeless-scrim" />
      </div>

      <div className="apx-container apx-timeless-inner">
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
                <Check size={14} className="apx-check-icon" />
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
      </div>
    </section>
  );
}
