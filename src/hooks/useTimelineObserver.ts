import { useEffect, useRef, useState, useCallback } from 'react';

export interface UseTimelineObserverOptions {
  /** Root margin for intersection observer (default: "-20% 0px -60% 0px") */
  rootMargin?: string;
  /** Threshold for intersection observer (default: 0.3) */
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
  /** Map of all registered elements */
  elementsMap: Map<string, HTMLElement>;
}

/**
 * Hook for managing timeline card intersection observation
 * Tracks which timeline card is currently in the viewport
 */
export const useTimelineObserver = (
  options: UseTimelineObserverOptions = {}
): UseTimelineObserverReturn => {
  const {
    rootMargin = '-20% 0px -60% 0px',
    threshold = 0.3,
    enabled = true,
  } = options;

  const [activeId, setActiveId] = useState<string | null>(null);
  const elementsMap = useRef<Map<string, HTMLElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * Register a timeline card element for observation
   */
  const registerCard = useCallback((id: string, element: HTMLElement | null) => {
    const currentMap = elementsMap.current;
    
    // Remove previous element if it exists
    const previousElement = currentMap.get(id);
    if (previousElement && observerRef.current) {
      observerRef.current.unobserve(previousElement);
    }

    if (element) {
      // Add new element
      currentMap.set(id, element);
      if (observerRef.current && enabled) {
        observerRef.current.observe(element);
      }
    } else {
      // Remove element
      currentMap.delete(id);
    }
  }, [enabled]);

  /**
   * Handle intersection observer entries
   */
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    // Find the most visible entry
    let mostVisibleEntry: IntersectionObserverEntry | null = null;
    let maxRatio = 0;

    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
        mostVisibleEntry = entry;
        maxRatio = entry.intersectionRatio;
      }
    });

    if (mostVisibleEntry) {
      // Extract ID from element (assuming format: timeline-card-{id})
      const elementId = mostVisibleEntry.target.id;
      const cardId = elementId.replace('timeline-card-', '');
      setActiveId(cardId);
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
    };
  }, [enabled, rootMargin, threshold, handleIntersection]);

  /**
   * Handle window resize (recalculate intersections)
   */
  useEffect(() => {
    const handleResize = () => {
      if (observerRef.current) {
        // Force recalculation by disconnecting and reconnecting
        observerRef.current.disconnect();
        elementsMap.current.forEach((element) => {
          observerRef.current?.observe(element);
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    activeId,
    registerCard,
    setActiveId,
    elementsMap: elementsMap.current,
  };
};