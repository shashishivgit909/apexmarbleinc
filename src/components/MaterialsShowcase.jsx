import React, { useState } from 'react';
import { websiteData } from '../data/websiteData';
import { ArrowUpRight, Layers, CheckCircle2 } from 'lucide-react';

export default function MaterialsShowcase() {
  const { materialsSection } = websiteData;
  const items = materialsSection.items;
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleItems =
    activeFilter === 'all' ? items : items.filter((item) => item.id === activeFilter);

  return (
    <section id="materials-showcase-section" className="apx-materials-section">
      <div className="apx-container">
        {/* Section Header with Category Tabs */}
        <div className="apx-materials-header">
          <div className="apx-materials-titles">
            <span className="apx-eyebrow">
              <Layers size={13} />
              <span>Curated Natural &amp; Engineered Surfaces</span>
            </span>
            <h2 className="apx-section-title">{materialsSection.heading}</h2>
            <p className="apx-section-sub">{materialsSection.subheading}</p>
          </div>

          {/* Minimalist Filter Bar */}
          <div className="apx-filter-group" role="tablist" aria-label="Filter Stone Categories">
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'all'}
              className={`apx-filter-btn ${activeFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Slabs ({items.length})
            </button>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === item.id}
                className={`apx-filter-btn ${activeFilter === item.id ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Luxury Slab Gallery Grid */}
        <div className="apx-materials-grid">
          {visibleItems.map((item) => {
            const originalIndex = items.findIndex((x) => x.id === item.id) + 1;
            const badgeNum = String(originalIndex).padStart(2, '0');

            return (
              <article key={item.id} className="apx-material-card">
                <div className="apx-card-media">
                  <span className="apx-card-series">SERIES {badgeNum}</span>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="apx-card-img"
                    loading="lazy"
                    onError={(e) => {
                      if (item.remoteImage && e.target.src !== item.remoteImage) {
                        e.target.src = item.remoteImage;
                      }
                    }}
                  />
                  <div className="apx-card-hover-overlay">
                    <span>Explore {item.title}</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <div className="apx-card-info">
                  <div className="apx-card-heading-row">
                    <h3 className="apx-card-title">{item.title}</h3>
                    <span className="apx-card-status">In Stock</span>
                  </div>

                  <p className="apx-card-desc">{item.description}</p>

                  <ul className="apx-card-features">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="apx-feature-tag">
                        <CheckCircle2 size={12} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="apx-card-action">
                    <a
                      href="#main-site-footer"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById('main-site-footer');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="apx-card-link"
                    >
                      <span>Inquire About {item.title} Slabs</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
