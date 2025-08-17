import { LucideIcon } from 'lucide-react';

/**
 * Portfolio Type Definitions
 * Single source of truth for all data models used in the portfolio application
 */

export type Project = {
  name: string;
  description: string;
};

export type Experience = {
  id: string;
  /** Optional slug for deep linking; generated from start year and company if absent */
  slug?: string;
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  icon: LucideIcon;
  achievements: string[];
  technologies: string[];
  projects: Project[];
};

export type Skill = {
  id: string;
  name: string;
  /** Numeric level retained for backward compatibility (no longer rendered) */
  level?: number;
  icon?: string;
  /**
   * Depth indicator of competence. Prefer 'Expert' | 'Proficient' | 'Familiar'.
   * Backward-compat: 'Advanced' maps to 'Proficient', 'Intermediate' maps to 'Familiar'.
   */
  tier?: 'Expert' | 'Proficient' | 'Familiar' | 'Advanced' | 'Intermediate';
  /** Short evidence phrase (<= 10 words) */
  evidence?: string;
  /** Legacy grouping; retained for backward compatibility */
  group?: 'technical' | 'leadership';
  /** New category grouping used by the Skills component */
  category?:
    | 'languages_runtimes'
    | 'frameworks_libraries'
    | 'ai_ml_tooling'
    | 'infra_devops'
    | 'design_ux';
};

export type SocialLink = {
  name: string;
  url: string;
};

export type UserData = {
  fullName: string;
  bioLine: string;
  photoUrl: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
  resumeUrl: string;
};

/**
 * Theme and UI related types
 */
export type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

/**
 * Component prop interfaces
 */
export type HeaderProps = {
  userData: UserData;
  toggleTheme: () => void;
  darkMode: boolean;
  toggleCommandMenu: () => void;
};

export type TimelineProps = {
  experienceData: Experience[];
};

export type SkillsProps = {
  skillsData: Skill[];
};

export type FooterProps = {
  userData: UserData;
};

export type FloatingActionButtonProps = {
  toggleCommandMenu: () => void;
};

export type CommandMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
