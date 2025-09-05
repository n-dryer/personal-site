import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseTimelineObserverOptions {
  /** Root margin for intersection observer (default: "-40% 0px -40% 0px") */
  rootMargin?: string;
  /** Threshold for intersection observer (default: 0.5) */
  threshold?: number;
  /** Whether to enable intersection observing (default: true) */
  enabled?: boolean;
}

export interface UseTimelineObserverReturn {
  /** Currently active timeline item ID */
  activeId: string | null;
  /** Function to register a timeline card element */
  registerCard: (id: string, element: HTMLElement | null) => void;
  /** Function to manually set active ID (for programmatic control) */
  setActiveId: (id: string | null) => void;
}

/**
 * Custom hook for managing the active state of timeline cards based on viewport visibility.
 * It uses an Intersection Observer to track which timeline card is most prominently in view
 * and provides functionality to register cards for observation and manually set the active card.
 *
 * @param {UseTimelineObserverOptions} options - Configuration options for the Intersection Observer.
 * @returns {UseTimelineObserverReturn} An object containing the active card ID and functions to manage observation.
 */
export const useTimelineObserver = (
  options: UseTimelineObserverOptions = {},
): UseTimelineObserverReturn => {
  const { rootMargin = '-40% 0px -40% 0px', threshold = 0.5, enabled = true } = options;

  const [activeId, _setActiveId] = useState<string | null>(null);
  const elementsMap = useRef<Map<string, HTMLElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const interactionTimer = useRef<number | null>(null);
  const isUserInteracting = useRef(false);

  const setActiveId = useCallback((id: string | null) => {
    _setActiveId(id);
    isUserInteracting.current = true;
    if (interactionTimer.current) {
      window.clearTimeout(interactionTimer.current);
    }
    interactionTimer.current = window.setTimeout(() => {
      isUserInteracting.current = false;
    }, 1000);
  }, []);

  /**
   * Register a timeline card element for observation
   */
  const registerCard = useCallback(
    (id: string, element: HTMLElement | null) => {
      const currentMap = elementsMap.current;
      const observer = observerRef.current;

      // Unobserve previous element if it exists
      const previousElement = currentMap.get(id);
      if (previousElement && observer) {
        observer.unobserve(previousElement);
      }

      if (element) {
        // Observe new element
        currentMap.set(id, element);
        if (observer && enabled) {
          observer.observe(element);
        }
      } else {
        // Remove element from map
        currentMap.delete(id);
      }
    },
    [enabled],
  );

  /**
   * Handle intersection observer entries
   */
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (isUserInteracting.current) return;

    const intersectingEntries = entries.filter((entry) => entry.isIntersecting);

    if (intersectingEntries.length > 0) {
      // Sort by intersection ratio to find the most visible element
      intersectingEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const mostVisibleEntry = intersectingEntries[0];

      // Extract ID from element (assuming format: timeline-card-{id})
      const cardId = (mostVisibleEntry.target as HTMLElement).id.replace('timeline-card-', '');
      _setActiveId(cardId);
    }
  }, []);

  /**
   * Initialize intersection observer
   */
  useEffect(() => {
    if (!enabled) {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    // Create intersection observer
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold,
    });

    observerRef.current = observer;

    // Observe all currently registered elements
    elementsMap.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      observerRef.current = null;
      if (interactionTimer.current) {
        window.clearTimeout(interactionTimer.current);
      }
    };
  }, [enabled, rootMargin, threshold, handleIntersection]);

  return {
    activeId,
    registerCard,
    setActiveId,
  };
};
