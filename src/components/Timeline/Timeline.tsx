import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView, easeOut } from 'framer-motion';

import { Experience } from '../../types';
import { TimelineItem } from './TimelineItem';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Props for the Timeline component.
 */
type TimelineProps = {
  /** Array of experience data to display in the timeline. */
  experienceData: Experience[];
};

type TimelineRefs = {
  [key: string]: HTMLDivElement | null;
};

// Animation variants for scroll-triggered timeline animations
const timelineContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
      staggerChildren: 0.15, // 150ms stagger between timeline items
      delayChildren: 0.2, // 200ms delay before children start animating
    },
  },
};

/**
 * TimelineComponent displays a chronological list of professional experiences.
 * It orchestrates TimelineItem components, manages overall layout, and scroll-triggered animations.
 * @param {TimelineProps} props - The properties passed to the component.
 * @returns {React.ReactElement} The rendered TimelineComponent.
 */
const TimelineComponent = ({ experienceData }: TimelineProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const timelineRefs = useRef<TimelineRefs>({});
  const shouldReduceMotion = useReducedMotion();

  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineContainerRef, {
    amount: 0.3,
    once: true,
    margin: '0px 0px -100px 0px',
  });

  const getYearRange = useCallback((dateString: string): string => {
    if (dateString.toLowerCase().includes('present')) {
      const startYearMatch = dateString.match(/\b(19|20)\d{2}\b/);
      return startYearMatch ? `${startYearMatch[0]}-Present` : dateString;
    }
    const yearMatches = dateString.match(/\b(19|20)\d{2}\b/g);
    if (yearMatches && yearMatches.length >= 2) {
      return `${yearMatches[0]}-${yearMatches[yearMatches.length - 1]}`;
    } else if (yearMatches && yearMatches.length === 1) {
      return yearMatches[0];
    }
    return dateString.split(' ')[0];
  }, []);

  const toggleExpand = useCallback((id: string): void => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const announceStateChange = useCallback(
    (id: string, isExpanding: boolean): void => {
      const item = experienceData.find((exp) => exp.id === id);
      if (!item) return;
      const message = isExpanding
        ? `Expanded details for ${item.title} at ${item.company}`
        : `Collapsed details for ${item.title} at ${item.company}`;
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      document.body.appendChild(announcement);
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    },
    [experienceData],
  );

  const handleKeyDown = (e: React.KeyboardEvent, id: string): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand(id);
      announceStateChange(id, expandedId !== id);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (expandedId) {
        announceStateChange(expandedId, false);
        setExpandedId(null);
      }
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = experienceData.findIndex((item) => item.id === id);
      const nextIndex =
        e.key === 'ArrowDown'
          ? Math.min(currentIndex + 1, experienceData.length - 1)
          : Math.max(currentIndex - 1, 0);
      const nextButton = document.querySelector(
        `button[aria-describedby="timeline-content-${experienceData[nextIndex].id}"]`,
      ) as HTMLButtonElement;
      if (nextButton) {
        nextButton.focus();
      }
    }
  };

  const isLeftSide = (index: number): boolean => index % 2 === 0;

  useEffect(() => {
    if (expandedId && timelineRefs.current[expandedId]) {
      const element = timelineRefs.current[expandedId];
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!isInView) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [expandedId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.timeline-card') && !target.closest('.timeline-icon')) {
        setExpandedId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const setTimelineRef =
    (id: string) =>
    (el: HTMLDivElement | null): void => {
      timelineRefs.current[id] = el;
    };

  return (
    <section id="timeline" className="bg-[var(--bg-surface-subtle)] px-4 py-[var(--space-section)]">
      <div className="container mx-auto w-full">
        <h2 className="mb-6 text-center font-display text-4xl font-semibold tracking-tight">
          Professional Timeline
        </h2>
        <motion.div
          ref={timelineContainerRef}
          className="relative mx-auto grid w-full max-w-none grid-cols-1 gap-4 px-4 md:max-w-6xl md:grid-cols-[1fr_min-content_1fr] md:px-8"
          variants={shouldReduceMotion ? undefined : timelineContainerVariants}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          animate={shouldReduceMotion ? undefined : isInView ? 'visible' : 'hidden'}
        >
          {experienceData.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              isExpanded={expandedId === item.id}
              isLeftSide={isLeftSide(index)}
              getYearRange={getYearRange}
              toggleExpand={toggleExpand}
              announceStateChange={announceStateChange}
              handleKeyDown={handleKeyDown}
              setTimelineRef={setTimelineRef}
              shouldReduceMotion={shouldReduceMotion}
              itemIndex={index}
              itemsCount={experienceData.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/**
 * Memoized Timeline component.
 * @see TimelineComponent
 */
export const Timeline = React.memo(TimelineComponent);
