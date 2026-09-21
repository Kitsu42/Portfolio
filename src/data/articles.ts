import type { Article } from './types';

export const articles: Article[] = [
  {
    id: 'exemple-article',
    title: 'Exemple Article',
    summary: 'Learn how to combine TypeScript\'s static type system with Zod\'s runtime validation to build robust, end-to-end type-safe APIs that catch errors at every boundary.',
    date: '2026-08-14',
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
    date: '2026-08-14',
    category: 'Math',
    tags: ['Math', 'Axiomas'],
    readTime: 9,
    image: 'https://imgs.search.brave.com/lLduNGpy0DuF1A13tNfZRryLQWxoVndptEyeQzNF_hQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci8zNTEv/MTg2L0hELXdhbGxw/YXBlci1tYXRoLWVx/dWF0aW9ucy1hYnN0/cmFjdC10aHVtYm5h/aWwuanBn',
    contentFile: 'axiomas.md',
  },
];
