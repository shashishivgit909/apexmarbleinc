import React from 'react';
import { websiteData } from '../data/websiteData';
import { Award, ShieldCheck, CheckCircle2, ArrowUpRight, MapPin } from 'lucide-react';

export default function AboutSection() {
  const { aboutSection, company } = websiteData;

  return (
    <section id="about-experience-section" className="about-architectural-section">
      <div className="section-container">
        <div className="about-editorial-grid">
          {/* Left Column: Showroom Imagery & Heritage Badges */}
          <div className="about-visual-column">
            <div className="about-image-frame">
              <img
                src={aboutSection.imageUrl}
                alt="Apex Marble San Jose Slab Showroom"
                className="about-showroom-img"
                loading="lazy"
                onError={(e) => {
                  if (aboutSection.remoteImageUrl && e.target.src !== aboutSection.remoteImageUrl) {
                    e.target.src = aboutSection.remoteImageUrl;
                  }
                }}
              />

              {/* Experience Ribbon Badge */}
              <div className="about-experience-float">
                <Award size={20} className="experience-icon" />
                <div>
                  <strong>{aboutSection.ribbon}</strong>
                  <span>San Jose, Silicon Valley</span>
                </div>
              </div>
            </div>

            <div className="about-trusted-banner">
              <ShieldCheck size={18} className="trusted-banner-icon" />
              <span>{aboutSection.trustedPill}</span>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Key Metrics */}
          <div className="about-narrative-column">
            <div className="editorial-kicker">
              <span>{aboutSection.welcomeText}</span>
            </div>

            <h2 className="about-main-headline">
              Silicon Valley’s Trusted Name in Natural Stone
            </h2>

            <p className="about-lead-paragraph">{aboutSection.paragraph}</p>

            <div className="about-pillars-list">
              <div className="about-pillar-item">
                <CheckCircle2 size={18} className="pillar-check" />
                <span>Hand-selected full slabs from premier Italian, Brazilian &amp; global quarries</span>
              </div>
              <div className="about-pillar-item">
                <CheckCircle2 size={18} className="pillar-check" />
                <span>Rigorous inspection for natural veining movement, density &amp; structural integrity</span>
              </div>
              <div className="about-pillar-item">
                <CheckCircle2 size={18} className="pillar-check" />
                <span>Dedicated guidance for homeowners, interior designers, architects &amp; builders</span>
              </div>
            </div>

            {/* 4 Key Architectural Metrics */}
            <div className="about-metrics-row">
              {aboutSection.stats.map((stat, idx) => (
                <div key={idx} className="about-metric-box">
                  <span className="metric-value">{stat.value}</span>
                  <span className="metric-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="about-actions-row">
              <a href={aboutSection.ctaHref} className="btn-stone-primary">
                <span>{aboutSection.ctaText} About Our Showroom</span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href={company.mapsUrl}
                className="about-directions-link"
              >
                <MapPin size={16} />
                <span>Visit San Jose Warehouse</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
