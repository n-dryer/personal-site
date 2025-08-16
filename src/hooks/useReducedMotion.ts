import { useState, useEffect } from 'react';

/**
 * Custom hook to check for the user's preference for reduced motion.
 * This hook listens to the `(prefers-reduced-motion: reduce)` media query
 * to determine if animations and transitions should be minimized or disabled,
 * enhancing accessibility. It gracefully handles environments where `window.matchMedia`
 * might not be available or fully supported.
 *
 * @returns {boolean} True if the user prefers reduced motion, false otherwise.
 *                    Defaults to false if the preference cannot be determined.
 */
export const useReducedMotion = (): boolean => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check if window.matchMedia is available (not available in Jest environment)
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery && typeof mediaQuery.matches === 'boolean') {
          setShouldReduceMotion(mediaQuery.matches);

          const handleChange = (e: MediaQueryListEvent) => {
            setShouldReduceMotion(e.matches);
          };

          mediaQuery.addEventListener('change', handleChange);
          return () => mediaQuery.removeEventListener('change', handleChange);
        }
      } catch {
        // Fallback for environments where matchMedia is not properly supported
        console.warn('matchMedia not supported, using default motion settings');
      }
    }
  }, []);

  return shouldReduceMotion;
};
