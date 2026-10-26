import React, { useState, useEffect } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { websiteData } from '../data/websiteData';
import SectionToolbar from './SectionToolbar';
import { ChevronDown, Menu, X, PhoneCall, Sparkles } from 'lucide-react';

export default function Header() {
  const { config } = useCustomizer();
  const c = config.header;
  const { company, navigation } = websiteData;

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const layoutVariants = [
    { id: 'original', label: 'Apex Orange (Live Site)' },
    { id: 'modernSplit', label: 'Split Modern + CTA' },
    { id: 'floatingGlass', label: 'Floating Glass Island' }
  ];

  return (
    <header
      id="main-navigation-header"
      className={`site-header layout-${c.layout} ${isScrolled ? 'is-scrolled' : ''} ${c.isSticky ? 'sticky-header' : ''}`}
      style={{
        '--nav-bg': c.bg,
        '--nav-text': c.text,
        '--nav-hover': c.hoverText,
        '--nav-accent': c.accent,
        '--dropdown-bg': c.dropdownBg,
        '--dropdown-text': c.dropdownText,
        backgroundColor: c.layout === 'floatingGlass' && !isScrolled ? 'transparent' : c.bg
      }}
    >
      <SectionToolbar
        sectionKey="header"
        sectionName="Navigation Header"
        layoutOptions={layoutVariants}
      />

      <div className={`header-container ${c.layout === 'floatingGlass' ? 'floating-island-wrap' : ''}`}>
        <div
          className="header-inner"
          style={{
            backgroundColor: c.layout === 'floatingGlass' ? c.bg : undefined
          }}
        >
          {/* Logo Branding */}
          <div className="logo-brand">
            <a href="/" className="logo-link">
              <img
                src={company.headerLogo}
                alt={company.name}
                className="site-logo"
                onError={(e) => {
                  if (company.headerLogoRemote && e.target.src !== company.headerLogoRemote) {
                    e.target.src = company.headerLogoRemote;
                  } else {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }
                }}
              />
              <span className="logo-fallback-text" style={{ display: 'none', color: c.text }}>
                APEX MARBLE
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              {navigation.map((item) => {
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
                      href={item.href}
                      className="nav-link"
                      style={{ color: c.text }}
                      onClick={(e) => {
                        if (hasSub && window.innerWidth < 1024) {
                          e.preventDefault();
                          setActiveDropdown(isCurrentActive ? null : item.id);
                        }
                      }}
                    >
                      <span>{item.name}</span>
                      {hasSub && <ChevronDown size={14} className="dropdown-caret" />}
                    </a>

                    {/* Dropdown Menu */}
                    {hasSub && (
                      <div
                        className={`dropdown-menu ${isCurrentActive ? 'is-visible' : ''}`}
                        style={{
                          backgroundColor: c.dropdownBg,
                          color: c.dropdownText
                        }}
                      >
                        <div className="dropdown-arrow-indicator" style={{ borderBottomColor: c.dropdownBg }} />
                        <ul className="dropdown-list">
                          {item.subItems.map((sub, idx) => (
                            <li key={idx} className="dropdown-item">
                              <a
                                href={sub.href}
                                className="dropdown-link"
                                style={{ color: c.dropdownText }}
                              >
                                {sub.name}
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

          {/* Right Action on Layout 2 & 3 */}
          {c.layout !== 'original' && (
            <div className="header-right-action">
              <a
                href={company.quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="header-cta-button"
                style={{
                  backgroundColor: c.accent || '#ff932f',
                  color: '#ffffff'
                }}
              >
                <Sparkles size={14} />
                <span>Get a Quote</span>
              </a>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            style={{ color: c.text }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className="mobile-nav-drawer"
            style={{
              backgroundColor: c.dropdownBg || '#1d1e20',
              color: c.dropdownText || '#ffffff'
            }}
          >
            <div className="mobile-drawer-inner">
              <ul className="mobile-nav-list">
                {navigation.map((item) => {
                  const hasSub = item.subItems && item.subItems.length > 0;
                  const isExpanded = activeDropdown === item.id;

                  return (
                    <li key={item.id} className="mobile-nav-item">
                      <div className="mobile-item-row">
                        <a
                          href={item.href}
                          className="mobile-item-link"
                          onClick={() => !hasSub && setMobileMenuOpen(false)}
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
                                href={sub.href}
                                className="mobile-sublink"
                                onClick={() => setMobileMenuOpen(false)}
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
                <a
                  href={`tel:+1${company.phonePlain}`}
                  className="mobile-call-action"
                  style={{ backgroundColor: c.accent || '#ff932f', color: '#fff' }}
                >
                  <PhoneCall size={16} />
                  <span>Call (408) 278-1300</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
