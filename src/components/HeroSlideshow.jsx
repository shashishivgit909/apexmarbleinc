import React, { useState, useEffect, useRef } from 'react';
import { websiteData } from '../data/websiteData';
import { ChevronLeft, ChevronRight, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';

export default function HeroSlideshow() {
  const { heroSlides, company } = websiteData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const totalSlides = heroSlides.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 5200);
    }
    return () => clearInterval(timerRef.current);
  }, [currentIndex, isPaused, totalSlides]);

  const currentSlide = heroSlides[currentIndex];
  const formattedIndex = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalSlides).padStart(2, '0');

  return (
    <section
      id="hero-slideshow-section"
      className="apx-hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="apx-hero-stage">
        {/* Architectural Background Slides */}
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`apx-hero-slide ${idx === currentIndex ? 'is-active' : ''}`}
            aria-hidden={idx !== currentIndex}
          >
            <img
              src={slide.url}
              alt={slide.alt || slide.title}
              className="apx-hero-img"
              loading={idx === 0 ? 'eager' : 'lazy'}
              onError={(e) => {
                if (slide.remoteUrl && e.target.src !== slide.remoteUrl) {
                  e.target.src = slide.remoteUrl;
                }
              }}
            />
            {/* Soft Warm Charcoal Scrim (Zero pure black, Zero blue/green) */}
            <div className="apx-hero-scrim" />
          </div>
        ))}

        {/* Centered / Asymmetric Architectural Editorial Content Card */}
        <div className="apx-container apx-hero-content-wrap">
        
          {/* Minimalist Slide Navigation Arrows */}
          <button
            type="button"
            className="apx-hero-arrow apx-arrow-prev"
            onClick={prevSlide}
            aria-label="Previous Stone Slide"
          >
            <ChevronLeft size={24} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            className="apx-hero-arrow apx-arrow-next"
            onClick={nextSlide}
            aria-label="Next Stone Slide"
          >
            <ChevronRight size={24} strokeWidth={1.75} />
          </button>

          {/* Interactive Bottom Indicators */}
          <div className="apx-hero-dots-row" role="tablist" aria-label="Slideshow Navigation">
            {heroSlides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Slide ${idx + 1}: ${s.title}`}
                className={`apx-hero-dot ${idx === currentIndex ? 'is-active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
