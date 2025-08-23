import React, { useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Experience } from '../../types';
import { useTimelineObserver } from '../../hooks/useTimelineObserver';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { TimelineCard } from './TimelineCard';

type TimelineMetroProps = {
  /** Array of experience data to display in the timeline */
  experienceData: Experience[];
};

type TimelineItem = Experience & { slug: string; year: string };

/**
 * Generate a slug from the experience start year and company
 */
const toSlug = (exp: Experience): { slug: string; year: string } => {
  const yearMatch = exp.date.match(/\b(19|20)\d{2}\b/);
  const year = yearMatch ? yearMatch[0] : 'na';
  const companySlug = exp.company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return { slug: `${year}-${companySlug}`, year };
};

/**
 * Metro map style timeline with central vertical thread and alternating cards
 * Features scroll-based active detection and smooth animations
 */
export const TimelineMetro = ({ experienceData }: TimelineMetroProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { activeId, registerCard } = useTimelineObserver();

  const items: TimelineItem[] = useMemo(
    () => experienceData.map((exp) => ({ ...exp, ...toSlug(exp) })),
    [experienceData],
  );

  const handleCardInView = useCallback((index: number, inView: boolean) => {
    if (inView) {
      registerCard(items[index].id, document.getElementById(`timeline-card-${items[index].id}`));
    }
  }, [items, registerCard]);

  const handleCardClick = useCallback((item: TimelineItem) => {
    // Update URL hash for deep linking
    history.replaceState(null, '', `#exp=${item.slug}`);
    window.dispatchEvent(new CustomEvent('timeline:change', { detail: item.slug }));
  }, []);

  return (
    <section id="timeline" className="bg-bg-surface-subtle py-[var(--space-section)]">
      <div className="container mx-auto w-full px-4">
        <h2 className="mb-6 text-center font-display text-4xl font-semibold tracking-tight">
          Professional Timeline
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center font-light tracking-wide text-text-secondary">
          Career journey with key achievements and technologies
        </p>

        {/* Metro Map Container */}
        <div className="timeline-metro relative">
          {/* Central Thread */}
          <div className="timeline-thread absolute left-1/2 top-0 bottom-0 w-px bg-accent/30 transform -translate-x-1/2" />
          
          {/* Timeline Cards */}
          <div className="timeline-cards relative">
            <AnimatePresence>
              {items.map((item, index) => {
                const isActive = activeId === item.id;
                const side = index % 2 === 0 ? 'left' : 'right';
                
                return (
                  <motion.div
                    key={item.slug}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.6,
                      delay: shouldReduceMotion ? 0 : index * 0.1,
                      ease: 'easeOut',
                    }}
                    className={`timeline-card-wrapper relative mb-12 ${
                      side === 'left' ? 'pr-[50%]' : 'pl-[50%]'
                    }`}
                  >
                    <div className={`timeline-card-container ${side === 'left' ? 'text-right' : 'text-left'}`}>
                      <TimelineCard
                        {...item}
                        isActive={isActive}
                        side={side}
                        index={index}
                        onClick={() => handleCardClick(item)}
                        onInView={handleCardInView}
                        className={`
                          ${side === 'left' ? 'mr-8' : 'ml-8'}
                          ${isActive ? 'timeline-card--active' : ''}
                        `}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Year Labels */}
          <div className="timeline-years absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 pointer-events-none">
            {items.map((item, index) => {
              const showYear = index === 0 || item.year !== items[index - 1].year;
              if (!showYear) return null;
              
              return (
                <div
                  key={`year-${item.year}`}
                  className="timeline-year absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    top: `${(index / (items.length - 1)) * 100}%`,
                  }}
                >
                  <span className="bg-surface px-3 py-1 text-xs font-semibold text-text-secondary rounded-full border border-accent/20">
                    {item.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};