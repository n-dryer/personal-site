import { Skill } from '../types';

export const skillsData: Skill[] = [
  // Languages & Runtimes
  {
    id: 'skill-l1',
    name: 'TypeScript',
    category: 'languages_runtimes',
    tier: 'Proficient',
    evidence: 'Enterprise React + Node applications.',
    experienceIds: [],
  },
  {
    id: 'skill-l2',
    name: 'Python',
    category: 'languages_runtimes',
    tier: 'Proficient',
    evidence: 'Enterprise automation and AI tooling.',
    experienceIds: ['exp-1'],
  },
  {
    id: 'skill-l3',
    name: 'Node.js',
    category: 'languages_runtimes',
    tier: 'Proficient',
    evidence: 'Enterprise APIs and CLIs.',
    experienceIds: [],
  },

  // Frameworks & Libraries
  {
    id: 'skill-f1',
    name: 'React',
    category: 'frameworks_libraries',
    tier: 'Proficient',
    evidence: 'Enterprise UI applications with testing.',
    experienceIds: [],
  },
  {
    id: 'skill-f2',
    name: 'Next.js',
    category: 'frameworks_libraries',
    tier: 'Familiar',
    evidence: 'Built enterprise marketing platforms.',
    experienceIds: [],
  },
  {
    id: 'skill-f3',
    name: 'Tailwind CSS',
    category: 'frameworks_libraries',
    tier: 'Proficient',
    evidence: 'Design systems and theming.',
    experienceIds: [],
  },

  // AI/ML & Tooling
  {
    id: 'skill-a1',
    name: 'OpenAI/Anthropic APIs',
    category: 'ai_ml_tooling',
    tier: 'Expert',
    evidence: 'Enterprise LLM integrations with ROI.',
    experienceIds: ['exp-1'],
  },
  {
    id: 'skill-a2',
    name: 'Vector DBs (Pinecone/FAISS)',
    category: 'ai_ml_tooling',
    tier: 'Familiar',
    evidence: 'Enterprise RAG implementations.',
    experienceIds: [],
  },
  {
    id: 'skill-a3',
    name: 'Computer Vision',
    category: 'ai_ml_tooling',
    tier: 'Familiar',
    evidence: 'OCR/image classification.',
    experienceIds: ['exp-1'],
  },

  // Infra & DevOps
  {
    id: 'skill-i1',
    name: 'AWS',
    category: 'infra_devops',
    tier: 'Familiar',
    evidence: 'Enterprise serverless deployments.',
    experienceIds: [],
  },
  {
    id: 'skill-i2',
    name: 'CI/CD (GitHub Actions)',
    category: 'infra_devops',
    tier: 'Proficient',
    evidence: 'Automated tests/builds.',
    experienceIds: [],
  },

  // Design & UX
  {
    id: 'skill-d1',
    name: 'Product Design',
    category: 'design_ux',
    tier: 'Proficient',
    evidence: 'NPS + UX gains via research.',
    experienceIds: ['exp-4'],
  },
  {
    id: 'skill-d2',
    name: 'A/B Testing',
    category: 'design_ux',
    tier: 'Proficient',
    evidence: 'Shipped experiments end-to-end.',
    experienceIds: ['exp-2'],
  },
];
