import React, { useState, useEffect } from 'react';
import { websiteData } from '../data/websiteData';
import { ChevronDown, Menu, X, PhoneCall, ArrowUpRight } from 'lucide-react';

const PRIMARY_NAV_IDS = ['home', 'slabs', 'countertops', 'tiles', 'gallery', 'contact'];

export default function Header() {
  const { company, navigation } = websiteData;

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const primaryNavItems = PRIMARY_NAV_IDS
    .map((id) => navigation.find((item) => item.id === id))
    .filter(Boolean);
  const moreNavItems = navigation.filter((item) => !PRIMARY_NAV_IDS.includes(item.id));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navigation-header"
      className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}
    >
      <div className="header-container">
        <div className="header-inner">
          {/* LEFT-ALIGNED SECTION: Untouched Original Company Logo */}
          <div className="header-left-group">
            <div className="logo-brand">
              <a href="#hero-slideshow-section" className="logo-link" aria-label={company.name}>
                <img
                  src={company.headerLogo}
                  alt={company.name}
                  className="site-logo"
                  onError={(e) => {
                    if (company.headerLogoRemote && e.target.src !== company.headerLogoRemote) {
                      e.target.src = company.headerLogoRemote;
                    }
                  }}
                />
                <div className="logo-brand-text">
                  <span className="brand-title">APEX MARBLE</span>
                  <span className="brand-subtitle">NATURAL STONE &amp; SLABS</span>
                </div>
              </a>
            </div>
          </div>

          {/* FREE SPACE IN BETWEEN CREATED BY JUSTIFY-CONTENT: SPACE-BETWEEN */}

          {/* RIGHT-ALIGNED SECTION: Primary Navigation + 3-Horizontal-Lines Menu Icon + Request Estimate CTA */}
          <div className="header-right-group">
            <nav className="desktop-nav" aria-label="Main Navigation">
              <ul className="nav-list">
                {primaryNavItems.map((item) => {
                  const hasSub = item.subItems && item.subItems.length > 0;
                  const isCurrentActive = activeDropdown === item.id;

                  return (
                    <li
                      key={item.id}
                      className={`nav-item ${hasSub ? 'has-dropdown' : ''}`}
                      onMouseEnter={() => hasSub && setActiveDropdown(item.id)}
                      onMouseLeave={() => hasSub && setActiveDropdown(null)}
                    >
                      <a
                        href={item.id === 'home' ? '/' : '#'}
                        /* href={item.href} — route navigation to other pages commented out */
                        className={`nav-link ${item.id === 'home' ? 'is-active' : ''}`}
                        onClick={(e) => {
                          if (item.id !== 'home') {
                            e.preventDefault();
                          }
                          if (hasSub && window.innerWidth < 1100) {
                            setActiveDropdown(isCurrentActive ? null : item.id);
                          }
                        }}
                      >
                        <span>{item.name}</span>
                        {hasSub && <ChevronDown size={14} className="dropdown-caret" />}
                      </a>

                      {hasSub && (
                        <div className={`dropdown-menu ${isCurrentActive ? 'is-visible' : ''}`}>
                          <ul className="dropdown-list">
                            {item.subItems.map((sub, idx) => (
                              <li key={idx} className="dropdown-item">
                                <a
                                  href="#"
                                  /* href={sub.href} — subpage route navigation commented out */
                                  onClick={(e) => e.preventDefault()}
                                  className="dropdown-link"
                                >
                                  <span>{sub.name}</span>
                                  <ArrowUpRight size={13} className="dropdown-link-icon" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}

                {/* 3-Horizontal-Lines Menu Icon right before Request Estimate */}
                {moreNavItems.length > 0 && (
                  <li
                    className="nav-item has-dropdown nav-more-item"
                    onMouseEnter={() => setActiveDropdown('more-menu')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      className={`nav-more-btn ${activeDropdown === 'more-menu' ? 'is-open' : ''}`}
                      aria-label="More navigation pages"
                      aria-expanded={activeDropdown === 'more-menu'}
                      onClick={() =>
                        setActiveDropdown(activeDropdown === 'more-menu' ? null : 'more-menu')
                      }
                    >
                      <Menu size={20} />
                    </button>

                    <div
                      className={`dropdown-menu dropdown-menu-right ${
                        activeDropdown === 'more-menu' ? 'is-visible' : ''
                      }`}
                    >
                      <div className="dropdown-menu-label">More Pages</div>
                      <ul className="dropdown-list">
                        {moreNavItems.map((item) => (
                          <li key={item.id} className="dropdown-item">
                            <a
                              href="#"
                              /* href={item.href} — route navigation to other pages commented out */
                              onClick={(e) => e.preventDefault()}
                              className="dropdown-link"
                            >
                              <span>{item.name}</span>
                              <ArrowUpRight size={13} className="dropdown-link-icon" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )}
              </ul>
            </nav>

            <div className="header-right-action">
              <a
                href={company.quoteUrl}
                onClick={(e) => e.preventDefault()}
                className="header-cta-button"
              >
                <span>Request Estimate</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <div className="mobile-drawer-inner">
              <ul className="mobile-nav-list">
                {navigation.map((item) => {
                  const hasSub = item.subItems && item.subItems.length > 0;
                  const isExpanded = activeDropdown === item.id;

                  return (
                    <li key={item.id} className="mobile-nav-item">
                      <div className="mobile-item-row">
                        <a
                          href={item.id === 'home' ? '/' : '#'}
                          /* href={item.href} — route navigation commented out */
                          className="mobile-item-link"
                          onClick={(e) => {
                            if (item.id !== 'home') {
                              e.preventDefault();
                            }
                            if (!hasSub) setMobileMenuOpen(false);
                          }}
                        >
                          {item.name}
                        </a>
                        {hasSub && (
                          <button
                            type="button"
                            className="mobile-expand-btn"
                            onClick={() => setActiveDropdown(isExpanded ? null : item.id)}
                            aria-label={`Toggle ${item.name} submenu`}
                          >
                            <ChevronDown
                              size={18}
                              style={{
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                                transition: 'transform 0.25s'
                              }}
                            />
                          </button>
                        )}
                      </div>

                      {hasSub && isExpanded && (
                        <ul className="mobile-submenu">
                          {item.subItems.map((sub, idx) => (
                            <li key={idx}>
                              <a
                                href="#"
                                /* href={sub.href} — route navigation commented out */
                                className="mobile-sublink"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setMobileMenuOpen(false);
                                }}
                              >
                                {sub.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mobile-drawer-footer">
                <a href={`tel:+1${company.phonePlain}`} className="mobile-call-action">
                  <PhoneCall size={16} />
                  <span>Call {company.phone}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
