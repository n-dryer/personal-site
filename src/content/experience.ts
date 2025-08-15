import { Experience } from '../types';
import { Brain, Car, BarChart3, Pill, Banknote } from 'lucide-react';

export const experienceData: Experience[] = [
  {
    id: 'exp-1',
    title: 'AI Product Development',
    company: 'Freelance',
    location: 'Los Angeles, CA',
    date: 'Jan 2022 - Present',
    description:
      'Developing custom AI solutions and chatbot interfaces for multiple clients.',
    icon: Brain,
    achievements: [
      'Delivered fine-tuned LLM and chatbot deployments saving clients over $300K annually',
      'Enhanced AI/ML expertise through targeted training and certifications during family-care career break',
    ],
    technologies: [
      'OpenAI',
      'ChatGPT',
      'Python',
      'API Integrations',
      'Computer Vision',
    ],
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
    technologies: [
      'Jira',
      'Agile',
      'A/B Testing',
      'Internal Tooling',
    ],
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
    technologies: [
      'Mobile Apps',
      'Sentiment Analysis',
      'Predictive Analytics',
    ],
    projects: [],
  },
  {
    id: 'exp-4',
    title: 'Product Manager',
    company: 'McKesson',
    location: 'Emeryville, CA',
    date: 'Jan 2015 - Mar 2018',
    description:
      'Managed healthcare product lines and drove user growth with targeted UX updates.',
    icon: Pill,
    achievements: [
      'Saved $1M in support costs by revamping onboarding experiences',
      'Increased monthly active users by 35% through UX improvements',
      'Coordinated EHR interoperability enabling health data access for 1M patients',
    ],
    technologies: [
      'UX Design',
      'EHR Interoperability',
      'Data Analysis',
    ],
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
    technologies: [
      'iOS & Android',
      'Mobile Banking',
      'Scrum',
    ],
    projects: [],
  },
];
