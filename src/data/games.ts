import type { Game } from './types';

export const games: Game[] = [
  {
    id: 'Exemple Game',
    title: 'Exempla Game',
    description: 'It is not important',
    longDescription: 'Other thing not important',
    genre: ['Shooter', 'Arcade', 'Action'],
    technologies: ['HTML5 Canvas', 'JavaScript', 'Web Audio API'],
    releaseDate: '2026-04-12',
    updatedAt: '2026-08-20',
    cover: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&h=340&fit=crop&auto=format',
    screenshots: [
      'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&h=450&fit=crop',
    ],
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move ship' },
      { key: 'Space', action: 'Shoot' },
      { key: 'Shift', action: 'Boost / Dash' },
      { key: 'Q / E', action: 'Switch weapon' },
    ],
    status: 'playable',
  },
];
