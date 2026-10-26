import React, { createContext, useContext, useState, useEffect } from 'react';

export const INITIAL_SECTION_CONFIG = {
  topBar: {
    layout: 'original', // 'original' | 'split' | 'minimal'
    bg: '#000000',
    text: '#ffffff',
    accent: '#ff932f',
    border: 'rgba(255, 255, 255, 0.15)',
    showQuoteBadge: true
  },
  header: {
    layout: 'original', // 'original' | 'modernSplit' | 'floatingGlass'
    bg: '#ff9e2f',
    text: '#ffffff',
    hoverText: '#18181a',
    accent: '#2f1c6a',
    dropdownBg: '#ffffff',
    dropdownText: '#1d1e20',
    isSticky: true
  },
  heroSlideshow: {
    layout: 'original', // 'original' | 'splitHero' | 'framedCard'
    bg: '#111111',
    accent: '#ff932f',
    textColor: '#ffffff',
    overlayOpacity: 0.35,
    autoplaySpeed: 4500,
    showIndicators: true,
    showArrows: true
  },
  materials: {
    layout: 'original', // 'original' | 'luxuryCards' | 'carouselSlider'
    bg: '#0d131f',
    headingColor: '#ffffff',
    subheadingColor: 'rgba(255, 255, 255, 0.8)',
    cardCapBg: '#000000',
    cardCapText: '#ffffff',
    accent: '#ff7a1a',
    overlayOpacity: 0.52
  },
  timeless: {
    layout: 'original', // 'original' | 'splitTwoColumn' | 'glassCard'
    bg: '#1c1b19',
    headingColor: '#ffffff',
    textColor: '#ffffff',
    buttonBg: '#1d1e20',
    buttonText: '#ffd749',
    buttonHoverBg: '#ff932f',
    buttonHoverText: '#ffffff',
    overlayOpacity: 0.55
  },
  partners: {
    layout: 'original', // 'original' | 'brandGrid' | 'cardCarousel'
    bg: '#ffffff',
    headingColor: '#000000',
    textColor: '#444444',
    accent: '#ff932f',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    speed: 40 // seconds for infinite scroll
  },
  about: {
    layout: 'original', // 'original' | 'mediaLeft' | 'statsFocus'
    bg: '#1d1e20',
    headingColor: '#ff932f',
    textColor: '#f3f3f3',
    ribbonBg: '#ff932f',
    ribbonText: '#ffffff',
    pillBg: '#ff932f',
    pillText: '#ffffff',
    accent: '#ffab55'
  },
  footer: {
    layout: 'original', // 'original' | 'modernGrid' | 'centeredLuxe'
    bg: '#b6b4af',
    headingColor: '#000000',
    textColor: '#1d1e20',
    cardBg: 'rgba(0, 0, 0, 0.25)',
    cardText: '#ffffff',
    accent: '#ff7a1a',
    starColor: '#ffd700',
    overlayOpacity: 0.25
  }
};

