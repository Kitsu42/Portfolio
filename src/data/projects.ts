import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'Exemple Project',
    title: 'Exemple Project',
    description: 'A full-stack project management tool built for engineering teams. Features kanban boards, GitHub integration, and automated sprint metrics.',
    longDescription: 'DevFlow is an opinionated project management tool designed specifically for software development teams. It integrates directly with GitHub to automatically link commits, PRs, and issues to tasks, provides real-time burndown charts, and supports custom workflows with configurable columns and automation rules.',
    features: [
      'Kanban and sprint board views with drag-and-drop',
      'GitHub integration: auto-link commits and PRs to tasks',
      'Automated velocity tracking and burndown charts',
      'Role-based access control with team workspaces',
      'Webhook support for CI/CD pipeline status',
      'Full REST API and CLI tool for power users',
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'Docker'],
    status: 'active',
    version: '2.4.1',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop&auto=format',
    screenshots: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    ],
    repoUrl: 'https://github.com',
    demoUrl: 'https://devflow.example.com',
    requirements: ['Node.js 20+', 'PostgreSQL 15+', 'Redis 7+'],
    updatedAt: '2026-09-10',
  },
  {
  id: 'Discord Bot',
  title: 'Discord Bot',
  description: 'Um bot do Discord.',
  longDescription: 'DevFlow is an opinionated project management tool designed specifically for software development teams. It integrates directly with GitHub to automatically link commits, PRs, and issues to tasks, provides real-time burndown charts, and supports custom workflows with configurable columns and automation rules.',
  features: [
    'Um bot do Discord'
  ],
  technologies: [],
  status: 'beta',
  version: '2.4.1',
  image: '/img/Projects/discord-bot.jpg',
  screenshots: [
    '/img/Projects/discord-bot.jpg',
    '/img/Projects/discord-bot.jpg',
  ],
  repoUrl: 'https://github.com/Kitsu42/Discord_Bot',
  demoUrl: 'https://github.com/Kitsu42/Discord_Bot',
  requirements: ['Nada'],
  updatedAt: '2026-09-10',
  },
];
