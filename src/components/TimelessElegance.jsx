import React from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { websiteData } from '../data/websiteData';
import SectionToolbar from './SectionToolbar';
import { ArrowRight, ShieldCheck, Gem, Sparkles } from 'lucide-react';

export default function TimelessElegance() {
  const { config } = useCustomizer();
  const c = config.timeless;
  const { timelessSection } = websiteData;

  const layoutVariants = [
    { id: 'original', label: 'Classic Editorial (Live Site)' },
    { id: 'splitTwoColumn', label: '2-Column Split' },
    { id: 'glassCard', label: 'Glassmorphism Card' }
  ];

  return (
    <section
      id="timeless-elegance-section"
      className={`timeless-section-wrap layout-${c.layout}`}
      style={{
        backgroundColor: c.bg,
        '--timeless-heading': c.headingColor,
        '--timeless-text': c.textColor,
        '--timeless-btn-bg': c.buttonBg,
        '--timeless-btn-text': c.buttonText,
        '--timeless-btn-hover-bg': c.buttonHoverBg,
        '--timeless-btn-hover-text': c.buttonHoverText
      }}
    >
      <SectionToolbar
        sectionKey="timeless"
        sectionName="Timeless Elegance Section"
        layoutOptions={layoutVariants}
      />

      {/* Background Image */}
      <div
        className="timeless-bg-image"
        style={{
          backgroundImage: `url(${timelessSection.backgroundImage})`
        }}
      >
        <div
          className="timeless-bg-overlay"
          style={{
            backgroundColor: c.bg || '#1c1b19',
            opacity: c.overlayOpacity ?? 0.55
          }}
        />
      </div>

      <div className="timeless-content-container">
        {/* ================= LAYOUT 1: ORIGINAL HOSTINGER ================= */}
        {c.layout === 'original' && (
          <div className="timeless-original-inner">
            <h3 className="timeless-title" style={{ color: c.headingColor }}>
              <strong>{timelessSection.heading}</strong>
            </h3>

            <p className="timeless-lead" style={{ color: c.textColor }}>
              As modern living calls for more stylish and durable surfaces, the demand for{' '}
              <strong>premium natural stone</strong> has never been greater.
            </p>

            <p className="timeless-body" style={{ color: c.textColor }}>
              Our solutions not only enhance the{' '}
              <strong>aesthetic and value of your space</strong> but also provide long-lasting
              strength and reliability. By choosing marble, granite, quartz, quartzite, tiles,
              and prefab countertops from Apex Marble, you protect your investment with
              materials that stand the test of time and transform your home or business into a
              showcase of quality and sophistication.
            </p>

            <div className="timeless-action-row">
              <a
                href={timelessSection.ctaHref}
                target="_top"
                className="timeless-btn"
                style={{
                  backgroundColor: c.buttonBg,
                  color: c.buttonText
                }}
              >
                <span>{timelessSection.ctaText}</span>
              </a>
            </div>
          </div>
        )}

        {/* ================= LAYOUT 2: 2-COLUMN SPLIT ================= */}
        {c.layout === 'splitTwoColumn' && (
          <div className="timeless-split-inner">
            <div className="split-left-col">
              <div className="accent-subtag" style={{ color: c.buttonText }}>
                <Gem size={16} />
                <span>INVESTMENT-GRADE QUALITY</span>
              </div>
              <h2 className="split-headline" style={{ color: c.headingColor }}>
                {timelessSection.heading}
              </h2>
              <div className="features-mini-list">
                <div className="mini-feat">
                  <ShieldCheck size={18} style={{ color: c.buttonText }} />
                  <span>Lifelong surface longevity & resilience</span>
                </div>
                <div className="mini-feat">
                  <Sparkles size={18} style={{ color: c.buttonText }} />
                  <span>Appreciates luxury residential property value</span>
                </div>
              </div>
            </div>

            <div className="split-right-col">
              <p className="split-lead-text" style={{ color: c.textColor }}>
                {timelessSection.paragraph1}
              </p>
              <p className="split-body-text" style={{ color: c.textColor }}>
                {timelessSection.paragraph2}
              </p>
              <div className="split-btn-wrap">
                <a
                  href={timelessSection.ctaHref}
                  target="_top"
                  className="split-cta-btn"
                  style={{
                    backgroundColor: c.buttonBg,
                    color: c.buttonText
                  }}
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ================= LAYOUT 3: GLASSMORPHISM CARD ================= */}
        {c.layout === 'glassCard' && (
          <div className="timeless-glass-card">
            <div className="glass-card-header">
              <span className="glass-card-badge" style={{ backgroundColor: c.buttonText, color: '#000' }}>
                EXCELLENCE IN NATURAL STONE
              </span>
              <h2 style={{ color: c.headingColor }}>{timelessSection.heading}</h2>
            </div>

            <div className="glass-card-grid">
              <div className="glass-col">
                <p style={{ color: c.textColor }}>{timelessSection.paragraph1}</p>
              </div>
              <div className="glass-col">
                <p style={{ color: c.textColor }}>{timelessSection.paragraph2}</p>
              </div>
            </div>

            <div className="glass-card-footer">
              <a
                href={timelessSection.ctaHref}
                target="_top"
                className="glass-cta-btn"
                style={{
                  backgroundColor: c.buttonBg,
                  color: c.buttonText
                }}
              >
                <span>{timelessSection.ctaText}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
