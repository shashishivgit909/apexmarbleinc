import React from 'react';
import { websiteData } from '../data/websiteData';
import { Star, MapPin, Phone, Mail, ArrowUpRight, Award } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const { company, navigation, footerSection } = websiteData;
  const slabSubItems = navigation.find((n) => n.id === 'slabs')?.subItems || [];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    }
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    return (
      <span className="apx-stars-wrap" aria-label={`Rated ${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={13}
            fill={i < fullStars || (i === fullStars && hasHalf) ? '#3D2614' : 'none'}
            stroke="#3D2614"
            style={{ opacity: i < fullStars || (i === fullStars && hasHalf) ? 1 : 0.35 }}
          />
        ))}
      </span>
    );
  };

  const renderPlatformLogo = (platform) => {
    switch (platform) {
      case 'yelp':
        return (
          <span className="apx-platform-logo-badge is-yelp" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <circle cx="12" cy="12" r="11" fill="#D32323" />
              <path
                d="M11.15 5.4c-.36-.08-.85.08-1.03.38L7.9 9.54c-.26.44.04.97.55 1.01l2.58.2c.48.03.85-.39.77-.87l-.5-4.1c-.03-.2-.08-.34-.15-.38zm1.98 6.45l3.7-.92c.46-.12.92.22.94.7l.1 2.75c.02.47-.42.83-.88.7l-3.78-1.08c-.44-.13-.66-.62-.48-1.05.1-.22.24-.35.4-.4zm-3.28 1.02l-3.44 1.38c-.45.18-.62.72-.35 1.12l1.55 2.28c.27.4.83.46 1.18.12l2.63-2.55c.34-.33.28-.89-.11-1.15-.18-.12-.33-.19-.46-.2zm3.05 1.72l1.62 3.38c.21.44.76.59 1.16.31l2.22-1.56c.39-.28.45-.84.12-1.19l-2.62-2.75c-.33-.35-.9-.3-1.16.1-.12.19-.23.38-.34.51z"
                fill="#FFFFFF"
              />
            </svg>
          </span>
        );
      case 'google':
        return (
          <span className="apx-platform-logo-badge is-google" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="#4285F4"
                d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 15.65 5 12c0-3.65 3.36-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
              />
              <path
                fill="#34A853"
                d="M3.18 7.34l2.44 1.79C6.28 7.15 8.98 4.73 12.2 4.73c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C8.16 2 4.8 4.21 3.18 7.34z"
              />
              <path
                fill="#FBBC05"
                d="M12.1 22c2.85 0 5.26-.95 7.01-2.58l-2.68-2.21c-.97.69-2.32 1.26-4.33 1.26-3.44 0-6.36-2.32-7.41-5.45L2.2 14.94C3.83 19.12 7.64 22 12.1 22z"
              />
              <path
                fill="#EA4335"
                d="M21.35 11.1h-9.17v2.73h6.51c-.23 1.56-1.12 2.97-2.42 3.86l2.68 2.21c1.61-1.49 2.55-3.71 2.55-6.99 0-1.15-.15-1.81-.15-1.81z"
              />
            </svg>
          </span>
        );
      case 'instagram':
        return (
          <span className="apx-platform-logo-badge is-instagram" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <defs>
                <radialGradient id="igGrad" cx="30%" cy="107%" r="150%">
                  <stop offset="0%" stopColor="#fdf497" />
                  <stop offset="5%" stopColor="#fdf497" />
                  <stop offset="45%" stopColor="#fd5949" />
                  <stop offset="60%" stopColor="#d6249f" />
                  <stop offset="90%" stopColor="#285AEB" />
                </radialGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#igGrad)" />
              <rect x="5.2" y="5.2" width="13.6" height="13.6" rx="3.8" fill="none" stroke="#FFFFFF" strokeWidth="1.7" />
              <circle cx="12" cy="12" r="3.2" fill="none" stroke="#FFFFFF" strokeWidth="1.7" />
              <circle cx="16.1" cy="7.9" r="0.95" fill="#FFFFFF" />
            </svg>
          </span>
        );
      case 'facebook':
        return (
          <span className="apx-platform-logo-badge is-facebook" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <circle cx="12" cy="12" r="11" fill="#1877F2" />
              <path
                fill="#FFFFFF"
                d="M15.12 12.88l.36-2.36h-2.26V9c0-.65.32-1.28 1.34-1.28h1.04V5.71s-.94-.16-1.84-.16c-1.88 0-3.11 1.14-3.11 3.2v1.77H8.56v2.36h2.09v5.71c.42.07.85.1 1.29.1s.87-.03 1.28-.1v-5.71h1.9z"
              />
            </svg>
          </span>
        );
      case 'youtube':
        return (
          <span className="apx-platform-logo-badge is-youtube" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <rect x="1.5" y="4.5" width="21" height="15" rx="4.2" fill="#FF0000" />
              <polygon points="10,8.7 16.2,12 10,15.3" fill="#FFFFFF" />
            </svg>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <footer id="main-site-footer" className="apx-footer">
      {/* Customer Reviews & Reputation Header Band */}
      <div className="apx-footer-reviews-band">
        <div className="apx-container">
          <div className="apx-reviews-header">
            <div>
              <span className="apx-eyebrow">
                <Award size={13} />
                <span>Verified Client &amp; Designer Reputation</span>
              </span>
              <h3 className="apx-reviews-headline">{footerSection.heading}</h3>
            </div>
          </div>

          <div className="apx-reviews-grid">
            {footerSection.reviews.map((rev, idx) => (
              <a
                key={idx}
                href={rev.href}
                target="_blank"
                rel="noopener noreferrer"
                className="apx-review-tile"
              >
                <div className="apx-review-top">
                  <div className="apx-review-brand-row">
                    {renderPlatformLogo(rev.platform || rev.name.toLowerCase())}
                    <span className="apx-review-name">{rev.name}</span>
                  </div>
                  <ArrowUpRight size={13} className="apx-review-icon" />
                </div>
                <div className="apx-review-bottom">
                  {rev.stars ? (
                    <>
                      {renderStars(rev.stars)}
                      <span className="apx-review-score">{rev.ratingDisplay}</span>
                    </>
                  ) : (
                    <span className="apx-review-handle">{rev.ratingDisplay}</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main 4-Column Directory */}
      <div className="apx-container apx-footer-main">
        <div className="apx-footer-grid">
          {/* Column 1: Untouched Company Logo + Brand Overview */}
          <div className="apx-footer-col apx-footer-brand">
            <a
              href="/"
              className="apx-footer-logo-link"
              onClick={(e) => handleLinkClick(e, '/')}
            >
              <img
                src={company.footerLogo}
                alt={company.name}
                className="apx-footer-logo"
                onError={(e) => {
                  if (company.footerLogoRemote && e.target.src !== company.footerLogoRemote) {
                    e.target.src = company.footerLogoRemote;
                  }
                }}
              />
              <div className="apx-footer-brand-text">
                <span className="apx-footer-title">APEX MARBLE INC</span>
                <span className="apx-footer-sub">{company.yearsExperience}</span>
              </div>
            </a>
            <p className="apx-footer-about">
              {company.tagline}. Curating exceptional natural marble, rare quartzite, granite, quartz, and architectural porcelain slabs in San Jose, California.
            </p>
          </div>

          {/* Column 2: Showroom Pages */}
          <div className="apx-footer-col">
            <h4 className="apx-footer-col-title">Showroom Pages</h4>
            <ul className="apx-footer-link-list apx-links-2col">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Slab Varieties */}
          <div className="apx-footer-col">
            <h4 className="apx-footer-col-title">Slab Collections</h4>
            <ul className="apx-footer-link-list">
              {slabSubItems.map((sub, idx) => (
                <li key={idx}>
                  <a
                    href={sub.href}
                    onClick={(e) => handleLinkClick(e, sub.href)}
                  >
                    {sub.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Showroom Location & Direct Contact */}
          <div className="apx-footer-col">
            <h4 className="apx-footer-col-title">San Jose Showroom</h4>
            <ul className="apx-footer-contact">
              <li>
                <MapPin size={15} />
                <span>{company.address}</span>
              </li>
              <li>
                <Phone size={15} />
                <a href={`tel:+1${company.phonePlain}`}>{company.phone}</a>
              </li>
              <li>
                <Mail size={15} />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
            </ul>

            <a
              href={`tel:+1${company.phonePlain}`}
              className="apx-footer-cta-btn"
            >
              <span>Schedule Showroom Visit</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="apx-footer-bottom-row">
          <p>{company.copyright}. All Rights Reserved.</p>
          <p>Silicon Valley’s Trusted Natural Stone &amp; Countertop Showroom</p>
        </div>
      </div>
    </footer>
  );
}
