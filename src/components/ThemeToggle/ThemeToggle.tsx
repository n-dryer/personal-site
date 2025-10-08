import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
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

  const iconVariants = shouldReduceMotion
    ? undefined
    : {
        initial: { opacity: 1, rotate: -45, scale: 0 },
        animate: { opacity: 1, rotate: 0, scale: 1 },
        exit: { opacity: 1, rotate: 45, scale: 0 },
      };

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className="relative flex h-14 w-14 items-center justify-center border-0 text-resume-text-secondary transition-colors duration-200 hover:text-resume-accent"
      onClick={handleClick}
      type="button"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={darkMode}
    >
      <div className="relative h-8 w-8">
        <AnimatePresence initial={false} mode="wait">
          {darkMode ? (
            <m.div
              key="moon"
              className="absolute inset-0 flex items-center justify-center"
              variants={iconVariants}
              initial={shouldReduceMotion ? undefined : 'initial'}
              animate={shouldReduceMotion ? undefined : 'animate'}
              exit={shouldReduceMotion ? undefined : 'exit'}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Moon className="h-8 w-8 text-resume-accent" />
            </m.div>
          ) : (
            <m.div
              key="sun"
              className="absolute inset-0 flex items-center justify-center"
              variants={iconVariants}
              initial={shouldReduceMotion ? undefined : 'initial'}
              animate={shouldReduceMotion ? undefined : 'animate'}
              exit={shouldReduceMotion ? undefined : 'exit'}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                viewTransitionName: 'theme-icon-sun',
                opacity: shouldReduceMotion ? 1 : undefined,
                transform: shouldReduceMotion ? 'rotate(0deg) scale(1)' : undefined,
              }}
            >
              <Sun className="h-8 w-8 text-resume-accent" />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </Button>
  );
};

/**
 * Memoized ThemeToggle component for performance optimization.
 * This component allows users to switch between light and dark themes.
 * @see ThemeToggleComponent
 */
export const ThemeToggle = React.memo(ThemeToggleComponent);
