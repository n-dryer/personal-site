import { easeInOut, easeOut, m } from 'framer-motion';
import React, { useEffect, useState } from 'react';

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
  const [isMac, setIsMac] = useState<boolean>(false);

  // Detect OS for keyboard shortcut display
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  return (
    <header id="top" className="section-spacing-top relative">
      <m.div
        className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      </m.div>

      <div className="container-padding-x relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl flex-col items-center text-center">
        <section className="hero-spacing flex w-full flex-col items-center text-center">
          {userData.photoUrl ? (
            <m.div
              className="hero-image-margin ring-resume-ring/60 relative h-36 w-36 overflow-hidden rounded-full border-4 border-resume-card-border bg-resume-card shadow-2xl ring-4 sm:h-44 sm:w-44 md:h-52 md:w-52"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeInOut }}
            >
              <img
                src={userData.photoUrl}
                alt={userData.fullName}
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </m.div>
          ) : null}

          <m.h1
            className="hero-title-margin whitespace-nowrap font-instrument text-[clamp(2.4rem,8vw,5.5rem)] font-normal leading-tight tracking-tight text-resume-text-primary"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
          >
            {userData.fullName}
          </m.h1>

          <m.p
            className="whitespace-nowrap text-[clamp(0.75rem,4vw,2.4rem)] font-light leading-tight tracking-tight text-resume-accent-light md:text-[clamp(1.25rem,3vw,2.6rem)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
          >
            {userData.bioLine}
          </m.p>
        </section>

        <m.div
          className="relative w-full max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
        >
          <Button
            asChild
            className="bg-resume-card/90 hover:border-resume-accent/40 group flex w-full items-center justify-between rounded-full border border-resume-card-border px-5 py-3 text-left text-resume-text-secondary shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-resume-card"
            variant="ghost"
            onClick={toggleCommandMenu}
            aria-label="Open command palette"
            aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
            type="button"
          >
            <m.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98, y: 0 }}>
              <div className="flex flex-1 items-center gap-3">
                <span className="bg-resume-accent/15 inline-flex h-9 w-9 items-center justify-center rounded-full text-resume-accent">
                  <Command size={18} />
                </span>
                <div className="relative flex flex-1 justify-start">
                  <div className="from-resume-accent/10 via-resume-accent/20 to-resume-accent/10 flex w-full items-center gap-2 rounded-full bg-gradient-to-r px-3 py-1 text-left font-semibold tracking-tight text-resume-text-primary">
                    <span className="text-resume-text-muted">Tap to </span>
                    <span className="font-semibold text-resume-accent">explore</span>
                  </div>
                </div>
              </div>
              <span className="border-resume-card-border/60 bg-resume-overlay/40 hidden items-center rounded-full border px-3 py-1 text-xs text-resume-text-muted md:flex">
                {isMac ? '⌘ K' : 'Ctrl K'}
              </span>
            </m.div>
          </Button>
        </m.div>
      </div>
    </header>
  );
};

/**
 * Memoized Header component.
 * @see HeaderComponent
 */
export const Header = React.memo(HeaderComponent);
