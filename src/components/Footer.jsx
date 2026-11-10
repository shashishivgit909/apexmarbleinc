import React from 'react';
import { websiteData } from '../data/websiteData';
import { Star, Phone, Mail, MapPin, ArrowUpRight, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { company, footerSection } = websiteData;

  const renderStars = (rating) => {
    if (!rating) return null;
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    return (
      <div className="footer-stars" aria-label={`Rated ${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className="footer-star-svg"
            fill={i < fullStars || (i === fullStars && hasHalf) ? '#D4A359' : 'none'}
            stroke="#D4A359"
            style={{ opacity: i < fullStars || (i === fullStars && hasHalf) ? 1 : 0.35 }}
          />
        ))}
      </div>
    );
  };

  return (
    <footer id="main-site-footer" className="architectural-footer">
      <div className="section-container">
        {/* Top Section: Brand Identity, Quick Links, Showroom Info */}
        <div className="footer-top-grid">
          {/* Column 1: Original Untouched Company Logo & Story */}
          <div className="footer-brand-column">
            <a href="#hero-slideshow-section" className="footer-logo-link" aria-label={company.name}>
              <img
                src={company.footerLogo}
                alt={company.name}
                className="footer-original-logo"
                onError={(e) => {
                  if (company.footerLogoRemote && e.target.src !== company.footerLogoRemote) {
                    e.target.src = company.footerLogoRemote;
                  }
                }}
              />
              <div className="footer-brand-lockup">
                <span className="footer-brand-name">APEX MARBLE INC</span>
                <span className="footer-brand-tag">SILICON VALLEY STONE GALLERY</span>
              </div>
            </a>

            <p className="footer-brand-desc">
              Silicon Valley’s premier destination for hand-selected natural stone slabs, marble,
              quartzite, granite, quartz, porcelain, and custom prefabricated countertops.
            </p>

            <div className="footer-contact-cards">
              <a href={`tel:+1${company.phonePlain}`} className="footer-contact-pill">
                <Phone size={15} className="footer-contact-icon" />
                <span>{company.phone}</span>
              </a>
              <a href={`mailto:${company.email}`} className="footer-contact-pill">
                <Mail size={15} className="footer-contact-icon" />
                <span>{company.email}</span>
              </a>
              <a
                href={company.mapsUrl}
                className="footer-contact-pill"
              >
                <MapPin size={15} className="footer-contact-icon" />
                <span>{company.address}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Stone Collections */}
          <div className="footer-nav-column">
            <h3 className="footer-col-heading">Stone Slabs</h3>
            <ul className="footer-links-list">
              <li><a href="#" onClick={(e) => e.preventDefault() /* href="https://www.apexmarbleinc.com/quartzite-slabs" */}>Quartzite Slabs</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault() /* href="https://www.apexmarbleinc.com/marble-slabs" */}>Marble Slabs</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault() /* href="https://www.apexmarbleinc.com/granite-slabs" */}>Granite Slabs</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault() /* href="https://www.apexmarbleinc.com/quartz-slabs" */}>Quartz Slabs</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault() /* href="https://www.apexmarbleinc.com/porcelain-slabs" */}>Porcelain Slabs</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault() /* href="https://www.apexmarbleinc.com/dekton-slabs" */}>Dekton Slabs</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault() /* href="https://www.apexmarbleinc.com/promotional-slabs" */}>Promotional Slabs</a></li>
            </ul>
          </div>

          {/* Column 3: Architectural Surfaces & Links */}
          <div className="footer-nav-column">
            <h3 className="footer-col-heading">Surfaces &amp; Showroom</h3>
            <ul className="footer-links-list">
              <li><a href="#" onClick={(e) => e.preventDefault() /* href="https://www.apexmarbleinc.com/countertops" */}>Custom Countertops</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault() /* href="https://www.apexmarbleinc.com/pre-fab" */}>Pre-Fab Countertops</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault() /* href="https://www.apexmarbleinc.com/tiles" */}>Luxury Tiles</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault() /* href="https://www.apexmarbleinc.com/flooring" */}>Architectural Flooring</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault() /* href="https://www.apexmarbleinc.com/showerpanels" */}>Shower Panels</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault() /* href="https://www.apexmarbleinc.com/gallery" */}>Project Gallery</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault() /* href="https://www.apexmarbleinc.com/about" */}>About Apex Marble</a></li>
            </ul>
          </div>

          {/* Column 4: Showroom Visit CTA */}
          <div className="footer-cta-column">
            <div className="footer-showroom-card">
              <span className="showroom-card-kicker">SAN JOSE WAREHOUSE</span>
              <h4>Hand-Select Your Slab in Person</h4>
              <p>
                Walk our full-slab indoor warehouse with our stone specialists to find the exact
                veining and finish for your project.
              </p>
              <a
                href={company.quoteUrl}
                className="footer-quote-btn"
              >
                <span>Request Project Estimate</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Middle Section: Customer Reviews & Social Channels */}
        <div className="footer-reviews-band" id="apx-footer-reviews">
          <div className="reviews-band-header">
            <h3>{footerSection.heading}</h3>
            <p>Verified feedback from Silicon Valley homeowners, designers, and contractors</p>
          </div>

          <div className="reviews-cards-row">
            {footerSection.reviews.map((rev, idx) => (
              <a
                key={idx}
                href={rev.href}
                className="review-badge-card"
              >
                <div className="review-card-top">
                  <span className="review-platform-name">{rev.name}</span>
                  <ExternalLink size={13} className="review-ext-icon" />
                </div>

                {rev.stars ? (
                  <div className="review-rating-block">
                    <span className="review-score-num">{rev.ratingDisplay}</span>
                    {renderStars(rev.stars)}
                  </div>
                ) : (
                  <div className="review-rating-block">
                    <span className="review-handle-text">{rev.ratingDisplay}</span>
                  </div>
                )}

                <span className="review-action-link">
                  Visit {rev.actionText}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="footer-bottom-bar">
          <p>{company.copyright}. All rights reserved.</p>
          <p className="footer-bottom-tagline">
            {company.address} • {company.phone}
          </p>
        </div>
      </div>
    </footer>
  );
}
