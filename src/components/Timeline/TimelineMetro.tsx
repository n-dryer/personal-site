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

type TimelineYearRailProps = {
  items: TimelineItem[];
  activeId: string | null;
  onItemClick: (item: TimelineItem) => void;
};

/**
 * Semantic year rail component with radiogroup semantics
 * Displays date pills in a responsive layout optimized for mobile
 */
const TimelineYearRail = React.memo(
  ({ items, activeId, onItemClick }: TimelineYearRailProps) => {
    return (
      <div
        role="radiogroup"
        aria-label="Experience periods"
        className="relative z-0 flex w-full max-w-sm flex-row flex-wrap justify-center gap-2 sm:flex-col sm:flex-nowrap sm:justify-between sm:gap-0"
      >
        {/* Central thread - hidden on mobile, visible on tablet+ */}
        <div
          className="absolute bottom-0 left-1/2 top-0 hidden -translate-x-1/2 sm:block sm:w-[3px]"
          aria-hidden="true"
        >
          <div className="via-resume-accent/40 h-full w-full bg-gradient-to-b from-transparent to-transparent" />
        </div>

        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <div
              key={`${item.id}-pill`}
              className="z-10 flex sm:min-h-[12rem] sm:w-full sm:cursor-pointer sm:items-start sm:justify-center sm:pt-6 md:w-auto"
              onClick={(e) => {
                e.stopPropagation();
                onItemClick(item);
              }}
              role="radio"
              aria-checked={isActive}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onItemClick(item);
                }
              }}
            >
              <DatePill date={item.date} isActive={isActive} />
            </div>
          );
        })}
      </div>
    );
  },
);

TimelineYearRail.displayName = 'TimelineYearRail';

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
      <section id="timeline" className="section-spacing-y">
        <div className="container-padding-x mx-auto w-full">
          <div className="relative mx-auto max-w-4xl text-center">
            <h2 className="heading-margin font-instrument text-4xl font-semibold tracking-tight text-resume-text-primary">
              Work Experience
            </h2>
            <p className="text-resume-text-secondary">
              No work experience data available at this time.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" className="section-spacing-y">
      <div className="container-padding-x mx-auto w-full">
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="heading-margin font-instrument text-4xl font-semibold tracking-tight text-resume-text-primary">
            Work Experience
          </h2>
        </div>

        <div className="relative mx-auto flex max-w-lg flex-col items-center sm:max-w-4xl sm:flex-row sm:items-start sm:justify-center">
          {/* Year Rail with Date Pills */}
          <TimelineYearRail items={items} activeId={activeId} onItemClick={handleCardClick} />

          {/* Timeline Cards */}
          <ol role="list" className="relative z-10 w-full max-w-lg">
            <AnimatePresence>
              {items.map((item, index) => {
                const isActive = activeId === item.id;

                return (
                  <motion.li
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
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>
        </div>
      </div>
    </section>
  );
};
