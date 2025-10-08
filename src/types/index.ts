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
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  icon: LucideIcon;
  achievements: string[];
  technologies: string[];
  projects: Project[];
  skillIds?: string[];
};

export type Skill = {
  id: string;
  name: string;
  icon?: string;
  /** Depth indicator of competence */
  tier?: 'Expert' | 'Proficient' | 'Familiar';
  /** Short evidence phrase (<= 10 words) */
  evidence?: string;
  /** Category grouping used by the Skills component */
  category?:
    | 'languages_runtimes'
    | 'frameworks_libraries'
    | 'ai_ml_tooling'
    | 'infra_devops'
    | 'design_ux';
  experienceIds?: string[];
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
