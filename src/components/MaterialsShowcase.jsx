import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { websiteData } from '../data/websiteData';
import SectionToolbar from './SectionToolbar';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function MaterialsShowcase() {
  const { config } = useCustomizer();
  const c = config.materials;
  const { materialsSection } = websiteData;
  const items = materialsSection.items;

  const [activeCategory, setActiveCategory] = useState('all');
  const [sliderIndex, setSliderIndex] = useState(0);

  const layoutVariants = [
    { id: 'original', label: '3-Col Grid (Live Site)' },
    { id: 'luxuryCards', label: '2-Col Detailed Cards' },
    { id: 'carouselSlider', label: 'Interactive Slider' }
  ];

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(it => it.id === activeCategory);

  const handleNext = () => {
    setSliderIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setSliderIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <section
      id="materials-showcase-section"
      className={`materials-section-wrap layout-${c.layout}`}
      style={{
        backgroundColor: c.bg,
        '--mat-accent': c.accent,
        '--mat-heading': c.headingColor,
        '--mat-subheading': c.subheadingColor,
        '--mat-cap-bg': c.cardCapBg,
        '--mat-cap-text': c.cardCapText
      }}
    >
      <SectionToolbar
        sectionKey="materials"
        sectionName="Stone Materials Section"
        layoutOptions={layoutVariants}
      />

      {/* Background Image with configurable overlay */}
      <div
        className="materials-bg-image"
        style={{
          backgroundImage: `url(${materialsSection.backgroundImage})`
        }}
      >
        <div
          className="materials-bg-overlay"
          style={{
            backgroundColor: c.bg || '#0d131f',
            opacity: c.overlayOpacity ?? 0.52
          }}
        />
      </div>

      <div className="materials-content-container">
        {/* Section Header */}
        <div className="materials-section-header">
          <div className="materials-subtitle-chip" style={{ color: c.accent }}>
            <Sparkles size={14} />
            <span>FINE ARCHITECTURAL SURFACES</span>
          </div>
          <h2 className="materials-main-heading" style={{ color: c.headingColor }}>
            {materialsSection.heading}
          </h2>
          <p className="materials-main-subheading" style={{ color: c.subheadingColor }}>
            {materialsSection.subheading}
          </p>
        </div>

        {/* ================= LAYOUT 1: EXACT HOSTINGER 3-COL GRID ================= */}
        {c.layout === 'original' && (
          <div id="apx-material-grid" className="apx-original-grid-wrap">
            <div className="apx-grid">
              {items.map((item) => (
                <a
                  key={item.id}
                  className="apx-link"
                  href={item.href}
                  target="_top"
                  aria-label={`${item.title} Slabs`}
                >
                  <div className="apx-img-wrap">
                    <img
                      className="apx-img"
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        if (item.remoteImage && e.target.src !== item.remoteImage) {
                          e.target.src = item.remoteImage;
                        }
                      }}
                    />
                  </div>
                  <div
                    className="apx-cap"
                    style={{
                      backgroundColor: c.cardCapBg,
                      color: c.cardCapText
                    }}
                  >
                    {item.title}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ================= LAYOUT 2: 2-COLUMN LUXURY CARDS WITH SPECS ================= */}
        {c.layout === 'luxuryCards' && (
          <div className="materials-luxury-grid">
            {items.map((item) => (
              <div
                key={item.id}
                className="luxury-stone-card"
                style={{
                  backgroundColor: 'rgba(18, 22, 31, 0.85)',
                  borderColor: 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="card-media-col">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="luxury-stone-img"
                    onError={(e) => {
                      if (item.remoteImage && e.target.src !== item.remoteImage) {
                        e.target.src = item.remoteImage;
                      }
                    }}
                  />
                  <span className="card-badge" style={{ backgroundColor: c.accent, color: '#fff' }}>
                    {item.title}
                  </span>
                </div>

                <div className="card-details-col">
                  <h3 style={{ color: c.headingColor }}>{item.title} Collection</h3>
                  <p className="card-desc">{item.description}</p>

                  <div className="feature-tags">
                    {item.features.map((feat, fIdx) => (
                      <span key={fIdx} className="feature-tag">
                        <Check size={12} style={{ color: c.accent }} />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>

                  <a
                    href={item.href}
                    target="_top"
                    className="explore-stone-link"
                    style={{ color: c.accent }}
                  >
                    <span>Explore {item.title} Slabs</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= LAYOUT 3: INTERACTIVE HORIZONTAL SLIDER ================= */}
        {c.layout === 'carouselSlider' && (
          <div className="materials-slider-layout">
            <div className="slider-controls-top">
              <div className="filter-pill-tabs">
                <button
                  type="button"
                  className={`filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('all')}
                  style={{
                    backgroundColor: activeCategory === 'all' ? c.accent : 'rgba(255,255,255,0.1)',
                    color: '#ffffff'
                  }}
                >
                  All Materials ({items.length})
                </button>
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`filter-pill ${activeCategory === item.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(item.id)}
                    style={{
                      backgroundColor: activeCategory === item.id ? c.accent : 'rgba(255,255,255,0.1)',
                      color: '#ffffff'
                    }}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              <div className="slider-nav-arrows">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="mat-arrow-btn"
                  aria-label="Previous Material"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="mat-arrow-btn"
                  aria-label="Next Material"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="slider-cards-scroll">
              {filteredItems.map((item, idx) => (
                <div key={item.id} className="slider-stone-card">
                  <div className="slider-card-img-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="slider-card-img"
                      onError={(e) => {
                        if (item.remoteImage && e.target.src !== item.remoteImage) {
                          e.target.src = item.remoteImage;
                        }
                      }}
                    />
                    <div
                      className="slider-card-cap"
                      style={{
                        backgroundColor: c.cardCapBg,
                        color: c.cardCapText
                      }}
                    >
                      {item.title}
                    </div>
                  </div>
                  <div className="slider-card-body">
                    <p>{item.description}</p>
                    <a
                      href={item.href}
                      target="_top"
                      className="slider-view-btn"
                      style={{ backgroundColor: c.accent, color: '#fff' }}
                    >
                      <span>View Slabs</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
