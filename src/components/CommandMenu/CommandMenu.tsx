import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence, LayoutGroup, easeIn, easeOut, easeInOut } from 'framer-motion';
// Clipboard handled via native API
import { Mail, Download, Eye, Code, Linkedin, Github, X, Check } from 'lucide-react';
import { useReducedMotion } from 'hooks/useReducedMotion';
import FocusTrap from 'focus-trap-react';
import { userData as contentUserData } from 'content/user';

/**
 * Props for the CommandMenu component.
 */
type CommandMenuProps = {
  /** Whether the command menu is currently open. */
  isOpen: boolean;
  /** Function to set the open state of the command menu. */
  setIsOpen: (open: boolean) => void;
};

/**
 * Represents an item within the command menu.
 */
type CommandItem = {
  /** Unique identifier for the command item. */
  id: string;
  /** Display name of the command. */
  name: string;
  /** Icon to display next to the command name. */
  icon: React.ReactNode;
  /** Keywords for searching the command. */
  keywords: string;
  /** Action to perform when the command is selected. */
  action: () => void;
};

/**
 * CommandMenuComponent provides a searchable palette of commands and actions.
 * It includes options for navigation, contact, and downloading resources.
 * The component is animated and designed to be accessible.
 * @param {CommandMenuProps} props - The properties passed to the component.
 * @returns {JSX.Element | null} The rendered CommandMenuComponent, or null if not open.
 */
