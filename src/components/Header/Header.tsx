import { AnimatePresence, easeInOut, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { Command } from 'lucide-react';
import { ThemeToggle } from '..';
import { UserData } from '../../types';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Props for the Header component.
 */
type HeaderProps = {
  /** User data object containing full name and bioline. */
  userData: UserData;
  /** Function to toggle the visibility of the command menu. */
  toggleCommandMenu: () => void;
  /** Boolean indicating if dark mode is currently active. */
  darkMode: boolean;
  /** Function to toggle the application theme (light/dark). */
  toggleTheme: () => void;
};

// Available commands for preview animation
const availableCommands = [
  'view timeline',
  'view skills',
  'download resume',
  'copy email',
  'go to LinkedIn Profile',
  'go to GitHub Profile',
];

/**
 * HeaderComponent is the main hero section of the portfolio.
 * It displays the user's name, bioline, a command prompt-style interface
 * for navigation/actions, and a theme toggle button.
 * It features animations for text and elements, and respects reduced motion preferences.
 *
 * @param {HeaderProps} props - The properties passed to the component.
 * @returns {React.ReactElement} The rendered header element.
 */
const HeaderComponent = ({
  userData,
  toggleCommandMenu,
  darkMode,
  toggleTheme,
}: HeaderProps): React.ReactElement => {
  const [isMac, setIsMac] = useState<boolean>(false);
  const [currentCommandIndex, setCurrentCommandIndex] = useState<number>(0);

  // Use the existing useReducedMotion hook
  const prefersReducedMotion = useReducedMotion();

  // Detect OS for keyboard shortcut display
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  // Cycle through available commands for preview
  useEffect(() => {
    if (prefersReducedMotion) {
      return; // Don't cycle if reduced motion is preferred
    }

    const cycleInterval = setInterval(() => {
      setCurrentCommandIndex((prev) => (prev + 1) % availableCommands.length);
    }, 1800); // Change every 1.8 seconds (faster speed)

    return () => clearInterval(cycleInterval);
  }, [prefersReducedMotion]);

  return (
    <header
      className="relative flex min-h-screen items-center justify-center pb-20 pt-[var(--space-section)] text-text-primary md:pb-32"
      id="top"
    >
      {/* Theme Toggle - Positioned in top-right corner */}
      <motion.div
        className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 py-8">
        <div className="flex h-full flex-col items-center justify-center text-center">
          {/* Name and Subtitle - Above Command Prompt */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.h1
              className="mb-2 font-display text-[clamp(2.75rem,9vw,5rem)] font-extrabold tracking-tight text-text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {userData.fullName}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-[clamp(1rem,2.2vw,2rem)] font-medium text-accent md:whitespace-nowrap md:text-[clamp(1.25rem,2.6vw,2.25rem)]">
                {userData.bioLine}
              </p>
            </motion.div>
          </motion.div>

          {/* Command Prompt Container */}
          <div className="w-full max-w-md">
            {/* Modern Pill-Shaped Command Prompt Field */}
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                className="flex cursor-pointer items-center rounded-full bg-accent px-4 py-3 text-on-accent shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-opacity-75"
                onClick={toggleCommandMenu}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
                aria-label="Open command palette"
                aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
              >
                <Command size={18} className="mr-3" style={{ color: 'currentColor' }} />
                <div
                  className="relative flex-1 overflow-hidden text-left"
                  style={{ minHeight: '1.2em' }}
                >
                  <span>Click to </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentCommandIndex}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.3, ease: easeInOut }}
                      className="inline-block"
                    >
                      {availableCommands[currentCommandIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="hidden items-center justify-center rounded bg-black/20 px-2 py-1 text-xs md:flex">
                  {`Search (${isMac ? '⌘K' : 'Ctrl+K'})`}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

/**
 * Memoized Header component.
 * @see HeaderComponent
 */
export const Header = React.memo(HeaderComponent);
