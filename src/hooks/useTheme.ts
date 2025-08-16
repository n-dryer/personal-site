import { useState, useEffect, useCallback } from 'react';

/**
 * Describes the return value of the `useTheme` hook.
 */
interface UseThemeReturn {
  /** Boolean indicating if dark mode is currently active. */
  darkMode: boolean;
  /** Function to toggle the current theme (light/dark). */
  toggleTheme: () => void;
}

/**
 * Custom hook for managing the application theme (light/dark).
 * It initializes the theme based on localStorage or system preference (`prefers-color-scheme`).
 * Provides a `darkMode` boolean state and a `toggleTheme` function to switch themes.
 * Theme changes are applied to the document's root element (`<html>`) by adding/removing the 'dark' class
 * and the preference is persisted to localStorage.
 * It also listens for system theme changes and updates accordingly if no explicit user preference is set.
 *
 * @returns {UseThemeReturn} An object containing the current theme state and a function to toggle it.
 * @see UseThemeReturn
 */
export const useTheme = (): UseThemeReturn => {
  // Initialize theme state from localStorage or system preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;

    const storedThemeValue = localStorage.getItem('theme'); // e.g., 'light', 'dark'
    if (storedThemeValue) {
      return storedThemeValue === 'dark';
    }

    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  /**
   * Toggle theme with optimized CSS transitions
   * FIXED: Removed View Transitions API to eliminate white screen flash
   * Uses CSS transitions for smooth theme changes without visual artifacts
   * Memoized for performance optimization to prevent unnecessary re-renders
   */
  const toggleTheme = useCallback((): void => {
    setDarkMode((prevMode) => !prevMode);
  }, []);

  // Apply theme changes to DOM and localStorage
  useEffect(() => {
    const htmlElement = document.documentElement;

    const newDatasetTheme = darkMode ? 'graphite-dark' : 'graphite-light';
    // Avoid redundant writes to minimize reflow; add a short-lived class for scoped transitions
    if (htmlElement.dataset.theme !== newDatasetTheme) {
      htmlElement.classList.add('theme-changing');
      htmlElement.dataset.theme = newDatasetTheme;
      // Remove transition scope class shortly after to limit global transitions
      window.setTimeout(() => {
        htmlElement.classList.remove('theme-changing');
      }, 200);
    }
    if (darkMode) {
      htmlElement.classList.add('dark');
      // Hint browsers for built-in UI painting to prevent flashes
      htmlElement.style.colorScheme = 'dark';
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.style.colorScheme = 'light';
    }

    // Save preference to localStorage as 'light' or 'dark'
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no explicit preference is stored
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    darkMode,
    toggleTheme,
  };
};
