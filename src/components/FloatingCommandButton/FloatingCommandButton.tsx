import { AnimatePresence, Variants, easeIn, easeInOut, easeOut, motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';

import { Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  isCommandMenuOpen,
}: FloatingCommandButtonProps): React.ReactElement | null => {
  const [isMac, setIsMac] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animationPhase, setAnimationPhase] = useState<'hidden' | 'visible' | 'pulse'>('hidden');

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

  const iconVariants: Variants = {
    open: {
      rotate: 90,
      scale: 1.08,
      transition: {
        type: 'spring',
        stiffness: 520,
        damping: 32,
      },
    },
    closed: {
      rotate: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 520,
        damping: 34,
      },
    },
  };

  const MotionButton = motion(Button);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={buttonVariants}
        >
          <TooltipProvider delayDuration={prefersReducedMotion ? 0 : 250} disableHoverableContent>
            <Tooltip>
              <TooltipTrigger asChild>
                <MotionButton
                  variant="default"
                  size="icon-lg"
                  className="flex items-center justify-center rounded-full bg-resume-accent text-resume-text-primary shadow-2xl"
                  style={{
                    width: 'clamp(2.75rem, 4vw, 3.5rem)',
                    height: 'clamp(2.75rem, 4vw, 3.5rem)',
                  }}
                  onClick={toggleCommandMenu}
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                  animate={prefersReducedMotion ? undefined : animationPhase}
                  aria-label="Open Command Menu"
                  aria-keyshortcuts={isMac ? '⌘+K' : 'Ctrl+K'}
                  type="button"
                >
                  <motion.div
                    variants={iconVariants}
                    animate={isCommandMenuOpen ? 'open' : 'closed'}
                    className="flex"
                  >
                    <Command
                      style={{
                        width: 'clamp(1rem, 2.5vw, 1.5rem)',
                        height: 'clamp(1rem, 2.5vw, 1.5rem)',
                        color: 'currentColor',
                      }}
                    />
                  </motion.div>
                </MotionButton>
              </TooltipTrigger>
              <TooltipContent side="top" align="end" className="flex items-center gap-3">
                <div className="font-medium text-resume-text-primary">
                  Open Command Menu
                </div>
                <span className="text-xs text-resume-text-muted">{isMac ? '⌘K' : 'Ctrl+K'}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
