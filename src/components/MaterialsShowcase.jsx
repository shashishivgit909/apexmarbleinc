import React, { useState } from 'react';
import { websiteData } from '../data/websiteData';
import { ArrowUpRight, Check, Layers } from 'lucide-react';

export default function MaterialsShowcase() {
  const { materialsSection } = websiteData;
  const items = materialsSection.items;
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleItems =
    activeFilter === 'all' ? items : items.filter((item) => item.id === activeFilter);

  return (
    <section id="materials-showcase-section" className="materials-architectural-section">
      <div className="section-container">
        {/* Section Editorial Header */}
        <div className="section-editorial-header">
          <div className="editorial-kicker">
            <Layers size={14} />
            <span>ARCHITECTURAL STONE COLLECTIONS</span>
          </div>
          <h2 className="editorial-heading">{materialsSection.heading}</h2>
          <p className="editorial-subheading">{materialsSection.subheading}</p>

          {/* Filter Tabs */}
          <div className="materials-filter-bar" role="tablist" aria-label="Filter stone categories">
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'all'}
              className={`stone-filter-pill ${activeFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Surfaces ({items.length})
            </button>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === item.id}
                className={`stone-filter-pill ${activeFilter === item.id ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Curated 3-Column Architectural Stone Grid */}
        <div className="stone-cards-grid">
          {visibleItems.map((item) => (
            <article key={item.id} className="stone-architectural-card">
              <a
                href="#"
                /* href={item.href} — route navigation to subpage commented out */
                onClick={(e) => e.preventDefault()}
                className="stone-card-media-link"
                aria-label={`Explore ${item.title} Slabs`}
              >
                <div className="stone-card-media">
                  <img
                    src={item.image}
                    alt={`${item.title} Natural Stone Slab`}
                    className="stone-card-img"
                    loading="lazy"
                    onError={(e) => {
                      if (item.remoteImage && e.target.src !== item.remoteImage) {
                        e.target.src = item.remoteImage;
                      }
                    }}
                  />
                  <span className="stone-index-badge">
                    0{items.findIndex((i) => i.id === item.id) + 1}
                  </span>
                </div>
              </a>

              <div className="stone-card-body">
                <div className="stone-card-title-row">
                  <h3>
                    <a
                      href="#"
                      /* href={item.href} — route navigation commented out */
                      onClick={(e) => e.preventDefault()}
                    >
                      {item.title}
                    </a>
                  </h3>
                  <span className="stone-surface-tag">Natural &amp; Engineered</span>
                </div>

                <p className="stone-card-description">{item.description}</p>

                <ul className="stone-specs-list">
                  {item.features.map((feat, fIdx) => (
                    <li key={fIdx} className="stone-spec-chip">
                      <Check size={12} className="spec-check-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="stone-card-footer">
                  <a
                    href="#"
                    /* href={item.href} — route navigation commented out */
                    onClick={(e) => e.preventDefault()}
                    className="stone-explore-btn"
                  >
                    <span>Explore {item.title} Slabs</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
