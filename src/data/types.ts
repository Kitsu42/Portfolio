export interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  tags: string[];
  readTime: number;
  image?: string;
  contentFile: string;
}

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
  gameUrl: string;
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
