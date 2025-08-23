import React, { forwardRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { extractKPIs, formatKPI } from '../../utils/kpiExtractor';
import { useInView } from '../../hooks/useIntersectionObserver';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Badge } from '../ui/Badge';

export type TimelineCardProps = {
  /** Unique identifier */
  id: string;
  /** Job title */
  title: string;
  /** Company name */
  company: string;
  /** Location */
  location: string;
  /** Date range */
  date: string;
  /** Job description */
  description: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Achievement list */
  achievements: string[];
  /** Technology stack */
  technologies: string[];
  /** Whether this card is currently active/in-view */
  isActive?: boolean;
  /** Position on timeline (alternating left/right) */
  side: 'left' | 'right';
  /** Index for staggered animations */
  index: number;
  /** Click handler for card interaction */
  onClick?: () => void;
  /** Year for the timeline dot */
  year: string;
  /** Focus event handler */
  onFocus?: () => void;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** ARIA description ID */
  'aria-describedby'?: string;
  /** Additional CSS classes */
  className?: string;
  onInView: (index: number, inView: boolean) => void;
};

/**
 * TimelineCard component for metro map style timeline
 * Displays job experience with KPIs, technologies, and achievements
 * Enhanced with accessibility features and focus management
 */
export const TimelineCard = forwardRef<HTMLElement, TimelineCardProps>(
  (
    {
      id,
      title,
      company,
      location,
      date,
      description,
      icon: Icon,
      achievements,
      technologies,
      isActive = false,
      side,
      index,
      onClick,
      year: _year,
      onFocus,
      tabIndex = 0,
      'aria-describedby': ariaDescribedby,
      className = '',
      onInView,
    },
    ref,
  ) => {
    const kpis = extractKPIs(achievements);
    const shouldReduceMotion = useReducedMotion();
    const { ref: inViewRef, inView } = useInView({
      threshold: 0.2,
      rootMargin: '-15% 0% -25% 0%',
      once: false,
    });

    useEffect(() => {
      onInView(index, inView);
    }, [inView, index, onInView]);

    const combinedRef = (node: HTMLElement | null) => {
      inViewRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const positionClass = `timeline-card--${side}`;
    const animationClass = !shouldReduceMotion && inView ? 'timeline-card--in-view' : 'timeline-card--hidden';

    return (
      <article
        ref={combinedRef}
        id={`timeline-card-${id}`}
        data-side={side}
        data-inview={inView}
        data-active={isActive}
        tabIndex={tabIndex}
        className={`timeline-card ${positionClass} ${animationClass} relative max-w-[280px] md:max-w-[320px] ${className}`}
        role="article"
        aria-labelledby={`timeline-title-${id}`}
        aria-describedby={ariaDescribedby}
        onFocus={onFocus}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        {/* Connection line to central thread */}
        <div className="timeline-card__connector absolute top-6 w-8 h-px bg-accent/30" />
        
        {/* Card content */}
        <div className="timeline-card__content bg-surface rounded-lg p-4 shadow-md border border-white/10 hover:shadow-lg transition-all duration-300">
          {/* Header with icon and basic info */}
          <header className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 
                id={`timeline-title-${id}`}
                className="text-lg font-semibold text-text-primary truncate"
              >
                {title}
              </h3>
              <p className="text-sm font-medium text-accent">{company}</p>
              <p className="text-xs text-text-secondary">{location} • {date}</p>
            </div>
          </header>

          {/* Description */}
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
            {description}
          </p>

          {/* KPIs */}
          {kpis.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {kpis.map((kpi, kpiIndex) => (
                  <Badge
                    key={kpiIndex}
                    variant="tech"
                    size="sm"
                    className="bg-accent/10 text-accent border-accent/20"
                  >
                    {formatKPI(kpi)}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {technologies.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="tech" size="sm">
                    {tech}
                  </Badge>
                ))}
                {technologies.length > 4 && (
                  <Badge variant="tech" size="sm">
                    +{technologies.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Achievements preview */}
          {achievements.length > 0 && (
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-text-primary hover:text-accent transition-colors list-none">
                <span className="group-open:hidden">View {achievements.length} achievement{achievements.length !== 1 ? 's' : ''}</span>
                <span className="hidden group-open:inline">Hide achievements</span>
              </summary>
              <ul className="mt-2 space-y-1">
                {achievements.map((achievement, achievementIndex) => (
                  <li key={achievementIndex} className="text-xs text-text-secondary pl-2 border-l-2 border-accent/20">
                    {achievement}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>

        {/* Timeline dot */}
        <div className="timeline-card__dot absolute top-6 w-3 h-3 rounded-full bg-accent shadow-lg border-2 border-surface" />
      </article>
    );
  },
);

TimelineCard.displayName = 'TimelineCard';