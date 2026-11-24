import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSlideshow from './components/HeroSlideshow';
import MaterialsShowcase from './components/MaterialsShowcase';
import AboutSection from './components/AboutSection';
import TimelessElegance from './components/TimelessElegance';
import BrandPartners from './components/BrandPartners';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import {
  SlabsOverviewPage,
  MaterialCollectionPage,
  PreFabPage,
  ShowerPanelsPage,
  TilesPage,
  PromotionalTilesPage,
  FlooringPage,
  GalleryPage,
  AboutPage,
  FaqPage,
  ContactPage,
  StorePage
} from './components/PageViews';

function normalizePath(rawPath) {
  if (!rawPath || rawPath === '/' || rawPath === '/home') return '/';
  const cleaned = rawPath.replace(/\/+$/, '').toLowerCase();
  if (cleaned === '/promotional-slab') return '/promotional-slabs';
  return cleaned || '/';
}

const MATERIAL_COLLECTION_ROUTES = new Set([
  '/quartzite-slabs',
  '/granite-slabs',
  '/marble-slabs',
  '/quartz-slabs',
  '/porcelain-slabs',
  '/dekton-slabs',
  '/specialty-slabs',
  '/promotional-slabs',
  '/countertops'
]);

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() =>
    normalizePath(window.location.pathname)
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (href) => {
    if (!href) return;
    const nextRoute = normalizePath(href);
    if (window.location.pathname !== nextRoute) {
      window.history.pushState({}, '', nextRoute);
    }
    setCurrentRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageContent = () => {
    if (currentRoute === '/') {
      return (
        <>
          {/* Section 1: Full-Bleed Architectural Hero Slideshow (11 Slides) */}
          <HeroSlideshow />

          {/* Section 2: Premium Stone Materials Showcase */}
          <MaterialsShowcase onNavigate={handleNavigate} />

          {/* Section 3: Editorial Showroom Heritage & 18 Years Experience */}
          <AboutSection onNavigate={handleNavigate} />

          {/* Section 4: Timeless Elegance Architectural Showcase */}
          <TimelessElegance onNavigate={handleNavigate} />

          {/* Section 5: Authorized Global Surface Partners Marquee */}
          <BrandPartners />
        </>
      );
    }

    if (currentRoute === '/slabs') {
      return <SlabsOverviewPage onNavigate={handleNavigate} />;
    }

    if (MATERIAL_COLLECTION_ROUTES.has(currentRoute)) {
      const pageKey = currentRoute.replace(/^\//, '');
      return <MaterialCollectionPage pageKey={pageKey} onNavigate={handleNavigate} />;
    }

    if (currentRoute === '/pre-fab') {
      return <PreFabPage onNavigate={handleNavigate} />;
    }

    if (currentRoute === '/showerpanels') {
      return <ShowerPanelsPage onNavigate={handleNavigate} />;
    }

    if (currentRoute === '/tiles') {
      return <TilesPage onNavigate={handleNavigate} />;
    }

    if (currentRoute === '/promotional-tiles') {
      return <PromotionalTilesPage onNavigate={handleNavigate} />;
    }

    if (currentRoute === '/flooring') {
      return <FlooringPage onNavigate={handleNavigate} />;
    }

    if (currentRoute === '/gallery') {
      return <GalleryPage onNavigate={handleNavigate} />;
    }

    if (currentRoute === '/store') {
      return <StorePage onNavigate={handleNavigate} />;
    }

    if (currentRoute === '/about') {
      return <AboutPage onNavigate={handleNavigate} />;
    }

    if (currentRoute === '/faq') {
      return <FaqPage onNavigate={handleNavigate} />;
    }

    if (currentRoute === '/contact') {
      return <ContactPage onNavigate={handleNavigate} />;
    }

    // Fallback to Home page
    return (
      <>
        <HeroSlideshow />
        <MaterialsShowcase onNavigate={handleNavigate} />
        <AboutSection onNavigate={handleNavigate} />
        <TimelessElegance onNavigate={handleNavigate} />
        <BrandPartners />
      </>
    );
  };

  return (
    <div className="apx-root">
      {/* Streamlined Architectural Header (Decluttered, Logo 100% Untouched) */}
      <Header currentRoute={currentRoute} onNavigate={handleNavigate} />

      <main id="main-content">{renderPageContent()}</main>

      {/* Comprehensive Architectural Directory & Customer Reviews Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Concierge Contact Widget */}
      <WhatsAppWidget onNavigate={handleNavigate} />
    </div>
  );
}
