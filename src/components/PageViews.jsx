import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowUpRight,
  Layers,
  Sparkles,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  HelpCircle,
  X,
  Play,
  Pause,
  Award,
  ExternalLink,
  Check
} from 'lucide-react';
import { pagesData } from '../data/pagesData';
import { websiteData } from '../data/websiteData';
import inventoryData from '../data/inventoryData.json';

const COLOR_ALIASES = {
  grey: ['grey', 'gray', 'silver', 'steel', 'gris', 'grigio'],
  white: ['white', 'blanc', 'bianco', 'blanco', 'statuario', 'carrara', 'calacatta', 'lerox'],
  black: ['black', 'nero', 'noir', 'marquina', 'negresco', 'titanium'],
  blue: ['blue', 'azul', 'aarezo', 'aqua'],
  green: ['green', 'verde', 'emerald', 'ocean'],
  beige: ['beige', 'cream', 'crema', 'taj mahal', 'travertino', 'perla', 'almond'],
  brown: ['brown', 'taupe', 'cafe', 'bronze', 'choko', 'walnut'],
  gold: ['gold', 'golden', 'dorado', 'patagonia'],
  red: ['red', 'pink', 'rosa', 'sakura', 'viola', 'bordeaux']
};

function buildWoodSwatchDataUri(colorsCsv) {
  const [c1, c2, c3] = colorsCsv.split(',');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="55%" stop-color="${c2}"/>
        <stop offset="100%" stop-color="${c3}"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="900" fill="url(#bg)"/>
    <line x1="0" y1="225" x2="1200" y2="225" stroke="rgba(30,19,12,0.22)" stroke-width="3"/>
    <line x1="0" y1="450" x2="1200" y2="450" stroke="rgba(30,19,12,0.22)" stroke-width="3"/>
    <line x1="0" y1="675" x2="1200" y2="675" stroke="rgba(30,19,12,0.22)" stroke-width="3"/>
    <line x1="420" y1="0" x2="420" y2="225" stroke="rgba(30,19,12,0.2)" stroke-width="2.5"/>
    <line x1="820" y1="225" x2="820" y2="450" stroke="rgba(30,19,12,0.2)" stroke-width="2.5"/>
    <line x1="290" y1="450" x2="290" y2="675" stroke="rgba(30,19,12,0.2)" stroke-width="2.5"/>
    <line x1="710" y1="675" x2="710" y2="900" stroke="rgba(30,19,12,0.2)" stroke-width="2.5"/>
    <g fill="none" stroke="rgba(255,255,255,0.16)" stroke-width="2">
      <path d="M0 70 Q 300 48, 600 72 T 1200 66"/>
      <path d="M0 145 Q 350 165, 700 140 T 1200 152"/>
      <path d="M0 300 Q 280 282, 620 305 T 1200 296"/>
      <path d="M0 385 Q 410 405, 810 380 T 1200 392"/>
      <path d="M0 525 Q 320 505, 680 530 T 1200 520"/>
      <path d="M0 610 Q 390 628, 790 605 T 1200 615"/>
      <path d="M0 755 Q 310 735, 650 760 T 1200 748"/>
      <path d="M0 835 Q 420 852, 840 830 T 1200 842"/>
    </g>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

// Reusable automatic page hero slideshow (same behavior & style as home hero)
function PageSlideshow({ slides, altPrefix = 'Apex Marble Showroom' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = slides ? slides.length : 0;

  useEffect(() => {
    setCurrentIndex(0);
  }, [slides]);

  useEffect(() => {
    if (total <= 1) return undefined;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3800);
    return () => clearInterval(timer);
  }, [currentIndex, total]);

  if (!slides || total === 0) return null;

  return (
    <section className="apx-hero-section apx-subpage-hero">
      <div className="apx-hero-stage apx-subpage-stage">
        {slides.map((src, idx) => (
          <div
            key={idx}
            className={`apx-hero-slide ${idx === currentIndex ? 'is-active' : ''}`}
            aria-hidden={idx !== currentIndex}
          >
            <img
              src={src}
              alt={`${altPrefix} Slide ${idx + 1}`}
              className="apx-hero-img"
              loading={idx === 0 ? 'eager' : 'lazy'}
              onError={(e) => {
                if (!e.target.dataset.fallbackUsed) {
                  e.target.dataset.fallbackUsed = 'true';
                  e.target.src = `/images/slide-${(idx % 11) + 1}.${idx % 2 === 0 ? 'png' : 'jpg'}`;
                }
              }}
            />
            <div className="apx-hero-scrim" />
          </div>
        ))}

        {total > 1 && (
          <div className="apx-container apx-hero-content-wrap">
            <button
              type="button"
              className="apx-hero-arrow apx-arrow-prev"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + total) % total)}
              aria-label="Previous Slide"
            >
              <ChevronLeft size={24} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              className="apx-hero-arrow apx-arrow-next"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % total)}
              aria-label="Next Slide"
            >
              <ChevronRight size={24} strokeWidth={1.75} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Product Detail Lightbox / Modal
