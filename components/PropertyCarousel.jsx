'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';

export default function PropertyCarousel({ properties = [], favoritedIds = new Set() }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    duration: 25,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Auto-Slide Interval with Hover Pause & 1.5s Resume Delay
  useEffect(() => {
    if (!emblaApi || isPaused) return;

    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);

  // Hover Handlers
  const handleMouseEnter = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    // 1.5 second delay after cursor leaves before auto-slide resumes
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 1500);
  };

  if (!properties.length) return null;

  return (
    <div
      className="relative group/carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Embla Viewport */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-6 -ml-6">
          {properties.map((prop) => (
            <div
              key={prop._id}
              className="flex-[0_0_85%] sm:flex-[0_0_46%] lg:flex-[0_0_29%] pl-6 shrink-0"
            >
              <PropertyCard
                property={prop}
                isFavorited={favoritedIds.has(prop._id?.toString())}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Prev/Next Controls */}
      <button
        type="button"
        suppressHydrationWarning
        onClick={() => emblaApi?.scrollPrev()}
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface border border-border shadow-sm items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-sunken text-primary z-20"
        title="Previous Residences"
      >
        <ChevronLeft className="w-5 h-5 text-primary" />
      </button>

      <button
        type="button"
        suppressHydrationWarning
        onClick={() => emblaApi?.scrollNext()}
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface border border-border shadow-sm items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-sunken text-primary z-20"
        title="Next Residences"
      >
        <ChevronRight className="w-5 h-5 text-primary" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-1.5 mt-6">
        {scrollSnaps.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selectedIndex ? 'w-6 bg-accent' : 'w-1.5 bg-border-strong hover:bg-secondary'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
