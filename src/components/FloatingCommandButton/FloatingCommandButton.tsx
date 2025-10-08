import { AnimatePresence, Variants, easeIn, easeInOut, easeOut, m } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { Command } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Props for the FloatingCommandButton component.
 */
type FloatingCommandButtonProps = {
  /** Function to toggle the visibility of the command menu. */
  toggleCommandMenu: () => void;
  /** Whether the command menu is currently open. */
  isCommandMenuOpen: boolean;
};

/**
 * FloatingCommandButtonComponent displays a floating button that opens the command menu.
 * Features:
 * - Delayed appearance synchronized with scroll button (750ms)
 * - Smooth fade-in and slide-up animation
 * - Pulse animation after appearing
 * - Respects reduced motion preferences
 * - Platform-aware keyboard shortcuts (Cmd+K on Mac, Ctrl+K elsewhere)
 *
 * @param {FloatingCommandButtonProps} props - The properties passed to the component.
 * @returns {React.ReactElement | null} The rendered FloatingCommandButton, or null if not visible.
 */
const FloatingCommandButtonComponent = ({
  toggleCommandMenu,
  isCommandMenuOpen,
}: FloatingCommandButtonProps): React.ReactElement | null => {
  const prefersReducedMotion = useReducedMotion();
  const [isMac, setIsMac] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animationPhase, setAnimationPhase] = useState<'hidden' | 'visible' | 'pulse'>('hidden');

  // Detect OS for keyboard shortcut display
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  // Synchronized delayed appearance with scroll button
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsVisible(true);
      setAnimationPhase('visible');

      // Start pulse after fade-in completes (750ms delay + 1s fade-in = 1.75s total)
      if (!prefersReducedMotion) {
        setTimeout(() => {
          setAnimationPhase('pulse');
        }, 1000);
      }
    }, 750); // 0.75 second delay - synchronized with scroll button

    return () => clearTimeout(delayTimer);
  }, [prefersReducedMotion]);

  const buttonVariants: Variants = {
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        opacity: { duration: 1.0, ease: easeOut },
        scale: {
          type: 'spring',
          stiffness: 200,
          damping: 15,
          duration: 0.5,
        },
        y: {
          type: 'spring',
          stiffness: 200,
          damping: 15,
          duration: 1.0,
        },
      },
    },
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 16,
      transition: {
        duration: 0.2,
        ease: easeIn,
      },
    },
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 3.0,
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
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };

  const iconVariants: Variants = {
    open: {
      rotate: 90,
      scale: 1.08,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
    closed: {
      rotate: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          className="fixed z-40 bottom-6 right-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={buttonVariants}
        >
          <TooltipProvider delayDuration={prefersReducedMotion ? 0 : 250} disableHoverableContent>
            <Tooltip>
              <TooltipTrigger asChild>
                <m.button
                  onClick={toggleCommandMenu}
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                  animate={prefersReducedMotion ? undefined : animationPhase}
                  style={{
                    width: 'clamp(2.75rem, 4vw, 3.5rem)',
                    height: 'clamp(2.75rem, 4vw, 3.5rem)',
                    willChange: 'transform',
                  }}
                  aria-label="Open Command Menu"
                  aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
                  type="button"
                  className="bg-resume-card/95 flex cursor-pointer items-center justify-center rounded-full border border-resume-card-border text-resume-accent shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(100,149,237,0.1)_inset] backdrop-blur-xl hover:bg-resume-card hover:shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(100,149,237,0.2),0_0_0_1px_rgba(100,149,237,0.2)_inset]"
                >
                  <m.div
                    variants={iconVariants}
                    animate={isCommandMenuOpen ? 'open' : 'closed'}
                    className="flex"
                  >
                    <Command
                      style={{
                        width: 'clamp(1.375rem, 3vw, 1.875rem)',
                        height: 'clamp(1.375rem, 3vw, 1.875rem)',
                        color: 'currentColor',
                      }}
                    />
                  </m.div>
                </m.button>
              </TooltipTrigger>
              <TooltipContent side="top" align="end" className="flex items-center gap-3">
                <div className="font-medium text-resume-text-primary">Open Command Menu</div>
                <span className="text-xs text-resume-text-muted">{isMac ? '⌘K' : 'Ctrl+K'}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </m.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Memoized FloatingCommandButton component.
 * @see FloatingCommandButtonComponent
 */
export const FloatingCommandButton = React.memo(FloatingCommandButtonComponent);
