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
              <div
                key={idx}
                className="apx-review-tile"
              >
                <div className="apx-review-top">
                  <span className="apx-review-name">{rev.name}</span>
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
              </div>
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
