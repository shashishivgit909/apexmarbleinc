import React from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { websiteData } from '../data/websiteData';
import SectionToolbar from './SectionToolbar';
import { Phone, MapPin, FileText, ArrowRight } from 'lucide-react';

export default function TopBar() {
  const { config } = useCustomizer();
  const c = config.topBar;
  const company = websiteData.company;

  const layoutVariants = [
    { id: 'original', label: 'Centered (Live Site)' },
    { id: 'split', label: 'Split Ends' },
    { id: 'minimal', label: 'Compact Capsule' }
  ];

  return (
    <div
      id="top-contact-bar"
      className={`top-bar-container layout-${c.layout}`}
      style={{
        backgroundColor: c.bg,
        color: c.text,
        borderBottom: `1px solid ${c.border || 'rgba(255, 255, 255, 0.1)'}`
      }}
    >
      <SectionToolbar
        sectionKey="topBar"
        sectionName="Top Contact Bar"
        layoutOptions={layoutVariants}
      />

      <div className="top-bar-inner">
        {/* Layout 1: Hostinger Original (Centered inline with | separators) */}
        {c.layout === 'original' && (
          <div className="contact-links original-style">
            <a
              href={`tel:+1${company.phonePlain}`}
              className="topbar-link"
              style={{ color: c.text }}
            >
              <Phone size={13} className="topbar-icon" />
              <span>{company.phone}</span>
            </a>

            <span className="separator">|</span>

            <a
              href={company.quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="topbar-link highlight"
              style={{ color: c.text, '--hover-accent': c.accent }}
            >
              <FileText size={13} className="topbar-icon" />
              <span>Get a Quote</span>
            </a>

            <span className="separator">|</span>

            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="topbar-link"
              style={{ color: c.text }}
            >
              <MapPin size={13} className="topbar-icon" />
              <span>{company.address}</span>
            </a>
          </div>
        )}

        {/* Layout 2: Split Ends (Phone left, Quote center, Address right) */}
        {c.layout === 'split' && (
          <div className="contact-links split-style">
            <div className="left-side">
              <a href={`tel:+1${company.phonePlain}`} className="topbar-pill-link" style={{ color: c.text }}>
                <Phone size={14} style={{ color: c.accent }} />
                <span>Call Us: <strong>{company.phone}</strong></span>
              </a>
            </div>

            <div className="center-side">
              <a
                href={company.quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="topbar-quote-badge"
                style={{ backgroundColor: c.accent, color: '#ffffff' }}
              >
                <span>Get a Free Estimate</span>
                <ArrowRight size={13} />
              </a>
            </div>

            <div className="right-side">
              <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="topbar-pill-link" style={{ color: c.text }}>
                <MapPin size={14} style={{ color: c.accent }} />
                <span>{company.address}</span>
              </a>
            </div>
          </div>
        )}

        {/* Layout 3: Minimalist Compact Capsule */}
        {c.layout === 'minimal' && (
          <div className="contact-links minimal-style">
            <div className="minimal-badge-group">
              <a href={`tel:+1${company.phonePlain}`} className="minimal-tag" style={{ color: c.text, borderColor: c.accent }}>
                <Phone size={12} style={{ color: c.accent }} />
                <span>{company.phone}</span>
              </a>
              <a href={company.quoteUrl} target="_blank" rel="noopener noreferrer" className="minimal-tag accent-tag" style={{ backgroundColor: c.accent, color: '#ffffff' }}>
                <FileText size={12} />
                <span>Instant Quote</span>
              </a>
              <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="minimal-tag" style={{ color: c.text }}>
                <MapPin size={12} style={{ color: c.accent }} />
                <span>San Jose Showroom</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
