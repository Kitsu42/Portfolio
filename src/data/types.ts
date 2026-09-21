export interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  tags: string[];
  readTime: number;
  image?: string;
  content: ContentBlock[];
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'code'; language: string; filename?: string; code: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'list'; items: string[] };

export interface Game {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  genre: string[];
  technologies: string[];
  releaseDate: string;
  updatedAt: string;
  cover: string;
  screenshots: string[];
  controls: { key: string; action: string }[];
  status: 'playable' | 'beta' | 'wip';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  status: 'active' | 'complete' | 'beta' | 'archived';
  version: string;
  image: string;
  screenshots: string[];
  repoUrl?: string;
  demoUrl?: string;
  downloadUrl?: string;
  requirements?: string[];
  updatedAt: string;
}
