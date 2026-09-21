import type { Article } from './types';

export const articles: Article[] = [
  {
    id: 'exemple-article',
    title: 'Exemple Article',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2026-09-01',
    category: 'TypeScript',
    tags: ['TypeScript', 'Zod', 'API Design', 'Node.js'],
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=500&fit=crop&auto=format',
    contentFile: 'exemple-article.md',
  },
    {
    id: 'math-article',
    title: 'Axiomas as regras fundamentais da matemática',
    summary: 'Um breve resumo sobre os axiomas que formam a base da matemática, explorando sua importância e implicações.',
    date: '2026-09-21',
    category: 'Math',
    tags: ['Math', 'Axiomas'],
    readTime: 9,
    image: 'https://imgs.search.brave.com/lLduNGpy0DuF1A13tNfZRryLQWxoVndptEyeQzNF_hQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci8zNTEv/MTg2L0hELXdhbGxw/YXBlci1tYXRoLWVx/dWF0aW9ucy1hYnN0/cmFjdC10aHVtYm5h/aWwuanBn',
    contentFile: 'axiomas.md',
  },
];
