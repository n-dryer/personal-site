import { Banknote, BarChart3, Brain, Car, Pill } from 'lucide-react';
import { Experience, Skill, UserData } from '../types';

/**
 * Mock Data for Portfolio Application
 * This file contains static data that implements the interfaces defined in types/portfolio.ts
 */

// Enhanced experience data with additional details
export const experienceData: Experience[] = [
  {
    id: 'exp-1',
    title: 'AI Product Development',
    company: 'Freelance',
    location: 'Los Angeles, CA',
    date: 'Jan 2022 - Present',
    description: 'Developing custom AI solutions and chatbot interfaces for multiple clients.',
    icon: Brain,
    achievements: [
      'Delivered fine-tuned LLM and chatbot deployments saving clients over $300K annually',
      'Enhanced AI/ML expertise through targeted training and certifications during family-care career break',
    ],
    technologies: ['OpenAI', 'ChatGPT', 'Python', 'API Integrations', 'Computer Vision'],
    projects: [],
  },
  {
    id: 'exp-2',
    title: 'Product Manager',
    company: 'Lyft',
    location: 'San Francisco, CA',
    date: 'Jan 2021 - Oct 2022',
    description:
      "Led Lyft's Collaboration Tools initiative and launched an AI-powered resource hub.",
    icon: Car,
    achievements: [
      'Formed the first Collaboration Tools team and secured $500K in funding',
      'Boosted sprint velocity by 11% and raised internal tool NPS by 40 points',
    ],
    technologies: ['Jira', 'Agile', 'A/B Testing', 'Internal Tooling'],
    projects: [],
  },
  {
    id: 'exp-3',
    title: 'Senior Product Manager',
    company: 'Verint',
    location: 'San Francisco, CA',
    date: 'Mar 2018 - Dec 2020',
    description:
      'Expanded mobile access and integrated AI-driven analytics into customer experience products.',
    icon: BarChart3,
    achievements: [
      'Consolidated seven mobile apps to grow usage from 20% to 70% across 120K users',
      'Integrated sentiment analysis and predictive analytics to increase active users by 166%',
      'Secured a $3M contract by fast-tracking mobile case management features',
    ],
    technologies: ['Mobile Apps', 'Sentiment Analysis', 'Predictive Analytics'],
    projects: [],
  },
  {
    id: 'exp-4',
    title: 'Product Manager',
    company: 'McKesson',
    location: 'Emeryville, CA',
    date: 'Jan 2015 - Mar 2018',
    description: 'Managed healthcare product lines and drove user growth with targeted UX updates.',
    icon: Pill,
    achievements: [
      'Saved $1M in support costs by revamping onboarding experiences',
      'Increased monthly active users by 35% through UX improvements',
      'Coordinated EHR interoperability enabling health data access for 1M patients',
    ],
    technologies: ['UX Design', 'EHR Interoperability', 'Data Analysis'],
    projects: [],
  },
  {
    id: 'exp-5',
    title: 'Product Owner - Digital Delivery',
    company: 'Fifth Third Bank',
    location: 'Cincinnati, OH',
    date: 'Jun 2009 - Jan 2015',
    description:
      "Led the bank's first native mobile apps and accelerated feature delivery via Agile.",
    icon: Banknote,
    achievements: [
      'Increased daily active mobile users from 20K to 400K in one year',
      'Achieved $100M in annual mobile deposits within two years',
      'Reduced release cycles from 4-6 months to 1 month by transitioning to Scrum',
    ],
    technologies: ['iOS & Android', 'Mobile Banking', 'Scrum'],
    projects: [],
  },
];

// Skills data with tiers, groups, and short evidence phrases (<= 10 words)
export const skillsData: Skill[] = [
  // Languages & Runtimes
  {
    id: 'skill-l1',
    name: 'TypeScript',
    category: 'languages_runtimes',
    tier: 'Proficient',
    evidence: 'Typed React + Node apps in prod.',
  },
  {
    id: 'skill-l2',
    name: 'Python',
    category: 'languages_runtimes',
    tier: 'Proficient',
    evidence: 'Automation, data, and AI tooling.',
  },
  {
    id: 'skill-l3',
    name: 'Node.js',
    category: 'languages_runtimes',
    tier: 'Proficient',
    evidence: 'APIs and CLIs.',
  },

  // Frameworks & Libraries
  {
    id: 'skill-f1',
    name: 'React',
    category: 'frameworks_libraries',
    tier: 'Proficient',
    evidence: 'Shipped complex UI with tests.',
  },
  {
    id: 'skill-f2',
    name: 'Next.js',
    category: 'frameworks_libraries',
    tier: 'Familiar',
    evidence: 'Built small marketing sites.',
  },
  {
    id: 'skill-f3',
    name: 'Tailwind CSS',
    category: 'frameworks_libraries',
    tier: 'Proficient',
    evidence: 'Design systems and theming.',
  },

  // AI/ML & Tooling
  {
    id: 'skill-a1',
    name: 'OpenAI/Anthropic APIs',
    category: 'ai_ml_tooling',
    tier: 'Expert',
    evidence: 'LLM features with measurable ROI.',
  },
  {
    id: 'skill-a2',
    name: 'Vector DBs (Pinecone/FAISS)',
    category: 'ai_ml_tooling',
    tier: 'Familiar',
    evidence: 'RAG prototypes and evals.',
  },
  {
    id: 'skill-a3',
    name: 'Computer Vision',
    category: 'ai_ml_tooling',
    tier: 'Familiar',
    evidence: 'OCR/image classification.',
  },

  // Infra & DevOps
  {
    id: 'skill-i1',
    name: 'AWS',
    category: 'infra_devops',
    tier: 'Familiar',
    evidence: 'Deployed serverless web backends.',
  },
  {
    id: 'skill-i2',
    name: 'CI/CD (GitHub Actions)',
    category: 'infra_devops',
    tier: 'Proficient',
    evidence: 'Automated tests/builds.',
  },

  // Design & UX
  {
    id: 'skill-d1',
    name: 'Product Design',
    category: 'design_ux',
    tier: 'Proficient',
    evidence: 'NPS + UX gains via research.',
  },
  {
    id: 'skill-d2',
    name: 'A/B Testing',
    category: 'design_ux',
    tier: 'Proficient',
    evidence: 'Shipped experiments end-to-end.',
  },
];

// Profile photo will be saved and referenced locally
export const userData: UserData = {
  fullName: 'Blanche Enterprise Trial',
  bioLine: 'AI/ML Solutions Provider • Enterprise Innovation',
  photoUrl: '/profile.jpg', // We'll save this image from the provided photo
  email: 'contact@blanche-enterprise-trial.com',
  phone: '(555) 123-4567',
  location: 'San Francisco, California',
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/Blanche-Enterprise-Trial' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/blanche-enterprise-trial' },
    { name: 'Company Site', url: 'https://blanche-enterprise-trial.com' },
  ],
  resumeUrl: '/company_overview.pdf',
};
