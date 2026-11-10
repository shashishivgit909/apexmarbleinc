import React from 'react';
import { websiteData } from '../data/websiteData';
import { Gem, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';

export default function TimelessElegance() {
  const { timelessSection } = websiteData;

  return (
    <section id="timeless-elegance-section" className="timeless-architectural-section">
      {/* Subtle Architectural Backdrop */}
      <div
        className="timeless-backdrop-media"
        style={{ backgroundImage: `url(${timelessSection.backgroundImage})` }}
      >
        <div className="timeless-warm-overlay" />
      </div>

      <div className="section-container timeless-relative-z">
        <div className="timeless-editorial-card">
          <div className="timeless-card-left">
            <div className="timeless-badge">
              <Gem size={14} />
              <span>ENDURING ARCHITECTURAL CRAFTSMANSHIP</span>
            </div>

            <h2 className="timeless-heading">{timelessSection.heading}</h2>

            <p className="timeless-subtitle">{timelessSection.subheading}</p>

            <div className="timeless-highlights">
              <div className="timeless-highlight-item">
                <div className="highlight-icon-box">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <strong>Investment-Grade Longevity</strong>
                  <p>Surfaces engineered by nature to resist heat, wear, and generations of daily use.</p>
                </div>
              </div>

              <div className="timeless-highlight-item">
                <div className="highlight-icon-box">
                  <Sparkles size={18} />
                </div>
                <div>
                  <strong>Bespoke Architectural Presence</strong>
                  <p>One-of-a-kind mineral veining that elevates kitchens, baths, and commercial spaces.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="timeless-card-right">
            <p className="timeless-prose-lead">{timelessSection.paragraph1}</p>
            <p className="timeless-prose-body">{timelessSection.paragraph2}</p>

            <div className="timeless-cta-row">
              <a href={timelessSection.ctaHref} className="btn-stone-gold">
                <span>{timelessSection.ctaText} for a Private Consultation</span>
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
