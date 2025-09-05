import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { useViewTransitions } from '../../hooks/useViewTransitions';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Props for the ThemeToggle component.
 */
type ThemeToggleProps = {
  /** Indicates if dark mode is currently active. */
  darkMode: boolean;
  /** Function to toggle the theme. */
  toggleTheme: () => void;
};

/**
 * ThemeToggleComponent is a button that allows users to switch between light and dark themes.
 * It displays a sun icon for light mode and a moon icon for dark mode, with animations.
 * The component uses view transitions if supported by the browser.
 * @param {ThemeToggleProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered ThemeToggleComponent.
 */
const ThemeToggleComponent = ({ darkMode, toggleTheme }: ThemeToggleProps) => {
  const { withViewTransition } = useViewTransitions();
  const shouldReduceMotion = useReducedMotion();

  const handleClick = () => {
    withViewTransition(toggleTheme);
  };

  const iconVariants = {
    initial: { opacity: 1, rotate: -90, scale: 0.5 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    exit: { opacity: 1, rotate: 90, scale: 0.5 },
  };

  return (
    <button
      className="bg-surface/80 hover:bg-surface/90 relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-text-secondary ring-1 ring-white/5 backdrop-blur-xl transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-opacity-75"
      onClick={handleClick}
      type="button"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative">
        <AnimatePresence initial={false} mode="wait">
          {darkMode ? (
            <motion.div
              key="moon"
              variants={shouldReduceMotion ? undefined : iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: easeInOut }}
              style={{ viewTransitionName: 'theme-icon-moon' }}
            >
              <Moon className="h-8 w-8 text-accent" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              variants={shouldReduceMotion ? undefined : iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: easeInOut }}
              style={{ viewTransitionName: 'theme-icon-sun' }}
            >
              <Sun className="h-8 w-8 text-accent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
};

/**
 * Memoized ThemeToggle component for performance optimization.
 * This component allows users to switch between light and dark themes.
 * @see ThemeToggleComponent
 */
export const ThemeToggle = React.memo(ThemeToggleComponent);
