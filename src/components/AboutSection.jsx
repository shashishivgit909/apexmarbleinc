import React from 'react';
import { websiteData } from '../data/websiteData';
import { Award, ShieldCheck, Gem, Compass, ArrowUpRight, MapPin } from 'lucide-react';

export default function AboutSection() {
  const { aboutSection, company } = websiteData;

  const pillars = [
    {
      icon: Gem,
      title: 'Direct Quarry Curation',
      text: 'Every slab is individually inspected for mineral crystallization, vein movement, and structural density.'
    },
    {
      icon: Compass,
      title: 'Architectural Pairing Guidance',
      text: 'Tailored material selection for architects, interior designers, general contractors, and homeowners.'
    },
    {
      icon: ShieldCheck,
      title: 'Silicon Valley Provenance',
      text: 'Over 18 years serving San Jose and the Greater Bay Area with trusted natural and engineered surfaces.'
    }
  ];

  return (
    <section id="about-experience-section" className="apx-about-section">
      <div className="apx-container">
        <div className="apx-about-grid">
          {/* Left Column: Framed Showroom Photography & Metrics */}
          <div className="apx-about-media-col">
            <div className="apx-about-frame">
              <img
                src={aboutSection.imageUrl}
                alt="Apex Marble San Jose Slab Showroom"
                className="apx-about-img"
                loading="lazy"
                onError={(e) => {
                  if (aboutSection.remoteImageUrl && e.target.src !== aboutSection.remoteImageUrl) {
                    e.target.src = aboutSection.remoteImageUrl;
                  }
                }}
              />
              <div className="apx-about-badge">
                <Award size={20} />
                <div>
                  <span className="apx-badge-title">{aboutSection.ribbon}</span>
                  <span className="apx-badge-sub">{aboutSection.trustedPill}</span>
                </div>
              </div>
            </div>

            {/* 4 Architectural Metrics */}
            <div className="apx-stats-grid">
              {aboutSection.stats.map((stat, idx) => (
                <div key={idx} className="apx-stat-box">
                  <span className="apx-stat-val">{stat.value}</span>
                  <span className="apx-stat-lbl">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Atelier Pillars */}
          <div className="apx-about-copy-col">
            <span className="apx-eyebrow">
              <Award size={13} />
              <span>{aboutSection.welcomeText}</span>
            </span>

            <h2 className="apx-section-title apx-about-title">
              {aboutSection.headline}
            </h2>

            <p className="apx-about-body">{aboutSection.paragraph}</p>

            {/* 3 Architectural Pillars */}
            <div className="apx-pillars-stack">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={idx} className="apx-pillar-card">
                    <div className="apx-pillar-icon-box">
                      <IconComponent size={17} />
                    </div>
                    <div>
                      <h3 className="apx-pillar-name">{pillar.title}</h3>
                      <p className="apx-pillar-desc">{pillar.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="apx-about-actions">
              <a
                href="#materials-showcase-section"
                className="apx-btn-dark"
              >
                <span>Explore Slabs</span>
                <ArrowUpRight size={15} />
              </a>

              <div className="apx-location-pill">
                <MapPin size={14} />
                <span>{company.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
