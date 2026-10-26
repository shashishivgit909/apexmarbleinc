import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import { Palette, LayoutTemplate, Settings2, Check } from 'lucide-react';

export default function SectionToolbar({ sectionKey, sectionName, layoutOptions = [] }) {
  const { config, updateSectionField, setSectionLayout, openSectionCustomizer } = useCustomizer();
  const sectionConfig = config[sectionKey] || {};
  const [showColorPopover, setShowColorPopover] = useState(false);

  const currentLayout = sectionConfig.layout || 'original';

  const quickColors = [
    '#ff932f', '#ff9e2f', '#000000', '#1d1e20', '#ffffff', 
    '#d4af37', '#059669', '#2563eb', '#c2410c', '#4b5563'
  ];

  return (
    <div className="section-toolbar-wrapper">
      <div className="section-toolbar-pill">
        <span className="section-toolbar-title">
          <Settings2 size={13} className="inline-icon" />
          {sectionName}
        </span>

        {/* Layout Switcher buttons */}
        {layoutOptions.length > 0 && (
          <div className="section-toolbar-layouts">
            {layoutOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`layout-btn ${currentLayout === opt.id ? 'active' : ''}`}
                title={`Layout: ${opt.label}`}
                onClick={() => setSectionLayout(sectionKey, opt.id)}
              >
                <LayoutTemplate size={12} />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Quick Color Picker Trigger */}
        <div className="section-toolbar-color-rel">
          <button
            type="button"
            className="toolbar-action-btn color-trigger"
            onClick={() => setShowColorPopover(!showColorPopover)}
            title="Choose Section Colors"
          >
            <span
              className="color-dot-indicator"
              style={{ backgroundColor: sectionConfig.bg || sectionConfig.accent || '#ff932f' }}
            />
            <Palette size={12} />
            <span>Colors</span>
          </button>

          {showColorPopover && (
            <div className="quick-color-popover">
              <div className="popover-header">
                <strong>{sectionName} Colors</strong>
                <button
                  type="button"
                  className="close-popover-btn"
                  onClick={() => setShowColorPopover(false)}
                >
                  ✕
                </button>
              </div>

              {sectionConfig.bg !== undefined && (
                <div className="popover-row">
                  <label>Background:</label>
                  <div className="input-group">
                    <input
                      type="color"
                      value={sectionConfig.bg.startsWith('#') ? sectionConfig.bg : '#000000'}
                      onChange={(e) => updateSectionField(sectionKey, 'bg', e.target.value)}
                    />
                    <input
                      type="text"
                      className="hex-input"
                      value={sectionConfig.bg}
                      onChange={(e) => updateSectionField(sectionKey, 'bg', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {sectionConfig.accent !== undefined && (
                <div className="popover-row">
                  <label>Accent / Highlight:</label>
                  <div className="input-group">
                    <input
                      type="color"
                      value={sectionConfig.accent.startsWith('#') ? sectionConfig.accent : '#ff932f'}
                      onChange={(e) => updateSectionField(sectionKey, 'accent', e.target.value)}
                    />
                    <input
                      type="text"
                      className="hex-input"
                      value={sectionConfig.accent}
                      onChange={(e) => updateSectionField(sectionKey, 'accent', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {sectionConfig.text !== undefined && (
                <div className="popover-row">
                  <label>Text Color:</label>
                  <div className="input-group">
                    <input
                      type="color"
                      value={sectionConfig.text.startsWith('#') ? sectionConfig.text : '#ffffff'}
                      onChange={(e) => updateSectionField(sectionKey, 'text', e.target.value)}
                    />
                    <input
                      type="text"
                      className="hex-input"
                      value={sectionConfig.text}
                      onChange={(e) => updateSectionField(sectionKey, 'text', e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="popover-swatches">
                <span>Quick Swatches:</span>
                <div className="swatch-list">
                  {quickColors.map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      className="swatch-btn"
                      style={{ backgroundColor: hex }}
                      title={`Set accent/bg to ${hex}`}
                      onClick={() => {
                        if (sectionConfig.bg !== undefined) updateSectionField(sectionKey, 'bg', hex);
                        if (sectionConfig.accent !== undefined) updateSectionField(sectionKey, 'accent', hex);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Open full drawer for detailed section customization */}
        <button
          type="button"
          className="toolbar-action-btn edit-more-btn"
          onClick={() => openSectionCustomizer(sectionKey)}
          title="Open complete section options"
        >
          More Controls →
        </button>
      </div>
    </div>
  );
}