export const PRESET_THEMES = [
  {
    id: 'original',
    name: 'Original Hostinger Site',
    description: 'Exact live production colors and layouts from apexmarbleinc.com',
    primaryPreview: '#ff9e2f',
    secondaryPreview: '#1d1e20',
    config: INITIAL_SECTION_CONFIG
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Marble & 24K Gold',
    description: 'Deep onyx backdrop with regal gold trims and elegant modern layouts',
    primaryPreview: '#d4af37',
    secondaryPreview: '#0b0c10',
    config: {
      topBar: { ...INITIAL_SECTION_CONFIG.topBar, layout: 'split', bg: '#0b0c10', accent: '#d4af37' },
      header: { ...INITIAL_SECTION_CONFIG.header, layout: 'modernSplit', bg: '#12141a', text: '#f3e8c8', hoverText: '#d4af37', accent: '#d4af37' },
      heroSlideshow: { ...INITIAL_SECTION_CONFIG.heroSlideshow, layout: 'framedCard', accent: '#d4af37' },
      materials: { ...INITIAL_SECTION_CONFIG.materials, layout: 'luxuryCards', bg: '#0b0d12', cardCapBg: '#151821', accent: '#d4af37' },
      timeless: { ...INITIAL_SECTION_CONFIG.timeless, layout: 'glassCard', bg: '#111318', buttonBg: '#d4af37', buttonText: '#0b0c10' },
      partners: { ...INITIAL_SECTION_CONFIG.partners, layout: 'brandGrid', bg: '#141720', headingColor: '#d4af37', cardBg: '#1a1e29', textColor: '#cccccc' },
      about: { ...INITIAL_SECTION_CONFIG.about, layout: 'statsFocus', bg: '#0d0f14', headingColor: '#d4af37', ribbonBg: '#d4af37', ribbonText: '#0b0c10', pillBg: '#d4af37', pillText: '#0b0c10' },
      footer: { ...INITIAL_SECTION_CONFIG.footer, layout: 'modernGrid', bg: '#08090c', headingColor: '#d4af37', textColor: '#cccccc', cardBg: 'rgba(212, 175, 55, 0.1)', starColor: '#d4af37' }
    }
  },
  {
    id: 'emerald-stone',
    name: 'Imperial Emerald & Carrara',
    description: 'Rich gemstone hues with refined architecture for natural stone luxury',
    primaryPreview: '#059669',
    secondaryPreview: '#022c22',
    config: {
      topBar: { ...INITIAL_SECTION_CONFIG.topBar, layout: 'minimal', bg: '#022c22', accent: '#10b981' },
      header: { ...INITIAL_SECTION_CONFIG.header, layout: 'floatingGlass', bg: '#064e3b', text: '#ecfdf5', hoverText: '#34d399', accent: '#10b981' },
      heroSlideshow: { ...INITIAL_SECTION_CONFIG.heroSlideshow, layout: 'original', accent: '#10b981' },
      materials: { ...INITIAL_SECTION_CONFIG.materials, layout: 'carouselSlider', bg: '#022c22', cardCapBg: '#064e3b', accent: '#34d399' },
      timeless: { ...INITIAL_SECTION_CONFIG.timeless, layout: 'splitTwoColumn', bg: '#042f2e', buttonBg: '#10b981', buttonText: '#ffffff' },
      partners: { ...INITIAL_SECTION_CONFIG.partners, layout: 'original', bg: '#f0fdf4', headingColor: '#064e3b', cardBg: '#ffffff', textColor: '#064e3b' },
      about: { ...INITIAL_SECTION_CONFIG.about, layout: 'mediaLeft', bg: '#022c22', headingColor: '#34d399', ribbonBg: '#059669', ribbonText: '#ffffff', pillBg: '#059669', pillText: '#ffffff' },
      footer: { ...INITIAL_SECTION_CONFIG.footer, layout: 'centeredLuxe', bg: '#064e3b', headingColor: '#a7f3d0', textColor: '#d1fae5', cardBg: 'rgba(0, 0, 0, 0.3)', starColor: '#fbbf24' }
    }
  },
  {
    id: 'monochrome-slate',
    name: 'Modern Slate & Sapphire',
    description: 'Clean architectural styling with high-contrast slate and electric sapphire',
    primaryPreview: '#2563eb',
    secondaryPreview: '#1e293b',
    config: {
      topBar: { ...INITIAL_SECTION_CONFIG.topBar, layout: 'original', bg: '#0f172a', accent: '#38bdf8' },
      header: { ...INITIAL_SECTION_CONFIG.header, layout: 'modernSplit', bg: '#1e293b', text: '#ffffff', hoverText: '#38bdf8', accent: '#2563eb' },
      heroSlideshow: { ...INITIAL_SECTION_CONFIG.heroSlideshow, layout: 'splitHero', accent: '#2563eb' },
      materials: { ...INITIAL_SECTION_CONFIG.materials, layout: 'luxuryCards', bg: '#0f172a', cardCapBg: '#1e293b', accent: '#38bdf8' },
      timeless: { ...INITIAL_SECTION_CONFIG.timeless, layout: 'glassCard', bg: '#1e293b', buttonBg: '#2563eb', buttonText: '#ffffff' },
      partners: { ...INITIAL_SECTION_CONFIG.partners, layout: 'brandGrid', bg: '#f8fafc', headingColor: '#0f172a', cardBg: '#ffffff', textColor: '#334155' },
      about: { ...INITIAL_SECTION_CONFIG.about, layout: 'statsFocus', bg: '#0f172a', headingColor: '#38bdf8', ribbonBg: '#2563eb', ribbonText: '#ffffff', pillBg: '#2563eb', pillText: '#ffffff' },
      footer: { ...INITIAL_SECTION_CONFIG.footer, layout: 'modernGrid', bg: '#0f172a', headingColor: '#ffffff', textColor: '#94a3b8', cardBg: 'rgba(30, 41, 59, 0.7)', starColor: '#fbbf24' }
    }
  }
];

const CustomizerContext = createContext();

export function CustomizerProvider({ children }) {
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('apex_customizer_config');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_SECTION_CONFIG;
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'topBar' | 'header' | 'hero' | etc.
  const [focusedSectionId, setFocusedSectionId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('apex_customizer_config', JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  const updateSectionField = (sectionKey, field, value) => {
    setConfig(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value
      }
    }));
  };

  const setSectionLayout = (sectionKey, layoutVariant) => {
    updateSectionField(sectionKey, 'layout', layoutVariant);
  };

  const applyPresetTheme = (presetId) => {
    const preset = PRESET_THEMES.find(p => p.id === presetId);
    if (preset) {
      setConfig(preset.config);
    }
  };

  const resetToOriginal = () => {
    setConfig(INITIAL_SECTION_CONFIG);
  };

  const openSectionCustomizer = (sectionKey) => {
    setActiveTab(sectionKey);
    setIsDrawerOpen(true);
    setFocusedSectionId(sectionKey);
  };

  return (
    <CustomizerContext.Provider
      value={{
        config,
        updateSectionField,
        setSectionLayout,
        applyPresetTheme,
        resetToOriginal,
        isDrawerOpen,
        setIsDrawerOpen,
        activeTab,
        setActiveTab,
        focusedSectionId,
        setFocusedSectionId,
        openSectionCustomizer,
        presetThemes: PRESET_THEMES
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
}

export function useCustomizer() {
  const ctx = useContext(CustomizerContext);
  if (!ctx) {
    throw new Error('useCustomizer must be used within CustomizerProvider');
  }
  return ctx;
}