function ProductDetailModal({ product, onClose, onNavigate }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  if (!product) return null;

  const imgs =
    product.images && product.images.length > 0
      ? product.images
      : [product.image].filter(Boolean);
  const fallbacks =
    product.fallbackImages && product.fallbackImages.length > 0
      ? product.fallbackImages
      : [product.fallbackImage].filter(Boolean);

  return (
    <div className="apx-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="apx-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="apx-modal-close"
          onClick={onClose}
          aria-label="Close Product Specifications"
        >
          <X size={20} />
        </button>

        <div className="apx-modal-grid">
          <div className="apx-modal-media">
            <div className="apx-modal-main-img-wrap">
              <img
                src={imgs[activeImgIdx] || product.image}
                alt={product.title}
                className="apx-modal-main-img"
                onError={(e) => {
                  const fb = fallbacks[activeImgIdx] || product.fallbackImage;
                  if (fb && e.target.src !== fb) {
                    e.target.src = fb;
                  } else if (e.target.src !== '/images/material-quartzite.jpg') {
                    e.target.src = '/images/material-quartzite.jpg';
                  }
                }}
              />
            </div>

            {imgs.length > 1 && (
              <div className="apx-modal-thumbs">
                {imgs.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`apx-modal-thumb-btn ${idx === activeImgIdx ? 'is-active' : ''}`}
                    onClick={() => setActiveImgIdx(idx)}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.title} view ${idx + 1}`}
                      onError={(e) => {
                        const fb = fallbacks[idx];
                        if (fb && e.target.src !== fb) e.target.src = fb;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="apx-modal-details">
            <span className="apx-eyebrow">
              <Layers size={13} />
              <span>{product.material || 'Natural Stone'} Specification</span>
            </span>

            <h2 className="apx-modal-title">{product.title}</h2>

            <div className="apx-modal-specs-grid">
              {product.batch && (
                <div className="apx-spec-pill">
                  <span className="apx-spec-lbl">Batch / Block</span>
                  <strong className="apx-spec-val">{product.batch}</strong>
                </div>
              )}
              {product.dimensions && (
                <div className="apx-spec-pill">
                  <span className="apx-spec-lbl">Dimensions</span>
                  <strong className="apx-spec-val">{product.dimensions}</strong>
                </div>
              )}
              {product.area && (
                <div className="apx-spec-pill">
                  <span className="apx-spec-lbl">Area (Sq. Ft.)</span>
                  <strong className="apx-spec-val">{product.area} sq. ft.</strong>
                </div>
              )}
              {product.thickness && (
                <div className="apx-spec-pill">
                  <span className="apx-spec-lbl">Thickness</span>
                  <strong className="apx-spec-val">{product.thickness}</strong>
                </div>
              )}
              {product.finish && (
                <div className="apx-spec-pill">
                  <span className="apx-spec-lbl">Finish</span>
                  <strong className="apx-spec-val">{product.finish}</strong>
                </div>
              )}
              {product.brand && product.brand !== 'Other' && (
                <div className="apx-spec-pill">
                  <span className="apx-spec-lbl">Brand</span>
                  <strong className="apx-spec-val">{product.brand}</strong>
                </div>
              )}
            </div>

            {product.description && (
              <p className="apx-modal-desc">{product.description}</p>
            )}

            {product.applications && (
              <div className="apx-modal-apps">
                <strong>Recommended Applications:</strong>
                <p>{product.applications}</p>
              </div>
            )}

            <div className="apx-modal-actions">
              <a
                href="/contact"
                className="apx-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  onNavigate('/contact');
                }}
              >
                <span>Request Quote for {product.title}</span>
                <ArrowUpRight size={15} />
              </a>
              <a href="tel:+14082781300" className="apx-btn-secondary">
                <Phone size={15} />
                <span>(408) 278-1300</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 1. /slabs Overview Page
export function SlabsOverviewPage({ onNavigate }) {
  const { slabsOverview } = pagesData;

  return (
    <div className="apx-page-wrap">
      <section className="apx-page-banner">
        <div className="apx-container">
          <span className="apx-eyebrow">
            <Layers size={13} />
            <span>{slabsOverview.eyebrow}</span>
          </span>
          <h1 className="apx-page-main-title">{slabsOverview.title}</h1>
          <p className="apx-section-sub">{slabsOverview.subtitle}</p>
        </div>
      </section>

      <section className="apx-materials-section">
        <div className="apx-container">
          <div className="apx-materials-grid">
            {slabsOverview.categories.map((cat, idx) => (
              <article
                key={cat.id}
                className="apx-material-card apx-clickable-card"
                onClick={() => onNavigate(cat.href)}
              >
                <div className="apx-card-media">
                  <span className="apx-card-series">
                    {cat.badge || `COLLECTION 0${idx + 1}`}
                  </span>
                  <img
                    src={cat.image}
                    alt={`${cat.title} ${cat.highlight}`}
                    className="apx-card-img"
                    loading="lazy"
                    onError={(e) => {
                      if (cat.fallbackImage && e.target.src !== cat.fallbackImage) {
                        e.target.src = cat.fallbackImage;
                      } else if (cat.localFallback && e.target.src !== cat.localFallback) {
                        e.target.src = cat.localFallback;
                      }
                    }}
                  />
                  <div className="apx-card-hover-overlay">
                    <span>View {cat.title} Slabs</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <div className="apx-card-info">
                  <div className="apx-card-heading-row">
                    <h3 className="apx-card-title">
                      {cat.title} <span className="apx-accent-word">{cat.highlight}</span>
                    </h3>
                    <span className="apx-card-status">Explore</span>
                  </div>

                  <p className="apx-card-desc">{cat.description}</p>

                  <div className="apx-card-action">
                    <a
                      href={cat.href}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onNavigate(cat.href);
                      }}
                      className="apx-card-link"
                    >
                      <span>Browse {cat.title} Collection</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// 2. Material Collection Page (/quartzite-slabs, /granite-slabs, /marble-slabs, /quartz-slabs, /porcelain-slabs, /dekton-slabs, /specialty-slabs, /promotional-slabs, /countertops)
export function MaterialCollectionPage({ pageKey, onNavigate }) {
  const config = pagesData.materialCollections[pageKey];
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('az');
  const [colorFilter, setColorFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [discountFilter, setDiscountFilter] = useState('all');
  const [subMaterialFilter, setSubMaterialFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setSearchQuery('');
    setSortOrder('az');
    setColorFilter('all');
    setBrandFilter('all');
    setDiscountFilter('all');
    setSubMaterialFilter('all');
    setSelectedProduct(null);
  }, [pageKey]);

  const baseProducts = useMemo(() => {
    if (!config) return [];
    if (config.customProducts) {
      return config.customProducts;
    }
    const targetMat = config.materialKey.toLowerCase().trim();
    if (pageKey === 'promotional-slabs') {
      return inventoryData.filter(
        (p) =>
          p.material.toLowerCase().trim() === targetMat ||
          (p.discount && p.discount !== '' && p.discount !== '0%')
      );
    }
    return inventoryData.filter((p) =>
      p.material.toLowerCase().includes(targetMat)
    );
  }, [config, pageKey]);

  // Helper for discount badge (matches apexmarbleinc.com logic)
  const getProductBadge = (p) => {
    const titleLower = (p.title || '').toLowerCase().trim();
    const idLower = (p.id || '').toLowerCase().trim();

    if (pageKey === 'countertops') {
      if (titleLower.includes('sold') || titleLower.includes('sakura')) {
        return { text: 'Sold Out', type: 'sold' };
      }
    }

    if (pageKey === 'quartz-slabs') {
      const b = (p.brand || '').toLowerCase();
      if (b.includes('silestone') || b.includes('cambria')) {
        return { text: '35% OFF', type: 'promo' };
      }
      return { text: '40% OFF', type: 'promo' };
    }

    if (pageKey === 'promotional-slabs' && p.discount && p.discount !== '0%') {
      return { text: `${p.discount} OFF`, type: 'promo' };
    }

    if (
      config.comingSoon?.some(
        (n) => titleLower.includes(n.toLowerCase()) || idLower === n.toLowerCase()
      )
    ) {
      return { text: 'Coming Soon', type: 'coming-soon' };
    }

    if (
      config.newArrivals?.some(
        (n) => titleLower.includes(n.toLowerCase()) || idLower === n.toLowerCase()
      )
    ) {
      return { text: 'New Arrival', type: 'new' };
    }

    if (p.discount && p.discount !== '0%') {
      return { text: `${p.discount} OFF`, type: 'promo' };
    }

    return null;
  };

  // Available colors for this material
  const availableColors = useMemo(() => {
    const found = [];
    for (const [colorKey, words] of Object.entries(COLOR_ALIASES)) {
      const hasMatch = baseProducts.some((p) =>
        words.some((w) => (p.title || '').toLowerCase().includes(w))
      );
      if (hasMatch) found.push(colorKey);
    }
    return found;
  }, [baseProducts]);

  // Available brands
  const availableBrands = useMemo(() => {
    if (!config?.showBrandFilter) return [];
    const set = new Set();
    baseProducts.forEach((p) => {
      if (p.brand && p.brand !== 'Other') set.add(p.brand);
    });
    if (pageKey === 'promotional-slabs') {
      ['Quartz', 'Granite', 'Marble', 'Silestone', 'Dekton'].forEach((cand) => {
        const has = baseProducts.some(
          (p) =>
            (p.brand || '').toLowerCase().includes(cand.toLowerCase()) ||
            (p.material || '').toLowerCase().includes(cand.toLowerCase()) ||
            (p.title || '').toLowerCase().includes(cand.toLowerCase())
        );
        if (has) set.add(cand);
      });
    }
    return [...set].sort();
  }, [baseProducts, config, pageKey]);

  // Available discounts
  const availableDiscounts = useMemo(() => {
    if (!config?.showDiscountFilter) return [];
    const set = new Set();
    baseProducts.forEach((p) => {
      const badge = getProductBadge(p);
      if (badge && badge.type === 'promo') set.add(badge.text);
    });
    return [...set].sort();
  }, [baseProducts, config, pageKey]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let list = [...baseProducts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          (p.title || '').toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q) ||
          (p.brand || '').toLowerCase().includes(q)
      );
    }

    if (colorFilter !== 'all') {
      const aliases = COLOR_ALIASES[colorFilter] || [colorFilter];
      list = list.filter((p) =>
        aliases.some((w) => (p.title || '').toLowerCase().includes(w))
      );
    }

    if (brandFilter !== 'all') {
      const b = brandFilter.toLowerCase();
      list = list.filter(
        (p) =>
          (p.brand || '').toLowerCase() === b ||
          (p.material || '').toLowerCase().includes(b) ||
          (p.title || '').toLowerCase().includes(b)
      );
    }

    if (discountFilter !== 'all') {
      list = list.filter((p) => {
        const badge = getProductBadge(p);
        return badge && badge.text === discountFilter;
      });
    }

    if (config?.showSubMaterialFilter && subMaterialFilter !== 'all') {
      if (subMaterialFilter === 'quartz') {
        list = list.filter((p) => {
          const t = (p.title || '').toLowerCase();
          return !t.includes('granite') && !t.includes('quartzite') && !t.includes('marble');
        });
      } else {
        list = list.filter((p) =>
          (p.title || '').toLowerCase().includes(subMaterialFilter)
        );
      }
    }

    list.sort((a, b) =>
      sortOrder === 'az'
        ? (a.title || '').localeCompare(b.title || '')
        : (b.title || '').localeCompare(a.title || '')
    );

    return list;
  }, [
    baseProducts,
    searchQuery,
    colorFilter,
    brandFilter,
    discountFilter,
    subMaterialFilter,
    sortOrder,
    config
  ]);

  if (!config) return null;

  return (
    <div className="apx-page-wrap">
      {/* Page Slideshow from apexmarbleinc.com */}
      <PageSlideshow slides={config.slides} altPrefix={config.title} />

      {/* Editorial Stone Specification Intro Card */}
      <section className="apx-subpage-intro-section">
        <div className="apx-container">
          <div className="apx-subpage-intro-card">
            <span className="apx-eyebrow">
              <Layers size={13} />
              <span>{config.eyebrow}</span>
            </span>
            <h1 className="apx-section-title">{config.title}</h1>
            {config.paragraphs.map((p, idx) => (
              <p key={idx} className="apx-subpage-lead">
                {p}
              </p>
            ))}

            {config.metaLines && config.metaLines.length > 0 && (
              <div className="apx-subpage-meta-box">
                {config.metaLines.map((m, idx) => (
                  <div key={idx} className="apx-subpage-meta-row">
                    <strong>{m.label}:</strong> <span>{m.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Promotional Style Highlights (if promotional-slabs) */}
      {config.styleHighlights && (
        <section className="apx-promo-styles-section">
          <div className="apx-container">
            <div className="apx-promo-styles-grid">
              {config.styleHighlights.map((st, idx) => (
                <div key={idx} className="apx-promo-style-card">
                  <div className="apx-promo-style-img-wrap">
                    <img src={st.image} alt={st.style} loading="lazy" />
                  </div>
                  <div className="apx-promo-style-info">
                    <h3>{st.style}</h3>
                    <p>{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interactive Inventory Explorer */}
      <section className="apx-catalog-section">
        <div className="apx-container">
          <div className="apx-catalog-header">
            <div>
              <span className="apx-eyebrow">
                <Sparkles size={13} />
                <span>{config.eyebrow}</span>
              </span>
              <h2 className="apx-section-title">{config.exploreHeading}</h2>
            </div>
            <div className="apx-catalog-count">
              Showing <strong>{filteredProducts.length}</strong> of {baseProducts.length} Slabs
            </div>
          </div>

          {/* Search, Sort & Filter Toolbar */}
          <div className="apx-catalog-toolbar">
            <div className="apx-search-input-wrap">
              <Search size={16} className="apx-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search slabs by name or color..."
                className="apx-search-input"
                aria-label="Search slabs"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="apx-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="apx-toolbar-filters">
              {config.showSubMaterialFilter && (
                <div className="apx-select-pill">
                  <label>Material</label>
                  <select
                    value={subMaterialFilter}
                    onChange={(e) => setSubMaterialFilter(e.target.value)}
                  >
                    <option value="all">All Materials</option>
                    <option value="granite">Granite</option>
                    <option value="quartzite">Quartzite</option>
                    <option value="marble">Marble</option>
                    <option value="quartz">Quartz</option>
                  </select>
                </div>
              )}

              <div className="apx-select-pill">
                <label>Sort</label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="az">A → Z</option>
                  <option value="za">Z → A</option>
                </select>
              </div>

              <div className="apx-select-pill">
                <label>Color</label>
                <select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
                  <option value="all">All Colors</option>
                  {availableColors.map((c) => (
                    <option key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {config.showBrandFilter && availableBrands.length > 0 && (
                <div className="apx-select-pill">
                  <label>Brand</label>
                  <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
                    <option value="all">All Brands</option>
                    {availableBrands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {config.showDiscountFilter && availableDiscounts.length > 0 && (
                <div className="apx-select-pill">
                  <label>Discount</label>
                  <select
                    value={discountFilter}
                    onChange={(e) => setDiscountFilter(e.target.value)}
                  >
                    <option value="all">All On Sale</option>
                    {availableDiscounts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Product Slab Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="apx-empty-state">
              <p>No matching slabs found. Try adjusting your search or filter criteria.</p>
              <button
                type="button"
                className="apx-btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setColorFilter('all');
                  setBrandFilter('all');
                  setDiscountFilter('all');
                  setSubMaterialFilter('all');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="apx-slab-catalog-grid">
              {filteredProducts.map((product) => {
                const badge = getProductBadge(product);
                return (
                  <article
                    key={product.id}
                    className="apx-slab-item-card"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="apx-slab-img-wrap">
                      {badge && (
                        <span className={`apx-slab-badge is-${badge.type}`}>
                          {badge.text}
                        </span>
                      )}
                      <img
                        src={product.image}
                        alt={product.title}
                        className="apx-slab-img"
                        loading="lazy"
                        onError={(e) => {
                          if (
                            product.fallbackImage &&
                            e.target.src !== product.fallbackImage
                          ) {
                            e.target.src = product.fallbackImage;
                          } else if (
                            !e.target.dataset.localFallback
                          ) {
                            e.target.dataset.localFallback = 'true';
                            e.target.src = '/images/material-quartzite.jpg';
                          }
                        }}
                      />
                      <div className="apx-card-hover-overlay">
                        <span>View Slab Details</span>
                        <ArrowUpRight size={14} />
                      </div>
                    </div>

                    <div className="apx-slab-item-body">
                      <h3 className="apx-slab-item-title">{product.title}</h3>
                      <div className="apx-slab-item-meta">
                        <span>{product.material || config.materialKey}</span>
                        {product.dimensions && <span>• {product.dimensions}</span>}
                        {product.finish && <span>• {product.finish}</span>}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onNavigate={onNavigate}
      />
    </div>
  );
}

// 3. /pre-fab Page
export function PreFabPage({ onNavigate }) {
  const { preFabPage } = pagesData;

  return (
    <div className="apx-page-wrap">
      <PageSlideshow slides={preFabPage.slides} altPrefix="Apex Marble Pre-Fab Slabs" />

      <section className="apx-subpage-intro-section">
        <div className="apx-container">
          <div className="apx-subpage-intro-card">
            <span className="apx-eyebrow">
              <Layers size={13} />
              <span>{preFabPage.eyebrow}</span>
            </span>
            <h1 className="apx-section-title">{preFabPage.title}</h1>
            {preFabPage.paragraphs.map((p, idx) => (
              <p key={idx} className="apx-subpage-lead">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="apx-materials-section">
        <div className="apx-container">
          <div className="apx-prefab-2col-grid">
            {preFabPage.categories.map((cat) => (
              <article
                key={cat.id}
                className="apx-material-card apx-clickable-card"
                onClick={() => onNavigate(cat.href)}
              >
                <div className="apx-card-media">
                  <span className="apx-card-series">PRE-FAB COLLECTION</span>
                  <img
                    src={cat.image}
                    alt={`${cat.title} ${cat.highlight}`}
                    className="apx-card-img"
                    loading="lazy"
                    onError={(e) => {
                      if (cat.fallbackImage && e.target.src !== cat.fallbackImage) {
                        e.target.src = cat.fallbackImage;
                      } else if (cat.localFallback && e.target.src !== cat.localFallback) {
                        e.target.src = cat.localFallback;
                      }
                    }}
                  />
                  <div className="apx-card-hover-overlay">
                    <span>Explore {cat.title} {cat.highlight}</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <div className="apx-card-info">
                  <div className="apx-card-heading-row">
                    <h2 className="apx-card-title">
                      {cat.title} <span className="apx-accent-word">{cat.highlight}</span>
                    </h2>
                    <span className="apx-card-status">In Stock</span>
                  </div>

                  {cat.paragraphs.map((p, idx) => (
                    <p key={idx} className="apx-card-desc">
                      {p}
                    </p>
                  ))}

                  <div className="apx-card-action">
                    <a
                      href={cat.href}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onNavigate(cat.href);
                      }}
                      className="apx-card-link"
                    >
                      <span>Browse {cat.title} {cat.highlight} Inventory</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// 4. /showerpanels Page
export function ShowerPanelsPage({ onNavigate }) {
  const { showerPanelsPage } = pagesData;
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('az');
  const [colorFilter, setColorFilter] = useState('all');
  const [activePanel, setActivePanel] = useState(null);

  const filteredItems = useMemo(() => {
    let list = [...showerPanelsPage.items];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (it) =>
          it.name.toLowerCase().includes(q) || it.sku.toLowerCase().includes(q)
      );
    }
    if (colorFilter !== 'all') {
      list = list.filter((it) => it.color === colorFilter);
    }
    list.sort((a, b) =>
      sortOrder === 'az'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    return list;
  }, [showerPanelsPage.items, searchQuery, colorFilter, sortOrder]);

  return (
    <div className="apx-page-wrap">
      <PageSlideshow slides={showerPanelsPage.slides} altPrefix="ShowerPanels Prefab" />

      <section className="apx-subpage-intro-section">
        <div className="apx-container">
          <div className="apx-subpage-intro-card">
            <span className="apx-eyebrow">
              <Layers size={13} />
              <span>{showerPanelsPage.eyebrow}</span>
            </span>
            <h1 className="apx-section-title">{showerPanelsPage.title}</h1>
            {showerPanelsPage.paragraphs.map((p, idx) => (
              <p key={idx} className="apx-subpage-lead">
                {p}
              </p>
            ))}
            <div className="apx-subpage-meta-box">
              <div className="apx-subpage-meta-row">
                <strong>Specifications:</strong> <span>{showerPanelsPage.specsSummary}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="apx-catalog-section">
        <div className="apx-container">
          <div className="apx-catalog-header">
            <div>
              <span className="apx-eyebrow">
                <Sparkles size={13} />
                <span>{showerPanelsPage.eyebrow}</span>
              </span>
              <h2 className="apx-section-title">{showerPanelsPage.collectionHeading}</h2>
            </div>
            <div className="apx-catalog-count">
              Showing <strong>{filteredItems.length}</strong> Shower Panels
            </div>
          </div>

          <div className="apx-catalog-toolbar">
            <div className="apx-search-input-wrap">
              <Search size={16} className="apx-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search SKU or Name…"
                className="apx-search-input"
              />
            </div>

            <div className="apx-toolbar-filters">
              <div className="apx-select-pill">
                <label>Sort</label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="az">A → Z</option>
                  <option value="za">Z → A</option>
                </select>
              </div>

              <div className="apx-select-pill">
                <label>Color</label>
                <select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
                  <option value="all">All Colors</option>
                  <option value="blue">Blue</option>
                  <option value="grey">Grey</option>
                  <option value="white">White</option>
                  <option value="gold">Gold</option>
                </select>
              </div>
            </div>
          </div>

          <div className="apx-materials-grid">
            {filteredItems.map((panel) => (
              <article
                key={panel.sku}
                className="apx-material-card apx-clickable-card"
                onClick={() => setActivePanel(panel)}
              >
                <div className="apx-card-media">
                  <span
                    className={`apx-slab-badge ${
                      panel.inStock ? 'is-promo' : 'is-sold'
                    }`}
                  >
                    {panel.badge}
                  </span>
                  <img
                    src={panel.image}
                    alt={panel.name}
                    className="apx-card-img"
                    loading="lazy"
                    onError={(e) => {
                      if (panel.fallbackImage && e.target.src !== panel.fallbackImage) {
                        e.target.src = panel.fallbackImage;
                      }
                    }}
                  />
                  <div className="apx-card-hover-overlay">
                    <span>View Specifications</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <div className="apx-card-info">
                  <span className="apx-sku-tag">{panel.sku}</span>
                  <div className="apx-card-heading-row">
                    <h3 className="apx-card-title">{panel.name}</h3>
                    <span className="apx-card-status">{panel.status}</span>
                  </div>

                  {panel.inStock ? (
                    <div className="apx-sp-pricing-row">
                      <div className="apx-sp-price-box">
                        <span className="apx-sp-price-lbl">MSRP (1 Box)</span>
                        <span className="apx-sp-price-msrp">{panel.msrp}</span>
                      </div>
                      <div className="apx-sp-price-box">
                        <span className="apx-sp-price-lbl">Sale (2 Boxes)</span>
                        <strong className="apx-sp-price-sale">{panel.salePrice}</strong>
                      </div>
                    </div>
                  ) : (
                    <div className="apx-sp-pricing-row">
                      <div className="apx-sp-price-box">
                        <span className="apx-sp-price-lbl">Availability</span>
                        <strong className="apx-sp-price-out">Out of Stock</strong>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activePanel && (
        <div
          className="apx-modal-backdrop"
          onClick={() => setActivePanel(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="apx-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="apx-modal-close"
              onClick={() => setActivePanel(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="apx-modal-grid">
              <div className="apx-modal-media">
                <div className="apx-modal-main-img-wrap">
                  <img
                    src={activePanel.image}
                    alt={activePanel.name}
                    className="apx-modal-main-img"
                    onError={(e) => {
                      if (
                        activePanel.fallbackImage &&
                        e.target.src !== activePanel.fallbackImage
                      ) {
                        e.target.src = activePanel.fallbackImage;
                      }
                    }}
                  />
                </div>
              </div>

              <div className="apx-modal-details">
                <span className="apx-eyebrow">{activePanel.sku} • PREFAB SHOWER PANEL</span>
                <h2 className="apx-modal-title">{activePanel.name}</h2>

                <div className="apx-modal-apps">
                  <strong>Premium 9mm Porcelain</strong>
                  <p>35.5" x 94.5" | Polished Finish • 46.6 Sq/Ft Per Box (2 pieces)</p>
                </div>

                {activePanel.inStock && (
                  <div className="apx-sp-pricing-row apx-modal-pricing">
                    <div className="apx-sp-price-box">
                      <span className="apx-sp-price-lbl">MSRP (1 Box)</span>
                      <span className="apx-sp-price-msrp">{activePanel.msrp}</span>
                    </div>
                    <div className="apx-sp-price-box">
                      <span className="apx-sp-price-lbl">Sale Price (2 Boxes)</span>
                      <strong className="apx-sp-price-sale">{activePanel.salePrice}</strong>
                    </div>
                  </div>
                )}

                <div className="apx-modal-actions">
                  <a
                    href="/contact"
                    className="apx-btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setActivePanel(null);
                      onNavigate('/contact');
                    }}
                  >
                    <span>Inquire About {activePanel.name}</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 5. /tiles Page
export function TilesPage({ onNavigate }) {
  const { tilesPage } = pagesData;
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('az');
  const [lightboxImg, setLightboxImg] = useState(null);

  const filteredBrands = useMemo(() => {
    let list = [...tilesPage.brands];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((b) => b.name.toLowerCase().includes(q));
    }
    list.sort((a, b) =>
      sortOrder === 'az'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    return list;
  }, [tilesPage.brands, searchQuery, sortOrder]);

  return (
    <div className="apx-page-wrap">
      <PageSlideshow slides={tilesPage.heroImages} altPrefix="Apex Marble Tiles" />

      <section className="apx-catalog-section">
        <div className="apx-container">
          <div className="apx-catalog-header">
            <div>
              <span className="apx-eyebrow">
                <Layers size={13} />
                <span>{tilesPage.eyebrow}</span>
              </span>
              <h1 className="apx-section-title">{tilesPage.title}</h1>
              <p className="apx-section-sub">{tilesPage.subtitle}</p>
            </div>
          </div>

          <div className="apx-catalog-toolbar">
            <div className="apx-search-input-wrap">
              <Search size={16} className="apx-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands (e.g., Emser, MSI, Bedrosians)..."
                className="apx-search-input"
              />
            </div>

            <div className="apx-toolbar-filters">
              <div className="apx-select-pill">
                <label>Sort</label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="az">A → Z</option>
                  <option value="za">Z → A</option>
                </select>
              </div>
            </div>
          </div>

          <div className="apx-tile-brands-grid">
            {filteredBrands.map((brand, idx) => (
              <a
                key={idx}
                href={brand.href}
                target="_blank"
                rel="noopener noreferrer"
                className="apx-tile-brand-card"
              >
                <div className="apx-tile-brand-thumb">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    loading="lazy"
                    onError={(e) => {
                      if (brand.localFallback && e.target.src !== brand.localFallback) {
                        e.target.src = brand.localFallback;
                      }
                    }}
                  />
                </div>
                <div className="apx-tile-brand-body">
                  <div>
                    <h3 className="apx-tile-brand-name">{brand.name}</h3>
                    <span className="apx-tile-brand-meta">{brand.meta}</span>
                  </div>
                  <ExternalLink size={15} className="apx-tile-brand-icon" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Tile Showroom & Installation Gallery from apexmarbleinc.com/tiles */}
      <section className="apx-about-section">
        <div className="apx-container">
          <div className="apx-catalog-header">
            <div>
              <span className="apx-eyebrow">
                <Sparkles size={13} />
                <span>PORCELAIN, CERAMIC & NATURAL STONE TILES</span>
              </span>
              <h2 className="apx-section-title">Tile Applications & Showroom Displays</h2>
            </div>
            <a
              href="/contact"
              className="apx-btn-primary"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
            >
              <span>Get a Quote</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="apx-materials-grid">
            {tilesPage.galleryImages.map((img, idx) => (
              <article
                key={idx}
                className="apx-material-card apx-clickable-card"
                onClick={() => setLightboxImg(img.url)}
              >
                <div className="apx-card-media">
                  <img src={img.url} alt={img.title} className="apx-card-img" loading="lazy" />
                  <div className="apx-card-hover-overlay">
                    <span>Preview Tile</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <div className="apx-card-info">
                  <h3 className="apx-slab-item-title">{img.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {lightboxImg && (
        <div className="apx-modal-backdrop" onClick={() => setLightboxImg(null)}>
          <div className="apx-lightbox-only" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="apx-modal-close"
              onClick={() => setLightboxImg(null)}
            >
              <X size={20} />
            </button>
            <img src={lightboxImg} alt="Tile Preview" className="apx-lightbox-full-img" />
          </div>
        </div>
      )}
    </div>
  );
}

// 6. /promotional-tiles Page
export function PromotionalTilesPage({ onNavigate }) {
  const { promotionalTilesPage, tilesPage } = pagesData;

  return (
    <div className="apx-page-wrap">
      <section className="apx-page-banner">
        <div className="apx-container">
          <span className="apx-eyebrow">
            <Sparkles size={13} />
            <span>{promotionalTilesPage.eyebrow}</span>
          </span>
          <h1 className="apx-page-main-title">{promotionalTilesPage.title}</h1>
          <p className="apx-section-sub">{promotionalTilesPage.subtitle}</p>
        </div>
      </section>

      <section className="apx-materials-section">
        <div className="apx-container">
          <div className="apx-prefab-2col-grid">
            {promotionalTilesPage.collections.map((col, idx) => (
              <article
                key={idx}
                className="apx-material-card apx-clickable-card"
                onClick={() => onNavigate('/contact')}
              >
                <div className="apx-card-media">
                  <span className="apx-card-series">PROMOTIONAL TILE SERIES</span>
                  <img src={col.image} alt={col.alt} className="apx-card-img" loading="lazy" />
                  <div className="apx-card-hover-overlay">
                    <span>Inquire About {col.title} Tiles</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <div className="apx-card-info">
                  <div className="apx-card-heading-row">
                    <h2 className="apx-card-title">{col.title}</h2>
                    <span className="apx-card-status">On Sale</span>
                  </div>
                  <p className="apx-card-desc">{col.description}</p>
                  <div className="apx-card-action">
                    <a
                      href="/contact"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onNavigate('/contact');
                      }}
                      className="apx-card-link"
                    >
                      <span>Request Promotional Pricing</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="apx-about-section">
        <div className="apx-container">
          <div className="apx-catalog-header">
            <div>
              <span className="apx-eyebrow">AUTHORIZED TILE DISTRIBUTOR</span>
              <h2 className="apx-section-title">Featured Tile Brand Partners</h2>
            </div>
            <a
              href="/tiles"
              className="apx-btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/tiles');
              }}
            >
              <span>View All Tile Brands</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="apx-tile-brands-grid">
            {tilesPage.brands.slice(0, 6).map((brand, idx) => (
              <a
                key={idx}
                href={brand.href}
                target="_blank"
                rel="noopener noreferrer"
                className="apx-tile-brand-card"
              >
                <div className="apx-tile-brand-thumb">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    loading="lazy"
                    onError={(e) => {
                      if (brand.localFallback && e.target.src !== brand.localFallback) {
                        e.target.src = brand.localFallback;
                      }
                    }}
                  />
                </div>
                <div className="apx-tile-brand-body">
                  <div>
                    <h3 className="apx-tile-brand-name">{brand.name}</h3>
                    <span className="apx-tile-brand-meta">{brand.meta}</span>
                  </div>
                  <ExternalLink size={15} className="apx-tile-brand-icon" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// 7. /flooring Page
export function FlooringPage({ onNavigate }) {
  const { flooringPage } = pagesData;
  const [activeTab, setActiveTab] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const visibleItems = useMemo(() => {
    if (activeTab === 'all') return flooringPage.items;
    return flooringPage.items.filter((item) => item.category === activeTab);
  }, [flooringPage.items, activeTab]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [activeTab]);

  useEffect(() => {
    if (!isPlaying || visibleItems.length <= 1) return undefined;
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % visibleItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, selectedIndex, visibleItems.length]);

  const currentItem = visibleItems[selectedIndex] || visibleItems[0];

  const getItemImg = (item) => {
    if (!item) return '';
    if (item.swatch) return buildWoodSwatchDataUri(item.swatch);
    return item.image;
  };

  return (
    <div className="apx-page-wrap">
      <PageSlideshow slides={flooringPage.slides} altPrefix="Hardwood & LVP Flooring" />

      <section className="apx-subpage-intro-section">
        <div className="apx-container">
          <div className="apx-subpage-intro-card">
            <span className="apx-eyebrow">
              <Layers size={13} />
              <span>{flooringPage.eyebrow}</span>
            </span>
            <h1 className="apx-section-title">{flooringPage.title}</h1>
            {flooringPage.paragraphs.map((p, idx) => (
              <p key={idx} className="apx-subpage-lead">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Flooring Inspiration Gallery & Showcase Viewer */}
      <section className="apx-catalog-section">
        <div className="apx-container">
          <div className="apx-materials-header">
            <div className="apx-materials-titles">
              <span className="apx-eyebrow">
                <Sparkles size={13} />
                <span>{flooringPage.eyebrow}</span>
              </span>
              <h2 className="apx-section-title">{flooringPage.galleryHeading}</h2>
              <p className="apx-section-sub">{flooringPage.gallerySubheading}</p>
            </div>

            <div className="apx-filter-group" role="tablist">
              {flooringPage.tabs.map((tab) => {
                const count =
                  tab.id === 'all'
                    ? flooringPage.items.length
                    : flooringPage.items.filter((i) => i.category === tab.id).length;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`apx-filter-btn ${activeTab === tab.id ? 'is-active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Inline Featured Showcase Viewer */}
          {currentItem && (
            <div className="apx-flooring-stage">
              <div className="apx-flooring-stage-media">
                <img
                  src={getItemImg(currentItem)}
                  alt={currentItem.fullTitle}
                  className="apx-flooring-stage-img"
                  onError={(e) => {
                    if (
                      currentItem.fallbackImage &&
                      e.target.src !== currentItem.fallbackImage
                    ) {
                      e.target.src = currentItem.fallbackImage;
                    }
                  }}
                />
                <button
                  type="button"
                  className="apx-hero-arrow apx-arrow-prev"
                  onClick={() =>
                    setSelectedIndex(
                      (prev) => (prev - 1 + visibleItems.length) % visibleItems.length
                    )
                  }
                  aria-label="Previous Finish"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className="apx-hero-arrow apx-arrow-next"
                  onClick={() =>
                    setSelectedIndex((prev) => (prev + 1) % visibleItems.length)
                  }
                  aria-label="Next Finish"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="apx-flooring-stage-details">
                <div className="apx-flooring-stage-top">
                  <span className="apx-card-status">{currentItem.badge}</span>
                  <div className="apx-flooring-stage-ctrls">
                    <span className="apx-flooring-counter">
                      {selectedIndex + 1} / {visibleItems.length}
                    </span>
                    <button
                      type="button"
                      className="apx-partner-ctrl"
                      onClick={() => setIsPlaying((p) => !p)}
                      aria-label={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
                    >
                      {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                    </button>
                  </div>
                </div>

                <div className="apx-flooring-stage-copy">
                  <span className="apx-sku-tag">{currentItem.subtitle}</span>
                  <h3 className="apx-section-title">{currentItem.fullTitle}</h3>
                  <p className="apx-subpage-lead">{currentItem.spec}</p>
                </div>

                <div className="apx-about-actions">
                  <a
                    href="/contact"
                    className="apx-btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/contact');
                    }}
                  >
                    <span>Request Sample / Quote</span>
                    <ArrowUpRight size={15} />
                  </a>
                  {currentItem.link && currentItem.link.startsWith('http') && (
                    <a
                      href={currentItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="apx-btn-secondary"
                    >
                      <span>Manufacturer Specs</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 32-Item Thumbnail Grid */}
          <div className="apx-slab-catalog-grid">
            {visibleItems.map((item, idx) => (
              <article
                key={`${item.title}-${idx}`}
                className={`apx-slab-item-card ${
                  idx === selectedIndex ? 'is-selected-plank' : ''
                }`}
                onClick={() => setSelectedIndex(idx)}
              >
                <div className="apx-slab-img-wrap">
                  <span className="apx-slab-badge is-new">{item.badge}</span>
                  <img
                    src={getItemImg(item)}
                    alt={item.fullTitle}
                    className="apx-slab-img"
                    loading="lazy"
                    onError={(e) => {
                      if (item.fallbackImage && e.target.src !== item.fallbackImage) {
                        e.target.src = item.fallbackImage;
                      }
                    }}
                  />
                </div>
                <div className="apx-slab-item-body">
                  <span className="apx-sku-tag">{item.collection}</span>
                  <h3 className="apx-slab-item-title">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Flooring Partners */}
      <section className="apx-about-section">
        <div className="apx-container">
          <div className="apx-catalog-header">
            <div>
              <span className="apx-eyebrow">FEATURED FLOORING PARTNERS</span>
              <h2 className="apx-section-title">
                Hardwood, Luxury Vinyl & Wood-Look Flooring
              </h2>
              <p className="apx-section-sub">
                Select a manufacturer below to browse full plank specifications, color palettes, and room visualizers on their official website.
              </p>
            </div>
          </div>

          <div className="apx-materials-grid">
            {flooringPage.partners.map((partner, idx) => (
              <a
                key={idx}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="apx-material-card apx-flooring-partner-card"
              >
                <div className="apx-card-info">
                  <div className="apx-card-heading-row">
                    <span className="apx-card-status">{partner.tag}</span>
                    <ExternalLink size={15} className="apx-tile-brand-icon" />
                  </div>
                  <div className="apx-flooring-brand-kicker">{partner.brand}</div>
                  <h3 className="apx-card-title">{partner.title}</h3>
                  <p className="apx-card-desc">{partner.description}</p>
                  <div className="apx-card-action">
                    <span className="apx-card-link">
                      <span>{partner.cta}</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// 8. /gallery Page
export function GalleryPage({ onNavigate }) {
  const { galleryPage } = pagesData;
  const [lightboxIdx, setLightboxIdx] = useState(null);

  return (
    <div className="apx-page-wrap">
      <section className="apx-page-banner">
        <div className="apx-container apx-banner-split">
          <div>
            <span className="apx-eyebrow">
              <Sparkles size={13} />
              <span>{galleryPage.eyebrow}</span>
            </span>
            <h1 className="apx-page-main-title">{galleryPage.title}</h1>
            <p className="apx-section-sub">{galleryPage.subtitle}</p>
          </div>
          <a
            href="/contact"
            className="apx-btn-primary"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/contact');
            }}
          >
            <span>Get a Quote</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      <section className="apx-materials-section">
        <div className="apx-container">
          <div className="apx-gallery-masonry">
            {galleryPage.images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="apx-gallery-masonry-item"
                onClick={() => setLightboxIdx(idx)}
              >
                <img
                  src={imgUrl}
                  alt={`Apex Marble Installation & Showroom ${idx + 1}`}
                  loading="lazy"
                />
                <div className="apx-card-hover-overlay">
                  <span>View Full Image</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxIdx !== null && (
        <div className="apx-modal-backdrop" onClick={() => setLightboxIdx(null)}>
          <div className="apx-lightbox-only" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="apx-modal-close"
              onClick={() => setLightboxIdx(null)}
            >
              <X size={20} />
            </button>
            <img
              src={galleryPage.images[lightboxIdx]}
              alt={`Gallery Preview ${lightboxIdx + 1}`}
              className="apx-lightbox-full-img"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// 9. /about Page
export function AboutPage({ onNavigate }) {
  const { aboutPage } = pagesData;
  const { aboutSection } = websiteData;

  return (
    <div className="apx-page-wrap">
      <section className="apx-page-banner">
        <div className="apx-container">
          <span className="apx-eyebrow">
            <Award size={13} />
            <span>{aboutPage.eyebrow}</span>
          </span>
          <h1 className="apx-page-main-title">{aboutPage.title}</h1>
        </div>
      </section>

      <section className="apx-about-section">
        <div className="apx-container">
          <div className="apx-about-grid">
            <div className="apx-about-copy-col">
              {aboutPage.paragraphs.map((p, idx) => (
                <p key={idx} className="apx-about-body">
                  {p}
                </p>
              ))}

              <div className="apx-subpage-meta-box">
                <h3 className="apx-card-title">{aboutPage.showroomBox.heading}</h3>
                <p className="apx-card-desc" style={{ marginBottom: 0 }}>
                  {aboutPage.showroomBox.text}
                </p>
              </div>

              <div className="apx-about-actions" style={{ marginTop: '1.75rem' }}>
                <a
                  href="/contact"
                  className="apx-btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                >
                  <span>Schedule Showroom Visit</span>
                  <ArrowUpRight size={15} />
                </a>
                <a
                  href="/slabs"
                  className="apx-btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/slabs');
                  }}
                >
                  <span>Browse Slab Inventory</span>
                </a>
              </div>
            </div>

            <div className="apx-about-media-col">
              <div className="apx-about-frame" style={{ marginBottom: '1.5rem' }}>
                <img
                  src={aboutPage.showroomImage}
                  alt="Apex Marble San Jose Showroom"
                  className="apx-about-img"
                  onError={(e) => {
                    if (e.target.src !== aboutPage.remoteShowroomImage) {
                      e.target.src = aboutPage.remoteShowroomImage;
                    }
                  }}
                />
              </div>

              <div className="apx-video-frame">
                <iframe
                  src={aboutPage.videoEmbedUrl}
                  title="Apex Marble Showroom Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <div className="apx-stats-grid">
            {aboutSection.stats.map((stat, idx) => (
              <div key={idx} className="apx-stat-box">
                <span className="apx-stat-val">{stat.value}</span>
                <span className="apx-stat-lbl">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apex Marble Highlights Section from apexmarbleinc.com/about */}
      <section className="apx-materials-section">
        <div className="apx-container">
          <div className="apx-subpage-intro-card">
            <h2 className="apx-section-title">{aboutPage.highlightsTitle}</h2>
            <p className="apx-subpage-lead">{aboutPage.highlightsIntro}</p>

            <div className="apx-about-highlights-grid">
              <div className="apx-highlight-box">
                <h3 className="apx-card-title">{aboutPage.projectTypesHeading}</h3>
                <ul className="apx-highlight-list">
                  {aboutPage.projectTypes.map((pt, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className="apx-check-icon" />
                      <div>
                        <strong>{pt.title}</strong> — {pt.desc}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="apx-highlight-box">
                <h3 className="apx-card-title">{aboutPage.whyChooseHeading}</h3>
                <ul className="apx-highlight-list">
                  {aboutPage.whyChooseList.map((wc, idx) => (
                    <li key={idx}>
                      <Check size={16} className="apx-check-icon" />
                      <div>
                        <strong>{wc.title}</strong> — {wc.desc}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="apx-about-closing-banner">{aboutPage.closingText}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// 10. /faq Page
export function FaqPage({ onNavigate }) {
  const { faqPage } = pagesData;
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    return faqPage.categories
      .filter((c) => activeCategory === 'All' || c.category === activeCategory)
      .map((c) => ({
        ...c,
        items: c.items.filter((item) => {
          if (!searchQuery.trim()) return true;
          const q = searchQuery.toLowerCase();
          return (
            item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
          );
        })
      }))
      .filter((c) => c.items.length > 0);
  }, [faqPage.categories, activeCategory, searchQuery]);

  return (
    <div className="apx-page-wrap">
      <section className="apx-page-banner">
        <div className="apx-container">
          <span className="apx-eyebrow">
            <HelpCircle size={13} />
            <span>{faqPage.eyebrow}</span>
          </span>
          <h1 className="apx-page-main-title">{faqPage.title}</h1>
          <p className="apx-section-sub">{faqPage.subtitle}</p>
        </div>
      </section>

      <section className="apx-catalog-section">
        <div className="apx-container">
          <div className="apx-catalog-toolbar">
            <div className="apx-search-input-wrap">
              <Search size={16} className="apx-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stone care, heat resistance, sealing, outdoor use..."
                className="apx-search-input"
              />
            </div>

            <div className="apx-filter-group" role="tablist">
              <button
                type="button"
                className={`apx-filter-btn ${activeCategory === 'All' ? 'is-active' : ''}`}
                onClick={() => setActiveCategory('All')}
              >
                All Topics
              </button>
              {faqPage.categories.map((cat) => (
                <button
                  key={cat.category}
                  type="button"
                  className={`apx-filter-btn ${
                    activeCategory === cat.category ? 'is-active' : ''
                  }`}
                  onClick={() => setActiveCategory(cat.category)}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>

          {filteredCategories.map((cat) => (
            <div key={cat.category} className="apx-faq-category-block">
              <h2 className="apx-faq-category-title">{cat.category}</h2>
              <div className="apx-faq-grid">
                {cat.items.map((item, idx) => (
                  <article key={idx} className="apx-faq-card">
                    <h3 className="apx-faq-q">{item.q}</h3>
                    <p className="apx-faq-a">{item.a}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}

          <div className="apx-faq-cta-box">
            <div>
              <h3>Have a specific question about your project or slab selection?</h3>
              <p>Our San Jose stone specialists are happy to guide you through material specs and fabrication.</p>
            </div>
            <a
              href="/contact"
              className="apx-btn-primary"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
            >
              <span>Contact Our Showroom</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// 11. /contact Page
export function ContactPage() {
  const { contactPage } = pagesData;
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="apx-page-wrap">
      <PageSlideshow slides={contactPage.slides} altPrefix="Apex Marble San Jose Showroom" />

      {/* 4 Contact Info Cards ("Let's Build Something Exceptional") */}
      <section className="apx-subpage-intro-section">
        <div className="apx-container">
          <div className="apx-contact-header-center">
            <span className="apx-eyebrow">
              <MapPin size={13} />
              <span>{contactPage.eyebrow}</span>
            </span>
            <h1 className="apx-section-title">{contactPage.title}</h1>
            <p className="apx-section-sub">{contactPage.subtitle}</p>
          </div>

          <div className="apx-contact-cards-grid">
            {contactPage.infoCards.map((card, idx) => (
              <div key={idx} className="apx-contact-info-card">
                <div className="apx-contact-icon-badge">
                  {card.type === 'location' && <MapPin size={20} />}
                  {card.type === 'phone' && <Phone size={20} />}
                  {card.type === 'email' && <Mail size={20} />}
                  {card.type === 'hours' && <Clock size={20} />}
                </div>
                <h3 className="apx-contact-card-title">{card.title}</h3>
                <div className="apx-contact-card-lines">
                  {card.lines.map((line, lIdx) =>
                    card.href ? (
                      <a
                        key={lIdx}
                        href={card.href}
                        target={card.type === 'location' ? '_blank' : undefined}
                        rel={card.type === 'location' ? 'noopener noreferrer' : undefined}
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={lIdx}>{line}</p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GET A QUOTE Form & Showroom Visual */}
      <section id="quote" className="apx-about-section">
        <div className="apx-container">
          <div className="apx-about-grid">
            <div className="apx-about-copy-col">
              <span className="apx-eyebrow">{contactPage.quoteSubheading}</span>
              <h2 className="apx-section-title">{contactPage.quoteHeading}</h2>
              <p className="apx-about-body">{contactPage.quoteDescription}</p>

              {submitted ? (
                <div className="apx-form-success">
                  <CheckCircle2 size={24} />
                  <div>
                    <strong>Thank you for contacting Apex Marble Inc.!</strong>
                    <p>
                      Our San Jose showroom team has received your inquiry and will respond promptly. For immediate assistance, call us at (408) 278-1300.
                    </p>
                  </div>
                </div>
              ) : (
                <form className="apx-quote-form" onSubmit={handleFormSubmit}>
                  <div className="apx-form-row-2col">
                    <div className="apx-form-field">
                      <label>Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={formState.firstName}
                        onChange={(e) =>
                          setFormState({ ...formState, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div className="apx-form-field">
                      <label>Last name</label>
                      <input
                        type="text"
                        placeholder="Your last name"
                        value={formState.lastName}
                        onChange={(e) =>
                          setFormState({ ...formState, lastName: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="apx-form-row-2col">
                    <div className="apx-form-field">
                      <label>Telephone number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Your Telephone number"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({ ...formState, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="apx-form-field">
                      <label>Your email *</label>
                      <input
                        type="email"
                        required
                        placeholder="Your email address"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="apx-form-field">
                    <label>Message *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Enter your message (e.g., slab variety, project dimensions, or showroom visit request)"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                    />
                  </div>

                  <button type="submit" className="apx-btn-primary">
                    <span>Submit Quote Request</span>
                    <ArrowUpRight size={15} />
                  </button>
                </form>
              )}
            </div>

            <div className="apx-about-media-col">
              <div className="apx-about-frame">
                <img
                  src={contactPage.featureImage}
                  alt="Apex Marble San Jose Slab Warehouse"
                  className="apx-about-img"
                  onError={(e) => {
                    e.target.src = '/images/about-showroom.jpg';
                  }}
                />
              </div>

              {/* Newsletter Box from apexmarbleinc.com/contact */}
              <div className="apx-newsletter-card">
                <h3>{contactPage.newsletter.heading}</h3>
                <p>{contactPage.newsletter.subheading}</p>
                {newsletterSent ? (
                  <p className="apx-newsletter-confirm">
                    Thank you for subscribing to Apex Marble updates!
                  </p>
                ) : (
                  <form
                    className="apx-newsletter-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setNewsletterSent(true);
                    }}
                  >
                    <input
                      type="email"
                      required
                      placeholder="Your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                    />
                    <button type="submit" className="apx-btn-primary">
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section from apexmarbleinc.com/contact */}
      <section className="apx-materials-section">
        <div className="apx-container">
          <div className="apx-contact-header-center">
            <span className="apx-eyebrow">
              <Star size={13} />
              <span>{contactPage.testimonials.eyebrow}</span>
            </span>
            <h2 className="apx-section-title">{contactPage.testimonials.heading}</h2>
            <p className="apx-section-sub">{contactPage.testimonials.subheading}</p>
          </div>

          <div className="apx-prefab-2col-grid">
            {contactPage.testimonials.items.map((rev, idx) => (
              <article key={idx} className="apx-testimonial-card">
                <div className="apx-testimonial-top">
                  <span className="apx-testimonial-stars">★★★★★</span>
                  <span className="apx-card-status">{rev.tag}</span>
                </div>
                <p className="apx-testimonial-quote">{rev.quote}</p>
                <div className="apx-testimonial-author">
                  <strong>{rev.author}</strong>
                  <span>{rev.meta}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// 12. /store Page
export function StorePage({ onNavigate }) {
  const { storePage, showerPanelsPage } = pagesData;
  const [selectedProduct, setSelectedProduct] = useState(null);

  const featuredStoreItems = useMemo(() => {
    const promos = inventoryData
      .filter((p) => p.discount && p.discount !== '' && p.discount !== '0%')
      .slice(0, 8);
    const prefabs = inventoryData
      .filter((p) => p.material.toLowerCase().includes('prefab countertop'))
      .slice(0, 4);
    return [...promos, ...prefabs];
  }, []);

  return (
    <div className="apx-page-wrap">
      <section className="apx-page-banner">
        <div className="apx-container">
          <span className="apx-eyebrow">
            <Sparkles size={13} />
            <span>{storePage.eyebrow}</span>
          </span>
          <h1 className="apx-page-main-title">{storePage.title}</h1>
          <p className="apx-section-sub">{storePage.subtitle}</p>
        </div>
      </section>

      {/* 4 Product Highlight Cards */}
      <section className="apx-materials-section">
        <div className="apx-container">
          <div className="apx-prefab-2col-grid">
            {storePage.highlights.map((item, idx) => (
              <article
                key={idx}
                className="apx-material-card apx-clickable-card"
                onClick={() => onNavigate(item.href)}
              >
                <div className="apx-card-media">
                  <span className="apx-card-series">{item.subtitle}</span>
                  <img src={item.image} alt={item.title} className="apx-card-img" loading="lazy" />
                  <div className="apx-card-hover-overlay">
                    <span>Explore {item.title}</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
                <div className="apx-card-info">
                  <h2 className="apx-card-title">{item.title}</h2>
                  <p className="apx-card-desc">{item.description}</p>
                  <div className="apx-card-action">
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onNavigate(item.href);
                      }}
                      className="apx-card-link"
                    >
                      <span>View Collection</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Promotional & Pre-Fab Store Inventory */}
      <section className="apx-about-section">
        <div className="apx-container">
          <div className="apx-catalog-header">
            <div>
              <span className="apx-eyebrow">IN-STOCK SPECIALS & PREFAB KITS</span>
              <h2 className="apx-section-title">Featured Store Inventory</h2>
            </div>
            <a
              href="/promotional-slabs"
              className="apx-btn-primary"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/promotional-slabs');
              }}
            >
              <span>View All Promotional Slabs</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="apx-slab-catalog-grid">
            {featuredStoreItems.map((item) => (
              <article
                key={item.id}
                className="apx-slab-item-card"
                onClick={() => setSelectedProduct(item)}
              >
                <div className="apx-slab-img-wrap">
                  {item.discount && (
                    <span className="apx-slab-badge is-promo">{item.discount} OFF</span>
                  )}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="apx-slab-img"
                    loading="lazy"
                    onError={(e) => {
                      if (item.fallbackImage && e.target.src !== item.fallbackImage) {
                        e.target.src = item.fallbackImage;
                      }
                    }}
                  />
                </div>
                <div className="apx-slab-item-body">
                  <h3 className="apx-slab-item-title">{item.title}</h3>
                  <div className="apx-slab-item-meta">
                    <span>{item.material}</span>
                    {item.dimensions && <span>• {item.dimensions}</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Featured Shower Panels Pricing Preview */}
          <div className="apx-catalog-header" style={{ marginTop: '3.5rem' }}>
            <div>
              <span className="apx-eyebrow">DIRECT PACKAGE PRICING</span>
              <h3 className="apx-section-title">Prefab Porcelain Shower Panels ($495 / 2 Boxes)</h3>
            </div>
            <a
              href="/showerpanels"
              className="apx-btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/showerpanels');
              }}
            >
              <span>View All Shower Panels</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="apx-slab-catalog-grid">
            {showerPanelsPage.items.slice(0, 4).map((sp) => (
              <article
                key={sp.sku}
                className="apx-slab-item-card"
                onClick={() => onNavigate('/showerpanels')}
              >
                <div className="apx-slab-img-wrap">
                  <span className="apx-slab-badge is-promo">{sp.badge}</span>
                  <img
                    src={sp.image}
                    alt={sp.name}
                    className="apx-slab-img"
                    loading="lazy"
                    onError={(e) => {
                      if (sp.fallbackImage && e.target.src !== sp.fallbackImage) {
                        e.target.src = sp.fallbackImage;
                      }
                    }}
                  />
                </div>
                <div className="apx-slab-item-body">
                  <span className="apx-sku-tag">{sp.sku}</span>
                  <h3 className="apx-slab-item-title">{sp.name}</h3>
                  <div className="apx-slab-item-meta">
                    {sp.salePrice ? (
                      <span>Sale: {sp.salePrice} (2 Boxes)</span>
                    ) : (
                      <span>{sp.status}</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Store Testimonial & FAQs */}
      <section className="apx-materials-section">
        <div className="apx-container">
          <div className="apx-faq-grid">
            {storePage.faqs.map((f, idx) => (
              <article key={idx} className="apx-faq-card">
                <h3 className="apx-faq-q">{f.q}</h3>
                <p className="apx-faq-a">{f.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onNavigate={onNavigate}
      />
    </div>
  );
}

