import { Experience } from '../types';
import { Brain, Car, BarChart3, Pill, Banknote } from 'lucide-react';

export const experienceData: Experience[] = [
  {
    id: 'exp-1',
    title: 'AI/ML Solutions Development',
    company: 'Current Enterprise Focus',
    location: 'San Francisco, CA',
    date: 'Jan 2022 - Present',
    description: 'Developing custom AI solutions and enterprise-grade integrations for enterprise clients.',
    icon: Brain,
    achievements: [
      'Delivered fine-tuned LLM and chatbot deployments saving enterprise clients over $300K annually',
      'Built scalable AI infrastructure supporting multi-tenant enterprise deployments',
    ],
    technologies: ['OpenAI', 'Anthropic', 'Python', 'API Integrations', 'Computer Vision'],
    projects: [],
  },
  {
    id: 'exp-2',
    title: 'Enterprise Collaboration Platform',
    company: 'Platform Development',
    location: 'San Francisco, CA',
    date: 'Jan 2021 - Oct 2022',
    description:
      'Built enterprise collaboration tools and AI-powered resource management systems.',
    icon: Car,
    achievements: [
      'Developed scalable collaboration platform securing $500K in initial funding',
      'Improved enterprise productivity by 11% and raised platform NPS by 40 points',
    ],
    technologies: ['React', 'Node.js', 'A/B Testing', 'Enterprise Architecture'],
    projects: [],
  },
  {
    id: 'exp-3',
    title: 'Customer Experience Analytics',
    company: 'Enterprise Analytics Suite',
    location: 'San Francisco, CA',
    date: 'Mar 2018 - Dec 2020',
    description:
      'Built mobile-first analytics platform with AI-driven insights for customer experience.',
    icon: BarChart3,
    achievements: [
      'Consolidated enterprise dashboards to grow usage from 20% to 70% across 120K users',
      'Integrated sentiment analysis and predictive analytics increasing user engagement by 166%',
      'Secured $3M enterprise contract with fast-tracked mobile features',
    ],
    technologies: ['Mobile Apps', 'Sentiment Analysis', 'Predictive Analytics'],
    projects: [],
  },
  {
    id: 'exp-4',
    title: 'Healthcare Technology Solutions',
    company: 'HealthTech Platform',
    location: 'Emeryville, CA',
    date: 'Jan 2015 - Mar 2018',
    description: 'Built healthcare enterprise solutions with focus on user experience and interoperability.',
    icon: Pill,
    achievements: [
      'Reduced enterprise support costs by $1M through improved onboarding experiences',
      'Increased platform adoption by 35% through targeted UX improvements',
      'Enabled health data access for 1M+ users through EHR interoperability',
    ],
    technologies: ['UX Design', 'EHR Interoperability', 'Data Analysis'],
    projects: [],
  },
  {
    id: 'exp-5',
    title: 'Financial Technology Platform',
    company: 'FinTech Solutions',
    location: 'Cincinnati, OH',
    date: 'Jun 2009 - Jan 2015',
    description:
      'Developed enterprise mobile banking solutions and accelerated delivery through Agile methodologies.',
    icon: Banknote,
    achievements: [
      'Grew enterprise mobile platform users from 20K to 400K in one year',
      'Enabled $100M+ in annual mobile transactions within two years',
      'Reduced enterprise deployment cycles from 4-6 months to 1 month using Scrum',
    ],
    technologies: ['iOS & Android', 'Mobile Banking', 'Scrum'],
    projects: [],
  },
];
