import { AnimatePresence, Variants, easeIn, easeInOut, easeOut, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { Command } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Props for the FloatingCommandButton component.
 */
type FloatingCommandButtonProps = {
  /** Function to toggle the visibility of the command menu. */
  toggleCommandMenu: () => void;
};

// Available commands for preview animation
const availableCommands = [
  'View Timeline',
  'View Skills',
  'Download Resume',
  'Copy Email',
  'LinkedIn Profile',
  'GitHub Profile',
];

/**
 * FloatingCommandButtonComponent displays a button that opens the command menu.
 * It features an animated appearance, a subtle pulse animation, and a tooltip
 * that shows available commands and the keyboard shortcut (Cmd+K or Ctrl+K).
 * This component is memoized for performance, as its re-render depends on the `toggleCommandMenu` prop,
 * which should be memoized by the parent.
 *
 * @param {FloatingCommandButtonProps} props - The properties passed to the component.
 * @returns {React.ReactElement | null} The rendered FloatingCommandButton, or null if not visible.
 * @see React.memo
 */
const FloatingCommandButtonComponent = ({
  toggleCommandMenu,
}: FloatingCommandButtonProps): React.ReactElement | null => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [isMac, setIsMac] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animationPhase, setAnimationPhase] = useState<'hidden' | 'visible' | 'pulse'>('hidden');
  const [currentCommandIndex, setCurrentCommandIndex] = useState<number>(0);
  const [tooltipTimer, setTooltipTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Use the existing useReducedMotion hook
  const prefersReducedMotion = useReducedMotion();

  // Detect OS for keyboard shortcut display
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  // Synchronized delayed appearance with scroll button
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsVisible(true);
      setAnimationPhase('visible');

      // Start pulse after fade-in completes (0.75s delay + 1s fade-in = 1.75s total)
      setTimeout(() => {
        setAnimationPhase('pulse');
      }, 1000); // Start pulse after fade-in completes
    }, 750); // 0.75 second delay - synchronized with scroll button

    return () => clearTimeout(delayTimer);
  }, []);

  // Cycle through available commands for preview
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      return; // Don't cycle if not visible or reduced motion is preferred
    }

    const cycleInterval = setInterval(() => {
      setCurrentCommandIndex((prev) => (prev + 1) % availableCommands.length);
    }, 1500); // Change every 1.5 seconds (faster rotation)

    return () => clearInterval(cycleInterval);
  }, [isVisible, prefersReducedMotion]);

  // Enhanced tooltip handlers with 250ms delay
  const handleMouseEnter = (): void => {
    // Clear any existing timer
    if (tooltipTimer) {
      clearTimeout(tooltipTimer);
    }

    // Set new timer for 250ms delay (quicker display)
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 250);

    setTooltipTimer(timer);
  };

  // Handle mouse leave with immediate hide
  const handleMouseLeave = (): void => {
    // Clear any pending timer
    if (tooltipTimer) {
      clearTimeout(tooltipTimer);
      setTooltipTimer(null);
    }

    // Immediately hide tooltip
    setShowTooltip(false);
  };

  // Cleanup tooltip timer on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimer) {
        clearTimeout(tooltipTimer);
      }
    };
  }, [tooltipTimer]);

  const buttonVariants: Variants = {
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        opacity: { duration: 1.0, ease: easeOut }, // 1s fade-in
        scale: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
          duration: 0.5,
        },
        y: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
          duration: 1.0, // 1s slide-up
        },
      },
    },
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 16, // Synchronized initial position (translate-y-4 = 16px)
      transition: {
        duration: 0.2,
        ease: easeIn,
      },
    },
    pulse: {
      scale: [1, 1.02, 1], // Using --token-scale-pulse-min (1) and --token-scale-pulse-max (1.02)
      transition: {
        duration: 3.0, // Using --duration-pulse (3s)
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: easeInOut,
      },
    },
    hover: {
      scale: [1.05, 1.02, 1.05],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: easeInOut,
      },
    },
    tap: {
      scale: 0.95, // From --token-scale-tap
      transition: { duration: 0.15 }, // 150ms from --duration-fast
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={buttonVariants}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-surface absolute bottom-full right-0 mb-4 whitespace-nowrap rounded-lg px-4 py-2 text-sm text-text-primary shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="relative overflow-hidden font-medium"
                    style={{ minWidth: '140px', height: '1.2em' }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentCommandIndex}
                        initial={{
                          y: prefersReducedMotion ? 0 : 20,
                          opacity: 0,
                          rotateX: prefersReducedMotion ? 0 : -90,
                        }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          rotateX: 0,
                          transition: {
                            duration: prefersReducedMotion ? 0.01 : 0.4,
                            ease: easeOut, // Spring easing from design tokens
                          },
                        }}
                        exit={{
                          y: prefersReducedMotion ? 0 : -20,
                          opacity: 0,
                          rotateX: prefersReducedMotion ? 0 : 90,
                          transition: {
                            duration: prefersReducedMotion ? 0.01 : 0.3,
                            ease: easeIn,
                          },
                        }}
                        className="absolute inset-0 flex items-center"
                        style={{
                          transformStyle: prefersReducedMotion ? 'flat' : 'preserve-3d',
                          perspective: prefersReducedMotion ? 'none' : '1000px',
                        }}
                      >
                        {availableCommands[currentCommandIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="text-text-primary/70 text-xs">{isMac ? '⌘K' : 'Ctrl+K'}</span>
                </div>
                <div
                  className="absolute bottom-0 right-4 h-2 w-2 translate-y-1/2 rotate-45 transform"
                  style={{
                    background: 'var(--token-bg-frosted)',
                    border: '1px solid color-mix(in srgb, var(--text-primary) 10%, transparent)',
                    borderTop: 'none',
                    borderLeft: 'none',
                  }}
                ></div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={toggleCommandMenu}
            className="focus-visible:ring-accent/40 flex items-center justify-center rounded-full bg-accent text-on-accent shadow-lg focus:outline-none focus-visible:ring-2"
            style={{
              width: 'clamp(2.75rem, 4vw, 3.5rem)',
              height: 'clamp(2.75rem, 4vw, 3.5rem)',
            }}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            animate={prefersReducedMotion ? undefined : animationPhase} // Controlled animation phases
            aria-label="Open Command Menu"
            aria-keyshortcuts={isMac ? '⌘+K' : 'Ctrl+K'}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCommandMenu();
              }
            }}
          >
            <Command
              style={{
                width: 'clamp(1rem, 2.5vw, 1.5rem)',
                height: 'clamp(1rem, 2.5vw, 1.5rem)',
                color: 'currentColor',
              }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Memoized FloatingCommandButton component.
 * @see FloatingCommandButtonComponent
 */
export const FloatingCommandButton = React.memo(FloatingCommandButtonComponent);
