import React, { useCallback, useMemo, useState } from 'react';
import { m } from 'framer-motion';
import { Briefcase, Check, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserData } from '../../types';

/**
 * Props for the Footer component.
 */
type FooterProps = {
  /** User data object containing information like full name and social links. */
  userData: UserData;
};

/**
 * FooterComponent displays copyright information and social media links.
 * It is designed to be placed at the bottom of the application.
 *
 * @param {FooterProps} props - The properties passed to the component.
 * @param {UserData} props.userData - The user data to display in the footer.
 * @returns {React.ReactElement} The rendered footer element.
 */
const defaultUserData: UserData = {
  fullName: 'User',
  bioLine: '',
  photoUrl: '',
  email: 'user@example.com',
  phone: '',
  location: '',
  socialLinks: [],
  resumeUrl: '',
};

const FooterComponent = ({ userData = defaultUserData }: FooterProps): React.ReactElement => {
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const socialLinks = useMemo(() => {
    const byName = Object.fromEntries(
      userData.socialLinks.map((link) => [link.name.toLowerCase(), link]),
    );

    const linkedIn = byName['linkedin'] ?? null;
    const github = byName['github'] ?? null;

    return { linkedIn, github };
  }, [userData.socialLinks]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(userData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy email', error);
    }
  }, [userData.email]);

  const scrollToHighlights = useCallback(() => {
    const target =
      document.getElementById('product-highlights') ?? document.getElementById('timeline');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <footer id="end" className="relative pb-8 pt-24 text-resume-text-muted">
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden" aria-label="Primary">
        <div className="menu-padding bg-resume-card/95 border-t border-resume-card-border shadow-2xl backdrop-blur-xl">
          <div className="menu-gap flex items-center justify-center">
            <Button
              asChild
              variant="ghost"
              size="icon-lg"
              className="button-gap flex min-h-[56px] min-w-[56px] flex-col items-center rounded-xl px-3 py-2.5 text-resume-text-muted hover:text-resume-accent md:min-h-[64px] md:min-w-[72px] md:rounded-2xl md:px-4 md:py-3"
            >
              <m.a
                href={userData.resumeUrl || '#'}
                target={userData.resumeUrl ? '_blank' : undefined}
                rel={userData.resumeUrl ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Download resume"
              >
                <FileText className="h-8 w-8" />
                <span className="text-[10px] font-medium md:text-xs">Resume</span>
              </m.a>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="icon-lg"
              className="button-gap flex min-h-[56px] min-w-[56px] flex-col items-center rounded-xl px-3 py-2.5 text-resume-text-muted hover:text-resume-accent md:min-h-[64px] md:min-w-[72px] md:rounded-2xl md:px-4 md:py-3"
            >
              <m.button
                type="button"
                onClick={scrollToHighlights}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                aria-label="View product highlights"
              >
                <Briefcase className="h-8 w-8" />
                <span className="text-[10px] font-medium md:text-xs">Projects</span>
              </m.button>
            </Button>

            <Button
              asChild
              variant={copied ? 'secondary' : 'ghost'}
              size="icon-lg"
              className={`button-gap flex min-h-[56px] min-w-[56px] flex-col items-center rounded-xl px-3 py-2.5 md:min-h-[64px] md:min-w-[72px] md:rounded-2xl md:px-4 md:py-3 ${
                copied
                  ? 'bg-resume-accent/20 text-resume-accent hover:text-resume-accent'
                  : 'text-resume-text-muted hover:text-resume-accent'
              }`}
            >
              <m.button
                type="button"
                onClick={handleCopyEmail}
                whileHover={{ y: copied ? 0 : -2 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Copy email address"
              >
                {copied ? <Check className="h-8 w-8" /> : <Mail className="h-8 w-8" />}
                <span className="text-[10px] font-medium md:text-xs">
                  {copied ? 'Copied!' : 'Contact'}
                </span>
              </m.button>
            </Button>

            {socialLinks.linkedIn ? (
              <Button
                asChild
                variant="ghost"
                size="icon-lg"
                className="button-gap flex min-h-[56px] min-w-[56px] flex-col items-center rounded-xl px-3 py-2.5 text-resume-text-muted hover:text-resume-accent md:min-h-[64px] md:min-w-[72px] md:rounded-2xl md:px-4 md:py-3"
              >
                <m.a
                  href={socialLinks.linkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-8 w-8" />
                  <span className="text-[10px] font-medium md:text-xs">LinkedIn</span>
                </m.a>
              </Button>
            ) : null}

            {socialLinks.github ? (
              <Button
                asChild
                variant="ghost"
                size="icon-lg"
                className="button-gap flex min-h-[56px] min-w-[56px] flex-col items-center rounded-xl px-3 py-2.5 text-resume-text-muted hover:text-resume-accent md:min-h-[64px] md:min-w-[72px] md:rounded-2xl md:px-4 md:py-3"
              >
                <m.a
                  href={socialLinks.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="GitHub profile"
                >
                  <Github className="h-8 w-8" />
                  <span className="text-[10px] font-medium md:text-xs">GitHub</span>
                </m.a>
              </Button>
            ) : null}
          </div>
        </div>
      </nav>

      <div className="h-24 md:h-32" />

      <div className="container-padding-x mx-auto max-w-5xl text-center">
        <p className="text-sm text-resume-text-subtle">
          © {currentYear} {userData.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

/**
 * Memoized Footer component.
 * @see FooterComponent
 */
export const Footer = React.memo(FooterComponent);
