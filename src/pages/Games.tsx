import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Gamepad2, Play } from 'lucide-react';
import { games } from '../data/games';

const allGenres = ['All', ...Array.from(new Set(games.flatMap(g => g.genre)))];
const allTechs = ['All', ...Array.from(new Set(games.flatMap(g => g.technologies)))];

const statusColor: Record<string, string> = {
  playable: 'tag-green',
  beta: 'tag-orange',
  wip: 'tag-purple',
};
const statusLabel: Record<string, string> = {
  playable: 'Jogável',
  beta: 'Beta',
  wip: 'Em Progresso',
};

export default function Games() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');

  const filtered = games.filter(g => {
    const matchGenre = genre === 'All' || g.genre.includes(genre);
    const q = query.toLowerCase();
    const matchQ = !q || g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q);
    return matchGenre && matchQ;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="relative py-20 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #070B14 0%, #0D0A1E 50%, #070B14 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 60%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Gamepad2 size={20} style={{ color: '#8B5CF6' }} />
            <span className="font-mono text-xs text-slate-600 uppercase tracking-widest">Browser Games</span>
          </div>
          <h1
            className="font-display font-bold mb-3"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em', color: '#E2E8F0' }}
          >
            Games
          </h1>
          <p className="text-slate-400 max-w-xl leading-relaxed">
            Jogos de navegador desenvolvidos do zero. Sem instalação — jogue direto no browser.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Genre filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar jogos..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm text-slate-300 placeholder-slate-600 outline-none focus:ring-1 focus:ring-[rgba(139,92,246,0.4)] transition"
              style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {allGenres.map(g => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: genre === g ? 'rgba(139,92,246,0.15)' : '#0C1220',
                  color: genre === g ? '#a78bfa' : '#64748B',
                  border: genre === g ? '1px solid rgba(139,92,246,0.35)' : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-600 mb-6 font-mono">
          {filtered.length} jogo{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Game grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Gamepad2 size={40} className="mx-auto mb-4 text-slate-700" />
            <p className="text-slate-500">Nenhum jogo encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(game => (
              <Link
                key={game.id}
                to={`/games/${game.id}`}
                className="group rounded-xl overflow-hidden card-hover block"
                style={{ background: '#0C1220', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Cover */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={game.cover}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(12,18,32,0.9))' }}
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(139,92,246,0.85)', backdropFilter: 'blur(4px)' }}
                    >
                      <Play size={22} fill="white" style={{ color: 'white', marginLeft: 3 }} />
                    </div>
                  </div>
                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`tag ${statusColor[game.status]}`}>
                      {statusLabel[game.status]}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {game.genre.slice(0, 2).map(g => (
                      <span key={g} className="tag tag-purple">{g}</span>
                    ))}
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-100 mb-1.5 group-hover:text-[#8B5CF6] transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {game.technologies.slice(0, 2).map(t => (
                        <span key={t} className="tag text-[0.65rem]">{t}</span>
                      ))}
                    </div>
                    <span className="text-xs text-slate-600 font-mono">
                      {new Date(game.releaseDate).getFullYear()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