const CommandMenuComponent = ({ isOpen, setIsOpen }: CommandMenuProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);
  const openedAtRef = useRef<number>(0);

  // Manage focus trap, Escape-to-close, and background scroll locking
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement;
    openedAtRef.current = Date.now();

    // Focus the dialog container for accessibility
    const focusTimer = window.setTimeout(() => {
      containerRef.current?.focus();
    }, 0);

    // Lock background scroll while menu is open by toggling a body class
    document.body.classList.add('modal-open');

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Desktop-only outside click close as a safety net
    const mql = window.matchMedia('(min-width: 768px)');
    const handleDocumentMouseDown = (e: MouseEvent) => {
      if (!mql.matches) return; // only desktop behavior
      const target = e.target as Node | null;
      if (!containerRef.current) return;
      if (target && containerRef.current.contains(target)) return;
      // Avoid closing from the same interaction that opened the modal
      if (Date.now() - openedAtRef.current < 200) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleDocumentMouseDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleDocumentMouseDown);
      document.body.classList.remove('modal-open');
      // Restore focus to the previously focused element
      if (previouslyFocusedRef.current instanceof HTMLElement) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [isOpen, setIsOpen]);

  const handleCopyEmail = useCallback(async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(contentUserData.email);
      setCopied(true);
    } catch (error) {
      console.error('Failed to copy email:', error);
    } finally {
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1500);
    }
  }, [setIsOpen]);

  const scrollToSection = useCallback(
    (id: string): void => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          setIsOpen(false);
        }, 180);
      }
    },
    [setIsOpen]
  );

  const handleDownloadResume = useCallback((): void => {
    try {
      const link = document.createElement('a');
      link.href = '/nathan_dryer_resume.pdf'; // Corrected path
      link.download = 'nathan_dryer_resume.pdf'; // Corrected filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        setIsOpen(false);
      }, 180);
    } catch (error) {
      console.error('Failed to download resume:', error);
      setTimeout(() => {
        setIsOpen(false);
      }, 180);
    }
  }, [setIsOpen]);

  const openLink = useCallback(
    (url: string): void => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setTimeout(() => {
        setIsOpen(false);
      }, 180);
    },
    [setIsOpen]
  );

  const commandGroups: {
    resume: CommandItem[];
    navigate: CommandItem[];
    contact: CommandItem[];
  } = {
    resume: [
      {
        id: 'resume',
        name: 'Download Resume',
        icon: <Download className='h-5 w-5' />,
        keywords: 'resume cv download pdf',
        action: handleDownloadResume,
      },
    ],
    navigate: [
      {
        id: 'experience',
        name: 'View Timeline',
        icon: <Eye className='h-5 w-5' />,
        keywords: 'experience timeline history career work jobs',
        action: () => scrollToSection('timeline'),
      },
      {
        id: 'skills',
        name: 'View Skills',
        icon: <Code className='h-5 w-5' />,
        keywords: 'skills expertise abilities technologies',
        action: () => scrollToSection('skills'),
      },
    ],
    contact: [
      {
        id: 'email',
        name: 'Copy Email',
        icon: <Mail className='h-5 w-5' />,
        keywords: 'contact mail reach',
        action: handleCopyEmail,
      },
      ...(() => {
        // Centralize external links from content
        try {
          const byName = Object.fromEntries(
            contentUserData.socialLinks.map((link) => [link.name.toLowerCase(), link.url])
          );
          return [
            {
              id: 'linkedin',
              name: 'LinkedIn Profile',
              icon: <Linkedin className='h-5 w-5' />,
              keywords: 'social network professional connect',
              action: () => openLink(byName['linkedin'] ?? 'https://linkedin.com'),
            },
            {
              id: 'github',
              name: 'GitHub Profile',
              icon: <Github className='h-5 w-5' />,
              keywords: 'code repository projects source',
              action: () => openLink(byName['github'] ?? 'https://github.com'),
            },
          ];
        } catch {
          return [] as any[];
        }
      })(),
    ],
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.2,
        ease: easeOut
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.15,
        ease: easeIn
      }
    }
  };

  const containerVariants = {
    hidden: {
      scale: shouldReduceMotion ? 1 : 0.95,
      opacity: 0,
      y: shouldReduceMotion ? 0 : -10,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.25,
        ease: easeOut,
        layout: {
          duration: shouldReduceMotion ? 0.01 : 0.3,
          ease: easeOut
        }
      }
    },
    exit: {
      scale: shouldReduceMotion ? 1 : 0.95,
      opacity: 0,
      y: shouldReduceMotion ? 0 : -10,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.2,
        ease: easeOut,
        layout: {
          duration: shouldReduceMotion ? 0.01 : 0.2,
          ease: easeIn
        }
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <LayoutGroup id="command-menu">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='bg-bg-primary/60 dark:bg-bg-primary/50 fixed inset-0 z-50 flex items-end backdrop-blur-3xl md:items-start md:justify-center md:p-4 md:pt-[15vh]'
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => {
              // Avoid immediately closing from the same click that opened the modal
              if (Date.now() - openedAtRef.current < 200) return;
              setIsOpen(false);
            }}
            role='dialog'
            aria-modal='true'
            aria-labelledby='command-menu-title'
            aria-describedby='command-menu-description'
          >
            <FocusTrap
              focusTrapOptions={{
                initialFocus: () => containerRef.current as HTMLElement | undefined,
                escapeDeactivates: true,
                // We close on backdrop mouse down instead to avoid click-through on open
              }}
            >
              <motion.div
                ref={containerRef}
                className='border-text-secondary/10 bg-surface/50 dark:bg-surface/40 glass-surface relative h-full w-full overflow-y-auto border-t shadow-lg md:h-auto md:max-h-[80vh] md:max-w-lg md:rounded-lg md:border lg:max-w-xl xl:max-w-2xl'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout={!shouldReduceMotion}
                onClick={e => e.stopPropagation()}
                tabIndex={-1}
              >
                <h2 id='command-menu-title' className='sr-only'>Command Menu</h2>
                <div className='absolute right-0 top-0 p-2'>
                  <motion.button
                    className='hover:bg-text-secondary/10 rounded-full p-2 text-text-secondary'
                    onClick={() => setIsOpen(false)}
                    aria-label='Close command menu'
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9, rotate: 0 }}
                  >
                    <X className='lucide h-5 w-5' />
                  </motion.button>
                </div>
                <Command className='w-full' role='menu' aria-labelledby='command-menu-title'>
                  <p id='command-menu-description' className='sr-only'>
                    Choose an action to perform. Use arrow keys to navigate, Enter to select, or Escape to close.
                  </p>

                  {copied && (
                    <div className='border-accent/20 bg-accent/10 border-b px-4 py-3'>
                      <div className='flex items-center text-accent'>
                        <Check className='mr-2 h-4 w-4' />
                        <p className='text-sm font-medium'>
                          Email copied to clipboard
                        </p>
                      </div>
                    </div>
                  )}

                  <motion.div
                    layout={!shouldReduceMotion}
                  >
                    <Command.List className='p-[var(--space-2)]'>
                      {Object.entries(commandGroups).map(([groupName, commands], index) => (
                        <Command.Group
                          key={groupName}
                          className={`pt-2 ${index > 0 ? 'border-text-primary/10 mt-2 border-t' : ''}`}
                          heading={<span className='px-[var(--space-2)] pb-[var(--space-3)] text-sm font-semibold uppercase tracking-wider text-text-secondary'>{groupName}</span>}
                        >
                          {commands.map((command) => (
                            <Command.Item
                              key={command.id}
                              onSelect={command.action}
                              className='mt-1 flex w-full cursor-pointer items-center justify-between rounded-md p-[var(--space-2)] text-sm text-text-primary hover:bg-accent hover:text-on-accent'
                            >
                              <div className='flex items-center gap-[var(--space-2)]'>
                                {command.icon}
                                <span>{command.name}</span>
                              </div>
                            </Command.Item>
                          ))}
                        </Command.Group>
                      ))}
                    </Command.List>
                  </motion.div>
                </Command>
              </motion.div>
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};

/**
 * Memoized CommandMenu component.
 * @see CommandMenuComponent
 */
export const CommandMenu = React.memo(CommandMenuComponent); 