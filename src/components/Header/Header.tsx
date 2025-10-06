import { easeInOut, easeOut, motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';

import { Command } from 'lucide-react';
import { ThemeToggle } from '..';
import { Button } from '@/components/ui/button';
import { UserData } from '../../types';

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
  const MotionButton = motion(Button);
  const [isMac, setIsMac] = useState<boolean>(false);

  // Detect OS for keyboard shortcut display
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);


  return (
    <header id="top" className="relative section-spacing-top">
      <motion.div
        className="absolute z-20 right-4 top-4 sm:right-6 sm:top-6"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      </motion.div>

      <div className="container-padding-x relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl flex-col items-center text-center">
        <section className="flex flex-col items-center w-full text-center hero-spacing">
          {userData.photoUrl ? (
            <motion.div
              className="relative overflow-hidden border-4 rounded-full shadow-2xl hero-image-margin ring-resume-ring/60 h-36 w-36 border-resume-card-border bg-resume-card ring-4 sm:h-44 sm:w-44 md:h-52 md:w-52"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeInOut }}
            >
              <img
                src={userData.photoUrl}
                alt={userData.fullName}
                className="object-cover w-full h-full"
                fetchpriority="high"
              />
            </motion.div>
          ) : null}

          <motion.h1
            className="hero-title-margin whitespace-nowrap font-instrument text-[clamp(2.4rem,8vw,5.5rem)] font-normal leading-tight tracking-tight text-resume-text-primary"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
          >
            {userData.fullName}
          </motion.h1>

          <motion.p
            className="whitespace-nowrap text-[clamp(0.75rem,4vw,2.4rem)] font-light leading-tight tracking-tight text-resume-accent-light md:text-[clamp(1.25rem,3vw,2.6rem)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
          >
            {userData.bioLine}
          </motion.p>
        </section>

        <motion.div
          className="relative w-full max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
        >
          <MotionButton
            className="flex items-center justify-between w-full px-5 py-3 text-left transition-all duration-300 border rounded-full shadow-2xl bg-resume-card/90 hover:border-resume-accent/40 group border-resume-card-border text-resume-text-secondary backdrop-blur-xl hover:bg-resume-card"
            variant="ghost"
            onClick={toggleCommandMenu}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98, y: 0 }}
            aria-label="Open command palette"
            aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
            type="button"
          >
            <div className="flex items-center flex-1 gap-3">
              <span className="inline-flex items-center justify-center rounded-full bg-resume-accent/15 h-9 w-9 text-resume-accent">
                <Command size={18} />
              </span>
              <div className="relative flex justify-start flex-1">
                <div className="flex items-center w-full gap-2 px-3 py-1 font-semibold tracking-tight text-left rounded-full from-resume-accent/10 via-resume-accent/20 to-resume-accent/10 bg-gradient-to-r text-resume-text-primary">
                  <span className="text-resume-text-muted">Tap to </span>
                  <span className="font-semibold text-resume-accent">explore</span>
                </div>
              </div>
            </div>
            <span className="items-center hidden px-3 py-1 text-xs border rounded-full border-resume-card-border/60 bg-resume-overlay/40 text-resume-text-muted md:flex">
              {isMac ? '⌘ K' : 'Ctrl K'}
            </span>
          </MotionButton>
        </motion.div>
      </div>
    </header>
  );
};

/**
 * Memoized Header component.
 * @see HeaderComponent
 */
export const Header = React.memo(HeaderComponent);
