import { useState, useEffect, useRef } from 'react';

interface UseInViewOptions extends IntersectionObserverInit {
  /**
   * Whether the observer should only trigger once.
   * @default true
   */
  once?: boolean;
}

export const useInView = <T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {}
) => {
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
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return { ref, inView };
};