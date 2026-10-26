import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import {
  Palette,
  LayoutTemplate,
  RotateCcw,
  Copy,
  Check,
  X,
  Sliders,
  Sparkles,
  Layers,
  ChevronDown,
  Eye
} from 'lucide-react';

export default function CustomizerDrawer() {
  const {
    config,
    updateSectionField,
    setSectionLayout,
    applyPresetTheme,
    resetToOriginal,
    isDrawerOpen,
    setIsDrawerOpen,
    activeTab,
    setActiveTab,
    presetThemes
  } = useCustomizer();

  const [copied, setCopied] = useState(false);

  const curatedPalettes = [
    { name: 'Apex Orange', hex: '#ff932f' },
    { name: 'Hostinger Header', hex: '#ff9e2f' },
    { name: 'Onyx Dark', hex: '#1d1e20' },
    { name: 'Deep Black', hex: '#000000' },
    { name: 'Pure White', hex: '#ffffff' },
    { name: 'Imperial Gold', hex: '#d4af37' },
    { name: 'Emerald Gem', hex: '#059669' },
    { name: 'Royal Sapphire', hex: '#2563eb' },
    { name: 'Warm Terracotta', hex: '#c2410c' },
    { name: 'Graphite Gray', hex: '#4b5563' },
    { name: 'Champagne Yellow', hex: '#ffd749' }
  ];

  const sectionTabs = [
    { key: 'all', label: 'Presets & Themes' },
    { key: 'topBar', label: 'Top Bar' },
    { key: 'header', label: 'Header' },
    { key: 'heroSlideshow', label: 'Hero Slideshow' },
    { key: 'materials', label: 'Stone Materials' },
    { key: 'timeless', label: 'Timeless Elegance' },
    { key: 'partners', label: 'Brand Partners' },
    { key: 'about', label: 'About Experience' },
    { key: 'footer', label: 'Footer & Reviews' }
  ];

  const sectionLayoutDefinitions = {
    topBar: [
      { id: 'original', label: 'Centered Inline (Live Site)', desc: 'Phone | Quote | Address inline centered' },
      { id: 'split', label: 'Split Ends', desc: 'Phone left, Quote center badge, Address right' },
      { id: 'minimal', label: 'Compact Capsule', desc: 'Sleek rounded capsule pill with badges' }
    ],
    header: [
      { id: 'original', label: 'Apex Orange (Live Site)', desc: 'Vibrant orange bar with logo & dropdown menus' },
      { id: 'modernSplit', label: 'Split Modern + CTA', desc: 'Luxury dark/light bar with highlighted quote button' },
      { id: 'floatingGlass', label: 'Floating Glass Island', desc: 'Curved glassmorphic island with blur effects' }
    ],
    heroSlideshow: [
      { id: 'original', label: 'Full Width (Live Site)', desc: 'Edge-to-edge 11-slide cinematic slider' },
      { id: 'splitHero', label: 'Split + Thumbnails Reel', desc: 'Stage view on left, scrollable thumbnails on right' },
      { id: 'framedCard', label: 'Framed Luxury Card', desc: 'Curved luxury card frame with progress tracker' }
    ],
    materials: [
      { id: 'original', label: '3-Col Grid (Live Site)', desc: '4:3 cards with solid black bottom caption caps' },
      { id: 'luxuryCards', label: '2-Col Detailed Cards', desc: 'Rich stone specs, feature tags, and quick-links' },
      { id: 'carouselSlider', label: 'Interactive Slider', desc: 'Smooth horizontal gallery with category filters' }
    ],
    timeless: [
      { id: 'original', label: 'Classic Editorial (Live Site)', desc: 'Centered narrative with dark gold CTA button' },
      { id: 'splitTwoColumn', label: '2-Column Split', desc: 'Bold value statement left, narrative and CTA right' },
      { id: 'glassCard', label: 'Glassmorphism Card', desc: 'Frosted glass container over bathroom tile backdrop' }
    ],
    partners: [
      { id: 'original', label: 'Infinite Marquee (Live Site)', desc: 'Continuous smooth track with manual navigation arrows' },
      { id: 'brandGrid', label: 'Multi-Col Brand Grid', desc: 'Clean 5-column responsive brand cards matrix' },
      { id: 'cardCarousel', label: 'Spotlight Carousel', desc: 'Featured partner cards with external site links' }
    ],
    about: [
      { id: 'original', label: 'Media Right (Live Site)', desc: 'Story & ribbon left, showroom image & trusted pill right' },
      { id: 'mediaLeft', label: 'Media Left Reversed', desc: 'Showroom media left, story & guarantee on right' },
      { id: 'statsFocus', label: 'Story + 4 Stat Badges', desc: '18+ Years, 250+ Slabs, 3500+ Projects metrics' }
    ],
    footer: [
      { id: 'original', label: '3-Part Grid (Live Site)', desc: 'Logo/contact left, review cards center, copyright right' },
      { id: 'modernGrid', label: '4-Column Corporate', desc: 'Brand, Catalog links, Verified Reviews, Showroom Info' },
      { id: 'centeredLuxe', label: 'Centered Luxury', desc: 'Minimalist centered layout with social badges' }
    ]
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderColorInput = (sectionKey, fieldKey, label) => {
    const val = config[sectionKey]?.[fieldKey] || '#ffffff';
    const isHex = typeof val === 'string' && val.startsWith('#');

    return (
      <div className="customizer-field-row" key={fieldKey}>
        <div className="field-meta">
          <label className="field-label">{label}</label>
          <span className="field-code">{val}</span>
        </div>
        <div className="color-control-unit">
          <input
            type="color"
            value={isHex ? val : '#ffffff'}
            onChange={(e) => updateSectionField(sectionKey, fieldKey, e.target.value)}
            className="native-color-picker"
            aria-label={`Pick color for ${label}`}
          />
          <input
            type="text"
            value={val}
            onChange={(e) => updateSectionField(sectionKey, fieldKey, e.target.value)}
            className="text-hex-input"
            placeholder="#hex or rgb"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        id="open-customizer-btn"
        className="floating-customizer-toggle"
        onClick={() => setIsDrawerOpen(true)}
        aria-label="Open Website Color & Layout Customizer"
      >
        <Sliders size={18} className="toggle-icon spin-hover" />
        <span className="toggle-label">Customize Layouts & Colors</span>
      </button>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="customizer-backdrop"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Main Slide-out Panel */}
      <aside
        id="website-customizer-panel"
        className={`customizer-drawer ${isDrawerOpen ? 'is-open' : ''}`}
        aria-label="Interactive Page Customizer"
      >
        <div className="drawer-header">
          <div className="drawer-title-group">
            <div className="drawer-icon-wrap">
              <Palette size={20} />
            </div>
            <div>
              <h3>Interactive Site Customizer</h3>
              <p>Change layout & color codes live on this page</p>
            </div>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close customizer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="drawer-tabs-bar">
          {sectionTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`drawer-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="drawer-body">
          {/* ================= TAB: THEME PRESETS ================= */}
          {activeTab === 'all' && (
            <div className="tab-pane theme-presets-pane">
              <div className="pane-intro">
                <h4>
                  <Sparkles size={16} />
                  <span>One-Click Design Themes</span>
                </h4>
                <p>
                  Instantly transform all section colors and layout configurations at once, or fine-tune each section using the tabs above.
                </p>
              </div>

              <div className="presets-list">
                {presetThemes.map((preset) => (
                  <div key={preset.id} className="preset-card">
                    <div className="preset-colors-row">
                      <span
                        className="preset-color-badge"
                        style={{ backgroundColor: preset.primaryPreview }}
                      />
                      <span
                        className="preset-color-badge"
                        style={{ backgroundColor: preset.secondaryPreview }}
                      />
                    </div>
                    <div className="preset-info">
                      <strong>{preset.name}</strong>
                      <p>{preset.description}</p>
                    </div>
                    <button
                      type="button"
                      className="apply-preset-btn"
                      onClick={() => applyPresetTheme(preset.id)}
                    >
                      Apply Theme
                    </button>
                  </div>
                ))}
              </div>

              <div className="curated-swatches-box">
                <h4>Quick Brand Colors Reference</h4>
                <div className="swatches-grid">
                  {curatedPalettes.map((swatch) => (
                    <div key={swatch.name} className="swatch-item">
                      <span
                        className="swatch-box"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="swatch-name">{swatch.name}</span>
                      <code className="swatch-code">{swatch.hex}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TABS: INDIVIDUAL SECTIONS ================= */}
          {activeTab !== 'all' && (
            <div className="tab-pane section-detail-pane">
              {/* Layout Switcher */}
              <div className="customizer-box">
                <div className="box-title">
                  <LayoutTemplate size={16} />
                  <h4>Choose Section Layout</h4>
                </div>

                <div className="layout-options-grid">
                  {(sectionLayoutDefinitions[activeTab] || []).map((opt) => {
                    const isSelected = config[activeTab]?.layout === opt.id;
                    return (
                      <div
                        key={opt.id}
                        className={`layout-option-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSectionLayout(activeTab, opt.id)}
                      >
                        <div className="opt-check">
                          {isSelected ? <Check size={14} /> : <span className="empty-circle" />}
                        </div>
                        <div className="opt-details">
                          <strong>{opt.label}</strong>
                          <p>{opt.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Color Code Controls */}
              <div className="customizer-box">
                <div className="box-title">
                  <Palette size={16} />
                  <h4>Section Color Codes</h4>
                </div>

                <div className="color-fields-list">
                  {config[activeTab]?.bg !== undefined &&
                    renderColorInput(activeTab, 'bg', 'Section Background Color')}

                  {config[activeTab]?.headingColor !== undefined &&
                    renderColorInput(activeTab, 'headingColor', 'Heading Text Color')}

                  {config[activeTab]?.textColor !== undefined &&
                    renderColorInput(activeTab, 'textColor', 'Body Text Color')}

                  {config[activeTab]?.text !== undefined &&
                    renderColorInput(activeTab, 'text', 'Navigation Text Color')}

                  {config[activeTab]?.accent !== undefined &&
                    renderColorInput(activeTab, 'accent', 'Accent / Highlights')}

                  {config[activeTab]?.cardCapBg !== undefined &&
                    renderColorInput(activeTab, 'cardCapBg', 'Card Caption Background')}

                  {config[activeTab]?.cardCapText !== undefined &&
                    renderColorInput(activeTab, 'cardCapText', 'Card Caption Text')}

                  {config[activeTab]?.buttonBg !== undefined &&
                    renderColorInput(activeTab, 'buttonBg', 'Button Background')}

                  {config[activeTab]?.buttonText !== undefined &&
                    renderColorInput(activeTab, 'buttonText', 'Button Text Color')}

                  {config[activeTab]?.cardBg !== undefined &&
                    renderColorInput(activeTab, 'cardBg', 'Card Background Color')}

                  {config[activeTab]?.ribbonBg !== undefined &&
                    renderColorInput(activeTab, 'ribbonBg', 'Ribbon Badge Background')}

                  {config[activeTab]?.pillBg !== undefined &&
                    renderColorInput(activeTab, 'pillBg', 'Trusted Pill Background')}
                </div>

                {/* Overlay Opacity Slider for Image Backdrops */}
                {config[activeTab]?.overlayOpacity !== undefined && (
                  <div className="customizer-field-row slider-row">
                    <div className="field-meta">
                      <label className="field-label">Background Darkness Overlay:</label>
                      <span className="field-code">
                        {Math.round((config[activeTab].overlayOpacity || 0) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={config[activeTab].overlayOpacity ?? 0.5}
                      onChange={(e) =>
                        updateSectionField(activeTab, 'overlayOpacity', parseFloat(e.target.value))
                      }
                      className="opacity-slider"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="drawer-footer">
          <button
            type="button"
            className="footer-btn reset-btn"
            onClick={resetToOriginal}
            title="Revert back to exact original Hostinger site colors & layout"
          >
            <RotateCcw size={15} />
            <span>Reset to Original</span>
          </button>

          <button
            type="button"
            className="footer-btn copy-btn"
            onClick={handleCopyConfig}
            title="Copy current color codes and layouts configuration as JSON"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>{copied ? 'Copied Config!' : 'Copy Color Codes'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
