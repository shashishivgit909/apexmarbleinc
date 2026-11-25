import React, { useState, useEffect, useRef } from 'react';
import { websiteData } from '../data/websiteData';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';

// Important headings displayed in the desktop navigation headers
const IMPORTANT_NAV_IDS = ['home', 'slabs', 'tiles', 'pre-fab', 'gallery', 'about', 'contact'];

export default function Header({ currentRoute = '/', onNavigate }) {
  const { company, navigation } = websiteData;

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const navRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const openDropdown = (id) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(id);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    // Keep dropdown stationary while user maneuvers or scrolls inside the menu
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 320);
  };

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setSideMenuOpen(false);
      }
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const isNavItemActive = (item) => {
    if (item.href === currentRoute) return true;
    if (item.id === 'pre-fab' && (currentRoute === '/pre-fab' || currentRoute === '/countertops')) {
      return true;
    }
    if (item.subItems && item.subItems.some((sub) => sub.href === currentRoute)) {
      return true;
    }
    return false;
  };

  const handleLinkNavigate = (e, href) => {
    e.preventDefault();
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(null);
    setSideMenuOpen(false);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <header
      id="main-navigation-header"
      className={`apx-header ${isScrolled ? 'is-scrolled' : ''}`}
    >
      <div className="apx-container apx-header-inner">
        {/* LEFT: Original Company Logo (100% Untouched) + Architectural Typography */}
        <div className="apx-brand-block">
          <a
            href="/"
            className="apx-brand-link"
            aria-label={company.name}
            onClick={(e) => handleLinkNavigate(e, '/')}
          >
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
              <span className="apx-brand-subtitle">Natural Stone Showroom</span>
            </div>
          </a>
        </div>

        {/* RIGHT GROUP */}
        <div className="apx-header-actions-group">
          {/* Desktop Navigation: Important Headings Only */}
          <nav className="apx-desktop-nav" aria-label="Main Navigation" ref={navRef}>
            <ul className="apx-nav-list">
              {importantNavItems.map((item) => {
                const hasSub = item.subItems && item.subItems.length > 0;
                const isOpen = activeDropdown === item.id;
                const isActive = isNavItemActive(item);

                return (
                  <li
                    key={item.id}
                    className={`apx-nav-item ${hasSub ? 'has-folder' : ''} ${isOpen ? 'is-dropdown-open' : ''}`}
                    onMouseEnter={() => hasSub && openDropdown(item.id)}
                    onMouseLeave={() => hasSub && scheduleCloseDropdown()}
                  >
                    <a
                      href={item.href}
                      className={`apx-nav-link ${isActive ? 'is-active' : ''}`}
                      onClick={(e) => handleLinkNavigate(e, item.href)}
                    >
                      <span>{item.name}</span>
                      {hasSub && (
                        <ChevronDown
                          size={13}
                          className={`apx-caret ${isOpen ? 'is-open' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (isOpen) {
                              setActiveDropdown(null);
                            } else {
                              openDropdown(item.id);
                            }
                          }}
                        />
                      )}
                    </a>

                    {hasSub && (
                      <div
                        className={`apx-dropdown-card ${isOpen ? 'is-visible' : ''}`}
                        onMouseEnter={() => openDropdown(item.id)}
                        onMouseLeave={() => scheduleCloseDropdown()}
                      >
                        <ul className="apx-dropdown-list">
                          {item.subItems.map((sub, idx) => (
                            <li key={idx}>
                              <a
                                href={sub.href}
                                onClick={(e) => handleLinkNavigate(e, sub.href)}
                                className={`apx-dropdown-link ${
                                  currentRoute === sub.href ? 'is-active' : ''
                                }`}
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
                        href={item.href}
                        onClick={(e) => handleLinkNavigate(e, item.href)}
                        className={`apx-side-menu-link ${
                          currentRoute === item.href ? 'is-active' : ''
                        }`}
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

          {/* Mobile Menu Button: Toggles Mobile Drawer with ALL headings */}
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

      {/* Mobile Drawer: Contains ALL Headings in Mobile View */}
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
                        href={item.href}
                        className="apx-mobile-link"
                        onClick={(e) => handleLinkNavigate(e, item.href)}
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
                              href={sub.href}
                              className="apx-mobile-sublink"
                              onClick={(e) => handleLinkNavigate(e, sub.href)}
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
