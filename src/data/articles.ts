import type { Article } from './types';

export const articles: Article[] = [
  {
    id: 'Redes',
    title: 'Redes de computadores',
    summary: 'Um resumo sobre redes de computadores',
    date: '2026-09-30',
    category: 'Em progresso',
    tags: [, 'Redes'],
    readTime: 9,
    image: '/img/Articles/Redes-de-computadores.jpg',
    contentFile: 'Redes-de-computadores.md',
  },
    {
    id: 'math-article',
    title: 'Axiomas as regras fundamentais da matemática',
    summary: 'Um breve resumo sobre os axiomas que formam a base da matemática, explorando sua importância e implicações.',
    date: '2026-09-21',
    category: 'Em progresso',
    tags: [, 'Math', 'Axiomas'],
    readTime: 9,
    image: '/img/Articles/Axiomas.jpg',
    contentFile: 'axiomas.md',
  },
];
