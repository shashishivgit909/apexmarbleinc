import React from 'react';
import { CustomizerProvider } from './context/CustomizerContext';
import TopBar from './components/TopBar';
import Header from './components/Header';
import HeroSlideshow from './components/HeroSlideshow';
import MaterialsShowcase from './components/MaterialsShowcase';
import TimelessElegance from './components/TimelessElegance';
import BrandPartners from './components/BrandPartners';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import CustomizerDrawer from './components/CustomizerDrawer';

export default function App() {
  return (
    <CustomizerProvider>
      <div className="apex-app-root">
        {/* Top Contact Bar */}
        <TopBar />

        {/* Main Navigation Header */}
        <Header />

        <main id="main-content">
          {/* Section 1: Hero Image Slideshow (11 Slides) */}
          <HeroSlideshow />

          {/* Section 2: Stone Materials (Quartzite, Granite, Marble, Quartz, Porcelain, Pre-Fab) */}
          <MaterialsShowcase />

          {/* Section 3: Timeless Elegance & CTA */}
          <TimelessElegance />

          {/* Section 4: Brand Partners Infinite Marquee */}
          <BrandPartners />

          {/* Section 5: About Apex Marble & Experience Ribbon */}
          <AboutSection />
        </main>

        {/* Site Footer with Yelp, Google, Social Reviews */}
        <Footer />

        {/* Floating WhatsApp Quick Contact Bubble (Live Site Feature) */}
        <WhatsAppWidget />

        {/* Interactive Page Customizer (Change layout and color for each section live on page) */}
        <CustomizerDrawer />
      </div>
    </CustomizerProvider>
  );
}
