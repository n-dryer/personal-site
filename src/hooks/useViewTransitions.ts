import { useCallback } from 'react';

/**
 * @interface ViewTransition
 * @description Represents the View Transition API interface.
 * @property {() => void} [startViewTransition] - A function to start a view transition.
 */
interface ViewTransition {
  startViewTransition?: (callback: () => void) => void;
}

/**
 * Custom hook for handling view transitions with graceful fallback.
 *
 * This hook abstracts the experimental View Transitions API, allowing for smooth
 * transitions between UI states. It checks for browser support and provides a
 * wrapper function that either uses the API or falls back to a direct state update.
 *
 * @returns {{ withViewTransition: (callback: () => void) => void }}
 *          An object containing the `withViewTransition` function.
 *
 * @example
 * const { withViewTransition } = useViewTransitions();
 *
 * const handleClick = () => {
 *   withViewTransition(() => {
 *     // State updates that cause a DOM change
 *     setActiveTab('new-tab');
 *   });
 * };
 */
export const useViewTransitions = (): {
  withViewTransition: (callback: () => void) => void;
} => {
  /**
   * Wraps a callback with a view transition if supported.
   *
   * @param {() => void} callback - The function to execute, typically containing state updates.
   */
  const withViewTransition = useCallback((callback: () => void) => {
    // Check if the View Transitions API is available on the document object
    if ((document as ViewTransition).startViewTransition) {
      (document as ViewTransition).startViewTransition!(callback);
    } else {
      // If not supported, execute the callback directly
      callback();
    }
  }, []);

  return { withViewTransition };
};
