import React from 'react';
import Header from './components/Header';
import HeroSlideshow from './components/HeroSlideshow';
import MaterialsShowcase from './components/MaterialsShowcase';
import AboutSection from './components/AboutSection';
import TimelessElegance from './components/TimelessElegance';
import BrandPartners from './components/BrandPartners';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

export default function App() {
  return (
    <div className="apx-root">
      {/* Streamlined Architectural Header (Decluttered, Logo 100% Untouched) */}
      <Header />

      <main id="main-content">
        {/* Section 1: Full-Bleed Architectural Hero Slideshow (11 Slides) */}
        <HeroSlideshow />

        {/* Section 2: Premium Stone Materials Showcase */}
        <MaterialsShowcase />

        {/* Section 3: Editorial Showroom Heritage & 18 Years Experience */}
        <AboutSection />

        {/* Section 4: Timeless Elegance Architectural Showcase */}
        <TimelessElegance />

        {/* Section 5: Authorized Global Surface Partners Marquee */}
        <BrandPartners />
      </main>

      {/* Comprehensive Architectural Directory & Customer Reviews Footer */}
      <Footer />

      {/* Floating Concierge Contact Widget */}
      <WhatsAppWidget />
    </div>
  );
}
