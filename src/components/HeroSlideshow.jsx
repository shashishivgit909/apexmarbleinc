import React, { useState, useEffect } from 'react';
import { websiteData } from '../data/websiteData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AUTO_SLIDE_DELAY_MS = 3800;

export default function HeroSlideshow() {
  const { heroSlides } = websiteData;
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = heroSlides.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (totalSlides <= 1) return undefined;

    const timerId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, AUTO_SLIDE_DELAY_MS);

    return () => clearInterval(timerId);
  }, [currentIndex, totalSlides]);

  return (
    <section
      id="hero-slideshow-section"
      className="apx-hero-section"
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

        {/* Minimalist Slide Navigation Arrows */}
        <div className="apx-container apx-hero-content-wrap">
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
        </div>
      </div>
    </section>
  );
}
