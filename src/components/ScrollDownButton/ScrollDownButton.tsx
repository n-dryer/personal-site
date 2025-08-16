import React, { useCallback, useEffect, useState } from 'react';
import { Variants, easeInOut, easeOut, motion } from 'framer-motion';

import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from 'hooks/useReducedMotion';

/**
 * ScrollDownButtonComponent displays a button that scrolls the user to the timeline section.
 * It appears with an animation and has a continuous subtle animation to draw attention.
 * The button hides itself once scrolled or if the user scrolls close to the bottom of the page.
 * This component is memoized for performance optimization, although it takes no props,
 * its internal logic and effects are considered non-trivial.
 *
 * @returns {React.ReactElement | null} The rendered ScrollDownButton, or null if not visible.
 * @see React.memo
 */
const ScrollDownButtonComponent = (): React.ReactElement | null => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState<'pulse' | 'bounce'>('pulse');

  const handleHideAndRemoveListener = useCallback(() => {
    setIsVisible(false);
    window.removeEventListener('scroll', handleHideAndRemoveListener);
  }, []);

  useEffect(() => {
    // Add the event listener when the component mounts
    window.addEventListener('scroll', handleHideAndRemoveListener);

    // Return a cleanup function to remove the event listener when the component unmounts
    // or if handleHideAndRemoveListener removes itself.
    return () => {
      window.removeEventListener('scroll', handleHideAndRemoveListener);
    };
  }, [handleHideAndRemoveListener]);

  const handleScrollToTimeline = useCallback((): void => {
    handleHideAndRemoveListener(); // Hide button on click and remove listener
    const timelineElement =
      document.getElementById('timeline') ||
      document.querySelector('[data-section="timeline"]') ||
      document.querySelector('main');

    if (timelineElement) {
      timelineElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [handleHideAndRemoveListener]);

  const buttonVariants: Variants = {
    bounce: {
      y: [0, -1.5, 0], // More visible bounce animation
      transition: {
        duration: 2.0, // 2s bounce duration
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: easeInOut,
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
      scale: 1.05,
      y: -1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.95,
      y: 0,
      transition: { duration: 0.15 },
    },
  };

  const prefersReducedMotion = useReducedMotion();

  // Switch to bounce after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase('bounce');
    }, 1750);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2 transform"
      initial={{ opacity: 0, scale: 0.4, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        opacity: { duration: 1.0, ease: easeOut },
        scale: { type: 'spring', stiffness: 300, damping: 20, duration: 0.5 },
        y: { type: 'spring', stiffness: 300, damping: 20, duration: 1.0 },
      }}
    >
      <motion.button
        className="focus-visible:ring-accent/40 flex items-center justify-center rounded-full bg-accent text-on-accent shadow-lg focus:outline-none focus-visible:ring-2"
        style={{
          width: 'clamp(2.75rem, 4vw, 3.5rem)',
          height: 'clamp(2.75rem, 4vw, 3.5rem)',
        }}
        onClick={handleScrollToTimeline}
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        animate={prefersReducedMotion ? undefined : animationPhase}
        aria-label="Scroll to timeline section"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleScrollToTimeline();
          }
        }}
      >
        <ChevronDown
          style={{
            width: 'clamp(1rem, 2.5vw, 1.5rem)',
            height: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: 'var(--on-accent)',
          }}
        />
      </motion.button>
    </motion.div>
  );
};

/**
 * Memoized ScrollDownButton component.
 * @see ScrollDownButtonComponent
 */
export const ScrollDownButton = React.memo(ScrollDownButtonComponent);
