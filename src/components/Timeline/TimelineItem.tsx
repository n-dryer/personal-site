import { AnimatePresence, motion, easeOut } from 'framer-motion';

import { Experience } from '../../types';
import React from 'react';

/**
 * Props for the TimelineItem component.
 */
type TimelineItemProps = {
  item: Experience;
  isExpanded: boolean;
  isLeftSide: boolean;
  getYearRange: (dateString: string) => string;
  toggleExpand: (id: string) => void;
  announceStateChange: (id: string, isExpanding: boolean) => void;
  handleKeyDown: (e: React.KeyboardEvent, id: string) => void;
  setTimelineRef: (id: string) => (el: HTMLDivElement | null) => void;
  shouldReduceMotion: boolean;
  itemIndex: number;
  itemsCount: number;
};

// Animation variants for individual timeline items
const timelineItemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};

/**
 * TimelineItemComponent renders a single item in the professional timeline.
 * It handles the display of experience details and manages its own expand/collapse animation state.
 * @param {TimelineItemProps} props - The properties passed to the component.
 * @returns {React.ReactElement} The rendered TimelineItemComponent.
 */
const TimelineItemComponent = ({
  item,
  isExpanded,
  isLeftSide,
  getYearRange,
  toggleExpand,
  announceStateChange,
  handleKeyDown,
  setTimelineRef,
  shouldReduceMotion,
  itemIndex,
  itemsCount,
}: TimelineItemProps): React.ReactElement => {
  const { id, title, company, location, date, technologies, icon: IconComponent } = item;

  return (
    <React.Fragment>
      {/* Mobile single-column connectors: left-anchored segment + dot per item */}
      <div className="relative md:hidden" style={{ gridRow: itemIndex + 1 }}>
        {/* Top segment (hidden for first item) */}
        {itemIndex > 0 && (
          <span
            className="absolute left-4 top-0 h-[calc(50%-6px)] w-px bg-accent"
            aria-hidden="true"
          />
        )}
        {/* Bottom segment (hidden for last item) */}
        {itemIndex < itemsCount - 1 && (
          <span
            className="absolute bottom-0 left-4 h-[calc(50%-6px)] w-px bg-accent"
            aria-hidden="true"
          />
        )}
        {/* Dot */}
        <span
          className="absolute left-4 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-accent shadow-md"
          aria-hidden="true"
        />
      </div>
      <div
        className={`${isLeftSide ? 'md:col-start-1' : 'md:col-start-3'}`}
        style={{ gridRow: itemIndex + 1 }}
      >
        <motion.div
          ref={setTimelineRef(id)}
          className="timeline-grid-item"
          style={{
            marginBottom: isExpanded ? 'var(--space-5)' : 'var(--space-4)',
          }}
          variants={shouldReduceMotion ? undefined : timelineItemVariants}
        >
          <motion.div
            layout="position"
            id={`timeline-content-${id}`}
            className={`timeline-card-wrapper relative w-full md:w-auto ${
              isExpanded
                ? 'z-20 md:max-w-md lg:max-w-lg xl:max-w-xl'
                : 'z-10 md:max-w-sm lg:max-w-md xl:max-w-lg'
            }`}
            style={{
              marginTop: '0',
            }}
            initial={false}
            animate={{
              transition: shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.4,
                    ease: easeOut,
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  },
            }}
          >
            <div className="flex items-baseline gap-2">
              <span className="inline-flex items-center whitespace-nowrap rounded-md bg-accent px-2 py-[var(--space-1)] text-xs font-semibold text-on-accent">
                {getYearRange(date)}
              </span>
            </div>
            <motion.div
              layout="position"
              className={`timeline-card-hover timeline-card-focus glass-surface relative text-left ${isExpanded ? 'p-[var(--space-5)]' : 'p-4'} cursor-pointer rounded-lg border border-white/10 shadow-sm ${shouldReduceMotion ? '' : 'transition-all duration-300'}`}
              data-view-transition-name={`timeline-card-${itemIndex + 1}`}
              style={
                {
                  '--view-transition-name': `timeline-card-${itemIndex + 1}`,
                  backgroundColor: 'var(--bg-primary)',
                } as React.CSSProperties
              }
              onClick={() => {
                toggleExpand(id);
                announceStateChange(id, !isExpanded);
              }}
              role="button"
              tabIndex={0}
              aria-controls={`timeline-expanded-${id}`}
              aria-labelledby={`timeline-title-${id}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleExpand(id);
                  announceStateChange(id, !isExpanded);
                }
                handleKeyDown(e, id);
              }}
            >
              <motion.div layout="position">
                <h3
                  id={`timeline-title-${id}`}
                  className={`${isExpanded ? 'mb-3 text-lg md:text-xl' : 'mb-2 text-base md:text-lg'} font-semibold leading-tight text-text-primary`}
                >
                  {company}
                </h3>
                <p
                  className={`${isExpanded ? 'mb-3 text-base md:text-lg' : 'mb-2 text-sm md:text-base'} font-medium leading-snug text-text-secondary`}
                >
                  {title}
                </p>
                {isExpanded && (
                  <p className="mb-4 text-sm font-normal text-text-secondary">{location}</p>
                )}
              </motion.div>
              <AnimatePresence mode="wait">
                {isExpanded && (
                  <motion.div
                    id={`timeline-expanded-${id}`}
                    className="timeline-expanded-content"
                    data-view-transition-name={`expanded-content-${itemIndex + 1}`}
                    style={
                      {
                        overflow: 'hidden',
                        '--view-transition-name': `expanded-content-${itemIndex + 1}`,
                      } as React.CSSProperties
                    }
                    initial={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            height: 'auto',
                            transition: {
                              duration: 0.3,
                              ease: easeOut,
                              staggerChildren: 0.1,
                              type: 'spring',
                              stiffness: 300,
                              damping: 30,
                            },
                          }
                    }
                    exit={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 0,
                            height: 0,
                            transition: {
                              duration: 0.2,
                              ease: easeOut,
                            },
                          }
                    }
                  >
                    <motion.div
                      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={shouldReduceMotion ? undefined : { delay: 0.05 }}
                    >
                      {technologies && (
                        <div className="mb-4">
                          <div className="flex flex-wrap justify-start gap-2">
                            {technologies.map((tech, techIdx) => (
                              <span
                                key={techIdx}
                                className="bg-text-secondary/10 hover:bg-text-secondary/20 inline-block rounded-full px-3 py-[var(--space-1)] text-sm font-medium text-text-secondary backdrop-blur-sm transition-colors duration-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Placeholder for achievements and projects if they are to be displayed */}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      {/* Desktop center column: per-item segmented connectors and dot */}
      <div
        style={{ gridColumn: 2, gridRow: itemIndex + 1 }}
        className="relative hidden items-center justify-center md:flex"
      >
        {/* Top segment (hidden for first item) */}
        {itemIndex > 0 && (
          <span
            className="absolute h-[calc(50%-24px)] w-px bg-accent"
            style={{ top: 0 }}
            aria-hidden="true"
          />
        )}
        {/* Bottom segment (hidden for last item) */}
        {itemIndex < itemsCount - 1 && (
          <span
            className="absolute h-[calc(50%-24px)] w-px bg-accent"
            style={{ bottom: 0 }}
            aria-hidden="true"
          />
        )}
        {/* Dot + button */}
        <button
          className={`timeline-icon timeline-icon-focus flex h-12 min-h-[44px] w-12 min-w-[44px] cursor-pointer items-center justify-center rounded-full bg-accent text-on-accent shadow-lg`}
          onClick={() => {
            toggleExpand(id);
            announceStateChange(id, !isExpanded);
          }}
          onKeyDown={(e) => handleKeyDown(e, id)}
          type="button"
          role="button"
          aria-expanded={isExpanded}
          aria-controls={`timeline-content-${id}`}
          aria-labelledby={`timeline-title-${id}`}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for ${title} at ${company}`}
          aria-describedby={`timeline-content-${id}`}
        >
          <IconComponent size={20} />
        </button>
      </div>
    </React.Fragment>
  );
};

export const TimelineItem = React.memo(TimelineItemComponent);
