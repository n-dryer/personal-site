import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useMemo } from 'react';
import { Experience } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTimelineObserver } from '../../hooks/useTimelineObserver';
import { DatePill } from '../ui';
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
export const TimelineMetro = ({ experienceData = [] }: TimelineMetroProps) => {
  const shouldReduceMotion = useReducedMotion();
  const { activeId, registerCard, setActiveId } = useTimelineObserver();

  const items: TimelineItem[] = useMemo(
    () => experienceData.map((exp) => ({ ...exp, ...toSlug(exp) })),
    [experienceData],
  );

  const handleCardInViewChange = useCallback(
    (id: string, inView: boolean) => {
      if (inView) {
        registerCard(id, document.getElementById(`timeline-card-${id}`));
      }
    },
    [registerCard],
  );

  const handleCardClick = useCallback(
    (item: TimelineItem) => {
      const newActiveId = activeId === item.id ? null : item.id;
      setActiveId(newActiveId);

      // Update URL hash for deep linking
      if (newActiveId) {
        history.replaceState(null, '', `#exp=${item.slug}`);
        window.dispatchEvent(new CustomEvent('timeline:change', { detail: item.slug }));
      } else {
        // Clear hash when no card is active
        history.replaceState(null, '', window.location.pathname);
        window.dispatchEvent(new CustomEvent('timeline:change', { detail: null }));
      }
    },
    [activeId, setActiveId],
  );

  if (!items.length) {
    return (
      <section id="timeline" className="bg-background overflow-hidden py-[var(--space-section)]">
        <div className="container mx-auto w-full px-4">
          <div className="relative mx-auto max-w-4xl">
            <h2 className="mb-12 text-center font-display text-4xl font-semibold tracking-tight text-text-primary">
              Work Experience
            </h2>
            <p className="text-center text-text-secondary">
              No work experience data available at this time.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" className="bg-background overflow-hidden py-[var(--space-section)]">
      <div className="container mx-auto w-full px-4">
        <div className="relative mx-auto max-w-4xl">
          <h2 className="mb-12 text-center font-display text-4xl font-semibold tracking-tight text-text-primary">
            Work Experience
          </h2>
        </div>

        <div className="relative mx-auto flex max-w-lg flex-col items-center md:max-w-4xl md:flex-row md:items-start md:justify-center">
          {/* Central Axis */}
          <div className="relative z-0 flex w-full max-w-sm flex-row justify-between md:flex-col md:items-center">
            <div
              className="absolute bottom-0 left-1/2 top-0 -translate-x-1/2 md:w-0.5"
              aria-hidden="true"
            >
              <div className="via-accent/50 h-full w-full bg-gradient-to-b from-transparent to-transparent" />
            </div>
            {items.map((item) => (
              <div
                key={`${item.id}-pill`}
                className="z-10 flex min-h-[12rem] w-full cursor-pointer items-start justify-center pt-6 md:w-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(item);
                }}
              >
                <DatePill date={item.date} isActive={activeId === item.id} />
              </div>
            ))}
          </div>

          {/* Timeline Cards */}
          <div className="relative z-10 w-full max-w-lg">
            <AnimatePresence>
              {items.map((item, index) => {
                const isActive = activeId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    className="flex min-h-[12rem] items-center"
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -50 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.6,
                      delay: shouldReduceMotion ? 0 : index * 0.1,
                      ease: 'easeOut',
                    }}
                  >
                    <div className="w-full">
                      <TimelineCard
                        {...item}
                        isActive={isActive}
                        side="right"
                        index={index}
                        onClick={() => handleCardClick(item)}
                        onInViewChange={(inView) => handleCardInViewChange(item.id, inView)}
                        className={`mb-8 ${isActive ? 'timeline-card--active' : ''}`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
