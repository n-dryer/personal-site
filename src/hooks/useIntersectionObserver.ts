import { useState, useEffect, useRef } from 'react';

interface UseInViewOptions extends IntersectionObserverInit {
  /**
   * Whether the observer should only trigger once.
   * @default true
   */
  once?: boolean;
}

/**
 * Custom hook for observing when an element enters the viewport.
 * It uses the Intersection Observer API to efficiently detect visibility.
 *
 * @param {UseInViewOptions} options - Configuration options for the Intersection Observer.
 * @returns {{ ref: React.RefObject<T>, inView: boolean }} An object containing a ref to attach to the element and a boolean indicating if it's in view.
 * @template T - The type of the HTML element to be observed.
 */
export const useInView = <T extends HTMLElement = HTMLElement>(options: UseInViewOptions = {}) => {
  const { threshold = 0.2, rootMargin = '-15% 0% -25% 0%', once = true } = options;
  const [inView, setInView] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else {
          if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return { ref, inView };
};
