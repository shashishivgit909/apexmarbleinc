import React, { useState, useEffect, useRef } from 'react';
import { websiteData } from '../data/websiteData';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';

// Important headings displayed in the desktop navigation headers
const IMPORTANT_NAV_IDS = ['home', 'slabs', 'tiles', 'countertops', 'gallery', 'about', 'contact'];

export default function Header() {
  const { company, navigation } = websiteData;

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  // 1. Important headings for desktop navigation headers
  const importantNavItems = IMPORTANT_NAV_IDS
    .map((id) => navigation.find((item) => item.id === id))
    .filter(Boolean);

  // 2. Rest remaining headings for desktop side menu icon (zero extra text)
  const remainingNavItems = navigation.filter(
    (item) => !IMPORTANT_NAV_IDS.includes(item.id)
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setSideMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e, item) => {
    if (item.id === 'home') {
      return;
    }
    if (item.id === 'about') {
      e.preventDefault();
      const el = document.getElementById('about-experience-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (item.id === 'gallery' || item.id === 'slabs') {
      e.preventDefault();
      const el = document.getElementById('materials-showcase-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (item.id === 'contact') {
      e.preventDefault();
      const el = document.getElementById('main-site-footer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    // Prevent routing to separate pages
    e.preventDefault();
  };

  return (
    <header
      id="main-navigation-header"
      className={`apx-header ${isScrolled ? 'is-scrolled' : ''}`}
    >
      <div className="apx-container apx-header-inner">
        {/* LEFT: Original Company Logo (100% Untouched) + Architectural Typography */}
        <div className="apx-brand-block">
          <a href="#hero-slideshow-section" className="apx-brand-link" aria-label={company.name}>
            <img
              src={company.headerLogo}
              alt={company.name}
              className="apx-brand-logo"
              onError={(e) => {
                if (company.headerLogoRemote && e.target.src !== company.headerLogoRemote) {
                  e.target.src = company.headerLogoRemote;
                }
              }}
            />
            <div className="apx-brand-text">
              <span className="apx-brand-title">APEX MARBLE</span>
              <span className="apx-brand-subtitle">Natural Stone Atelier</span>
            </div>
          </a>
        </div>

        {/* RIGHT GROUP */}
        <div className="apx-header-actions-group">
          {/* Desktop Navigation: Important Headings Only */}
          <nav className="apx-desktop-nav" aria-label="Main Navigation">
            <ul className="apx-nav-list">
              {importantNavItems.map((item) => {
                const hasSub = item.subItems && item.subItems.length > 0;
                const isOpen = activeDropdown === item.id;
                const isHome = item.id === 'home';

                return (
                  <li
                    key={item.id}
                    className={`apx-nav-item ${hasSub ? 'has-folder' : ''}`}
                    onMouseEnter={() => hasSub && setActiveDropdown(item.id)}
                    onMouseLeave={() => hasSub && setActiveDropdown(null)}
                  >
                    <a
                      href={isHome ? '#hero-slideshow-section' : '#'}
                      className={`apx-nav-link ${isHome ? 'is-active' : ''}`}
                      onClick={(e) => handleNavClick(e, item)}
                    >
                      <span>{item.name}</span>
                      {hasSub && <ChevronDown size={13} className={`apx-caret ${isOpen ? 'is-open' : ''}`} />}
                    </a>

                    {hasSub && (
                      <div className={`apx-dropdown-card ${isOpen ? 'is-visible' : ''}`}>
                        <ul className="apx-dropdown-list">
                          {item.subItems.map((sub, idx) => (
                            <li key={idx}>
                              <a
                                href="#"
                                /* href={sub.href} — route navigation commented out */
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveDropdown(null);
                                  const el = document.getElementById('materials-showcase-section');
                                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="apx-dropdown-link"
                              >
                                <span>{sub.name}</span>
                                <ArrowUpRight size={13} className="apx-dropdown-icon" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop Side Icon (Menu) for Remaining Headings (ZERO extra text) */}
          <div className="apx-desktop-menu-wrap" ref={menuRef}>
            <button
              type="button"
              className={`apx-menu-icon-btn ${sideMenuOpen ? 'is-active' : ''}`}
              onClick={() => setSideMenuOpen((prev) => !prev)}
              aria-label={sideMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={sideMenuOpen}
              title="More Headings"
            >
              {sideMenuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
            </button>

            {/* Desktop Side Icon Dropdown: Remaining Headings ONLY (No extra text) */}
            {sideMenuOpen && (
              <div
                className="apx-side-menu-dropdown"
                role="dialog"
                aria-label="Remaining Headings"
              >
                <ul className="apx-side-menu-list">
                  {remainingNavItems.map((item) => (
                    <li key={item.id} className="apx-side-menu-item">
                      <a
                        href="#"
                        /* href={item.href} — route navigation commented out */
                        onClick={(e) => {
                          e.preventDefault();
                          setSideMenuOpen(false);
                          const el = document.getElementById('materials-showcase-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="apx-side-menu-link"
                      >
                        <span>{item.name}</span>
                        <ArrowUpRight size={14} className="apx-side-menu-icon" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu Button: Toggles Mobile Drawer with ALL headings as previous */}
          <button
            type="button"
            className={`apx-mobile-btn ${mobileMenuOpen ? 'is-active' : ''}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={1.8} /> : <Menu size={24} strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer: Contains ALL Headings in Mobile View as Previous */}
      {mobileMenuOpen && (
        <div className="apx-mobile-drawer" role="dialog" aria-label="Mobile Navigation Menu">
          <div className="apx-container">
            <ul className="apx-mobile-list">
              {navigation.map((item) => {
                const hasSub = item.subItems && item.subItems.length > 0;
                const isExpanded = activeDropdown === item.id;

                return (
                  <li key={item.id} className="apx-mobile-item">
                    <div className="apx-mobile-row">
                      <a
                        href={item.id === 'home' ? '#hero-slideshow-section' : '#'}
                        className="apx-mobile-link"
                        onClick={(e) => {
                          handleNavClick(e, item);
                          if (!hasSub) setMobileMenuOpen(false);
                        }}
                      >
                        {item.name}
                      </a>
                      {hasSub && (
                        <button
                          type="button"
                          className="apx-mobile-expand"
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
                      <ul className="apx-mobile-sublist">
                        {item.subItems.map((sub, idx) => (
                          <li key={idx}>
                            <a
                              href="#"
                              /* href={sub.href} — route navigation commented out */
                              className="apx-mobile-sublink"
                              onClick={(e) => {
                                e.preventDefault();
                                setMobileMenuOpen(false);
                                const el = document.getElementById('materials-showcase-section');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
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
          </div>
        </div>
      )}
    </header>
  );
}
