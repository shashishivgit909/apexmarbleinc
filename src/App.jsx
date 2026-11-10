import React from 'react';
import TopBar from './components/TopBar';
import Header from './components/Header';
import HeroSlideshow from './components/HeroSlideshow';
import MaterialsShowcase from './components/MaterialsShowcase';
import TimelessElegance from './components/TimelessElegance';
import AboutSection from './components/AboutSection';
import BrandPartners from './components/BrandPartners';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

export default function App() {
  return (
    <div className="apex-app-root">
      {/* Top Architectural Contact Bar */}
      <TopBar />

      {/* Main Sticky Navigation Header (with untouched original company logo) */}
      <Header />

      <main id="main-content">
        {/* Section 1: Hero Architectural Stone Showcase (11 Slides) */}
        <HeroSlideshow />

        {/* Section 2: Curated Stone Materials (Quartzite, Granite, Marble, Quartz, Porcelain, Pre-Fab) */}
        <MaterialsShowcase />

        {/* Section 3: About Apex Marble & San Jose Showroom Experience */}
        <AboutSection />

        {/* Section 4: Timeless Elegance & Architectural Value */}
        <TimelessElegance />

        {/* Section 5: Global Industry & Brand Partners */}
        <BrandPartners />
      </main>

      {/* Site Footer with Verified Reviews, Showroom Info & Socials */}
      <Footer />

      {/* Floating Quick Concierge Contact Widget */}
      <WhatsAppWidget />
    </div>
  );
}
