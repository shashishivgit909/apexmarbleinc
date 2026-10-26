import React from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { websiteData } from '../data/websiteData';
import SectionToolbar from './SectionToolbar';
import { Award, CheckCircle, ArrowRight, Star, ShieldCheck } from 'lucide-react';

export default function AboutSection() {
  const { config } = useCustomizer();
  const c = config.about;
  const { aboutSection } = websiteData;

  const layoutVariants = [
    { id: 'original', label: 'Media Right (Live Site)' },
    { id: 'mediaLeft', label: 'Media Left Reversed' },
    { id: 'statsFocus', label: 'Story + 4 Stat Badges' }
  ];

  return (
    <section
      id="about-experience-section"
      className={`about-section-wrap layout-${c.layout}`}
      style={{
        backgroundColor: c.bg,
        '--about-heading': c.headingColor,
        '--about-text': c.textColor,
        '--about-ribbon-bg': c.ribbonBg,
        '--about-ribbon-text': c.ribbonText,
        '--about-pill-bg': c.pillBg,
        '--about-pill-text': c.pillText,
        '--about-accent': c.accent
      }}
    >
      <SectionToolbar
        sectionKey="about"
        sectionName="About & Experience Section"
        layoutOptions={layoutVariants}
      />

      <div className="about-content-container">
        {/* ================= LAYOUT 1: ORIGINAL HOSTINGER (MEDIA RIGHT) ================= */}
        {c.layout === 'original' && (
          <div id="apx-hero" className="apx-hero-original">
            <div
              className="ribbon"
              style={{
                backgroundColor: c.ribbonBg,
                color: c.ribbonText
              }}
            >
              {aboutSection.ribbon}
            </div>

            <div className="hero-grid">
              {/* Copy Column */}
              <div className="hero-copy">
                <h6>
                  WELCOME TO <strong>APEX MARBLE</strong>
                </h6>
                <h1 style={{ color: c.headingColor }}>
                  Silicon Valley’s trusted name
                  <br />
                  in natural stone
                </h1>

                <p className="hero-paragraph" style={{ color: c.textColor }}>
                  {aboutSection.paragraph}
                </p>

                <div className="hero-cta-wrap">
                  <a
                    href={aboutSection.ctaHref}
                    target="_top"
                    className="cta"
                    style={{
                      backgroundColor: c.ribbonBg,
                      color: c.ribbonText
                    }}
                  >
                    {aboutSection.ctaText}
                  </a>
                </div>
              </div>

              {/* Media Column */}
              <div className="hero-media">
                <div className="img-wrap" id="apx-drive-imgwrap">
                  <img
                    id="apx-drive-img"
                    src={aboutSection.imageUrl}
                    alt="Apex Marble showroom"
                    onError={(e) => {
                      if (aboutSection.remoteImageUrl && e.target.src !== aboutSection.remoteImageUrl) {
                        e.target.src = aboutSection.remoteImageUrl;
                      }
                    }}
                  />
                </div>

                <div className="bottom-btn">
                  <div
                    className="trusted-pill"
                    style={{
                      backgroundColor: c.pillBg,
                      color: c.pillText
                    }}
                  >
                    {aboutSection.trustedPill}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= LAYOUT 2: MEDIA LEFT REVERSED ================= */}
        {c.layout === 'mediaLeft' && (
          <div className="about-reversed-grid">
            <div className="reversed-media-col">
              <div className="framed-media-holder">
                <img
                  src={aboutSection.imageUrl}
                  alt="Apex Marble Showroom"
                  className="reversed-media-img"
                  onError={(e) => {
                    if (aboutSection.remoteImageUrl && e.target.src !== aboutSection.remoteImageUrl) {
                      e.target.src = aboutSection.remoteImageUrl;
                    }
                  }}
                />
                <div
                  className="media-badge-overlay"
                  style={{ backgroundColor: c.pillBg, color: c.pillText }}
                >
                  <Award size={18} />
                  <span>{aboutSection.ribbon}</span>
                </div>
              </div>
            </div>

            <div className="reversed-copy-col">
              <span className="welcome-tag" style={{ color: c.headingColor }}>
                {aboutSection.welcomeText}
              </span>
              <h2 className="reversed-headline" style={{ color: c.headingColor }}>
                Silicon Valley’s Premier Natural Stone Fabricator & Showroom
              </h2>
              <p className="reversed-paragraph" style={{ color: c.textColor }}>
                {aboutSection.paragraph}
              </p>

              <div
                className="trusted-box"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: c.ribbonBg
                }}
              >
                <CheckCircle size={22} style={{ color: c.headingColor }} />
                <span style={{ color: c.textColor }}>
                  Direct Quarry Import • Custom Edge Profiles • Precision Laser Measurement
                </span>
              </div>

              <div className="reversed-action-row">
                <a
                  href={aboutSection.ctaHref}
                  target="_top"
                  className="cta-pill-btn"
                  style={{ backgroundColor: c.ribbonBg, color: c.ribbonText }}
                >
                  <span>{aboutSection.ctaText}</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ================= LAYOUT 3: STATS FOCUS STORY ================= */}
        {c.layout === 'statsFocus' && (
          <div className="about-stats-layout">
            <div className="stats-header-center">
              <div className="stats-ribbon" style={{ backgroundColor: c.ribbonBg, color: c.ribbonText }}>
                {aboutSection.ribbon}
              </div>
              <h2 style={{ color: c.headingColor }}>Silicon Valley’s Trusted Name In Natural Stone</h2>
              <p style={{ color: c.textColor }}>{aboutSection.paragraph}</p>
            </div>

            {/* 4-Stat Metric Cards */}
            <div className="metric-cards-grid">
              {aboutSection.stats.map((stat, sIdx) => (
                <div
                  key={sIdx}
                  className="stat-metric-card"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <span className="stat-number" style={{ color: c.headingColor }}>
                    {stat.value}
                  </span>
                  <span className="stat-label" style={{ color: c.textColor }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="stats-footer-cta">
              <div
                className="trusted-pill-large"
                style={{ backgroundColor: c.pillBg, color: c.pillText }}
              >
                <ShieldCheck size={18} />
                <span>{aboutSection.trustedPill}</span>
              </div>

              <a
                href={aboutSection.ctaHref}
                target="_top"
                className="cta-learn-btn"
                style={{ backgroundColor: c.ribbonBg, color: c.ribbonText }}
              >
                <span>{aboutSection.ctaText}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
