import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, A11y, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type { Experience } from '../../types';
import { experienceData as defaultExperienceData } from 'content/experience';

/**
 * A responsive, swipeable carousel view for professional timeline entries.
 * - Mobile: swipe between cards
 * - Desktop: arrow buttons and keyboard Left/Right
 * Uses Swiper v11 React integration.
 */
export type TimelineCarouselProps = {
  experienceData?: Experience[];
};

const getImageForExperience = (exp: Experience): string => {
  // Placeholder image support (can be extended to per-item images later)
  return '/profile.jpg';
};

export const TimelineCarousel: React.FC<TimelineCarouselProps> = ({ experienceData }) => {
  const items = useMemo(() => experienceData ?? defaultExperienceData, [experienceData]);

  return (
    <section id="timeline-carousel" className="bg-bg-surface-subtle px-4 py-[var(--space-section)]">
      <div className="container mx-auto w-full">
        <h2 className="mb-6 text-center font-display text-4xl font-semibold tracking-tight">
          Professional Timeline (Carousel)
        </h2>

        <Swiper
          modules={[Navigation, Keyboard, A11y, Pagination]}
          navigation
          pagination={{ clickable: true }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          a11y={{ prevSlideMessage: 'Previous', nextSlideMessage: 'Next' }}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1.1 },
            768: { slidesPerView: 1.25 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          className="!pb-10"
        >
          {items.map((exp) => (
            <SwiperSlide key={exp.id} className="h-auto">
              <article className="glass-surface flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-bg-surface shadow-sm">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/10">
                  <img
                    src={getImageForExperience(exp)}
                    alt={`${exp.company} cover`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <header className="space-y-1">
                    <h3 className="text-lg font-semibold tracking-tight text-text-primary">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {exp.company} • {exp.location}
                    </p>
                    <p className="text-xs text-text-secondary">{exp.date}</p>
                  </header>
                  <p className="text-sm text-text-secondary">{exp.description}</p>
                  {exp.technologies?.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-text-secondary/10 rounded-full px-3 py-[var(--space-1)] text-xs font-medium text-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TimelineCarousel;
