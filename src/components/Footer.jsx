import React from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { websiteData } from '../data/websiteData';
import SectionToolbar from './SectionToolbar';
import { Star, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { config } = useCustomizer();
  const c = config.footer;
  const { company, footerSection, navigation } = websiteData;

  const layoutVariants = [
    { id: 'original', label: '3-Part Grid (Live Site)' },
    { id: 'modernGrid', label: '4-Column Corporate' },
    { id: 'centeredLuxe', label: 'Centered Luxury' }
  ];

  const renderStars = (rating) => {
    if (!rating) return null;
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className="star-svg"
            fill={i < fullStars || (i === fullStars && hasHalf) ? c.starColor || '#FFD700' : 'none'}
            stroke={c.starColor || '#FFD700'}
            style={{ opacity: i < fullStars || (i === fullStars && hasHalf) ? 1 : 0.3 }}
          />
        ))}
      </div>
    );
  };

  return (
    <footer
      id="main-site-footer"
      className={`site-footer-wrap layout-${c.layout}`}
      style={{
        backgroundColor: c.bg,
        '--footer-heading': c.headingColor,
        '--footer-text': c.textColor,
        '--footer-card-bg': c.cardBg,
        '--footer-card-text': c.cardText,
        '--footer-accent': c.accent,
        '--footer-star': c.starColor
      }}
    >
      <SectionToolbar
        sectionKey="footer"
        sectionName="Footer & Reviews Section"
        layoutOptions={layoutVariants}
      />

      {/* Textured Background Image */}
      <div
        className="footer-bg-image"
        style={{ backgroundImage: `url(${footerSection.backgroundImage})` }}
      >
        <div
          className="footer-bg-overlay"
          style={{ backgroundColor: c.bg, opacity: c.overlayOpacity ?? 0.25 }}
        />
      </div>

      <div className="footer-content-container">
        {/* ================= LAYOUT 1: EXACT HOSTINGER 3-PART ================= */}
        {c.layout === 'original' && (
          <div className="footer-original-grid">
            {/* Left: Brand & Contact Info */}
            <div className="footer-brand-col">
              <div className="footer-logo-wrap">
                <img
                  src={company.footerLogo}
                  alt={company.name}
                  className="footer-logo-img"
                  onError={(e) => {
                    if (company.footerLogoRemote && e.target.src !== company.footerLogoRemote) {
                      e.target.src = company.footerLogoRemote;
                    }
                  }}
                />
              </div>

              <div className="footer-contact-text">
                <p className="footer-email">
                  <strong>{company.email}</strong>
                </p>
                <p className="footer-phone">
                  <strong>
                    <a href={`tel:${company.phonePlain}`} style={{ color: c.textColor }}>
                      {company.phone}
                    </a>
                  </strong>
                </p>
              </div>
            </div>

            {/* Center: Reviews & Socials */}
            <div className="footer-reviews-col" id="apx-footer-reviews">
              <h3 style={{ color: c.headingColor }}>{footerSection.heading}</h3>

              <div className="grid">
                {footerSection.reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="card"
                    style={{ backgroundColor: c.cardBg, color: c.cardText }}
                  >
                    <div className="brand">
                      {rev.iconType === 'facebook' ? (
                        <svg viewBox="0 0 256 256" className="social-svg">
                          <rect x="8" y="8" width="240" height="240" rx="56" fill="#1877F2" />
                          <path
                            fill="#fff"
                            d="M160 88h-20c-4 0-8 4-8 8v24h28l-4 28h-24v68h-28v-68h-20v-28h20v-24c0-18 14-32 32-32h24v24z"
                          />
                        </svg>
                      ) : rev.iconType === 'youtube' ? (
                        <svg viewBox="0 0 256 256" className="social-svg">
                          <rect x="8" y="28" width="240" height="200" rx="48" fill="#ff0000" />
                          <polygon points="112,92 176,128 112,164" fill="#fff" />
                        </svg>
                      ) : (
                        <img src={rev.iconUrl} alt={rev.name} />
                      )}
                    </div>

                    {rev.stars ? (
                      renderStars(rev.stars)
                    ) : (
                      <div className="stars placeholder" />
                    )}

                    <a
                      className="btn"
                      href={rev.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: c.cardText, borderColor: c.cardText }}
                    >
                      {rev.actionText}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Copyright */}
            <div className="footer-copyright-col">
              <p className="copyright-text" style={{ color: c.textColor }}>
                {company.copyright}
              </p>
            </div>
          </div>
        )}

        {/* ================= LAYOUT 2: 4-COLUMN CORPORATE ================= */}
        {c.layout === 'modernGrid' && (
          <div className="footer-corporate-grid">
            <div className="corp-col brand-col">
              <img src={company.headerLogo} alt={company.name} className="corp-logo" />
              <p className="corp-tagline">{company.tagline}</p>
              <div className="corp-contact-list">
                <a href={`tel:${company.phonePlain}`} style={{ color: c.textColor }}>
                  <Phone size={14} style={{ color: c.accent }} />
                  <span>{company.phone}</span>
                </a>
                <a href={`mailto:${company.email}`} style={{ color: c.textColor }}>
                  <Mail size={14} style={{ color: c.accent }} />
                  <span>{company.email}</span>
                </a>
                <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: c.textColor }}>
                  <MapPin size={14} style={{ color: c.accent }} />
                  <span>{company.address}</span>
                </a>
              </div>
            </div>

            <div className="corp-col">
              <h4 style={{ color: c.headingColor }}>Natural Stone</h4>
              <ul className="corp-link-list">
                <li><a href="https://www.apexmarbleinc.com/quartzite-slabs">Quartzite Slabs</a></li>
                <li><a href="https://www.apexmarbleinc.com/granite-slabs">Granite Slabs</a></li>
                <li><a href="https://www.apexmarbleinc.com/marble-slabs">Marble Slabs</a></li>
                <li><a href="https://www.apexmarbleinc.com/quartz-slabs">Quartz Slabs</a></li>
                <li><a href="https://www.apexmarbleinc.com/porcelain-slabs">Porcelain Slabs</a></li>
                <li><a href="https://www.apexmarbleinc.com/pre-fab">Pre-Fab Countertops</a></li>
              </ul>
            </div>

            <div className="corp-col">
              <h4 style={{ color: c.headingColor }}>Company</h4>
              <ul className="corp-link-list">
                <li><a href="https://www.apexmarbleinc.com/about">About Us</a></li>
                <li><a href="https://www.apexmarbleinc.com/gallery">Project Gallery</a></li>
                <li><a href="https://www.apexmarbleinc.com/faq">FAQ</a></li>
                <li><a href="https://www.apexmarbleinc.com/contact">Contact Us</a></li>
                <li><a href="https://www.apexmarbleinc.com/contact#quote">Get a Quote</a></li>
              </ul>
            </div>

            <div className="corp-col reviews-col">
              <h4 style={{ color: c.headingColor }}>Verified Reviews</h4>
              <div className="corp-review-badges">
                <a
                  href="https://www.yelp.com/biz/apex-marble-san-jose-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="corp-rev-badge"
                  style={{ backgroundColor: c.cardBg }}
                >
                  <img src="https://cdn.freebiesupply.com/logos/large/2x/yelp-icon-logo-png-transparent.png" alt="Yelp" />
                  <div>
                    <strong>4.5 / 5 on Yelp</strong>
                    {renderStars(4.5)}
                  </div>
                </a>

                <a
                  href="https://share.google/fWhLZcLgvWNodNS9W"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="corp-rev-badge"
                  style={{ backgroundColor: c.cardBg }}
                >
                  <img src="https://cdn.freebiesupply.com/logos/large/2x/google-icon-logo-png-transparent.png" alt="Google" />
                  <div>
                    <strong>4.8 / 5 on Google</strong>
                    {renderStars(4.8)}
                  </div>
                </a>
              </div>
            </div>

            <div className="corp-bottom-bar" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
              <span>{company.copyright}</span>
              <span>Silicon Valley's Premier Stone Destination</span>
            </div>
          </div>
        )}

        {/* ================= LAYOUT 3: CENTERED LUXE ================= */}
        {c.layout === 'centeredLuxe' && (
          <div className="footer-luxe-centered">
            <img src={company.headerLogo} alt={company.name} className="luxe-logo" />
            <h3 style={{ color: c.headingColor }}>Apex Marble Inc</h3>
            <p className="luxe-address" style={{ color: c.textColor }}>
              {company.address} • Phone: {company.phone} • Email: {company.email}
            </p>

            <div className="luxe-social-pills">
              {footerSection.reviews.map((rev, idx) => (
                <a
                  key={idx}
                  href={rev.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="luxe-pill"
                  style={{ backgroundColor: c.cardBg, color: c.cardText }}
                >
                  <span>{rev.name}</span>
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>

            <div className="luxe-divider" />
            <p className="luxe-copy" style={{ color: c.textColor }}>
              {company.copyright}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
