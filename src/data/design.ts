export interface DesignWork {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export const designWorks: DesignWork[] = [
  {
    id: 'neon-ritual',
    title: 'Neon Ritual',
    category: 'Direção de arte',
    description: 'Exploração visual de luz, textura e formas orgânicas em uma identidade noturna.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=1600&fit=crop&auto=format',
  },
];
